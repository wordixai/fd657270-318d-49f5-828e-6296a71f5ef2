import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
};

interface VirtualTryOnRequest {
  personImage: string;
  clothingImage: string;
  clothingDescription: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders
    });
  }

  try {
    const { personImage, clothingImage, clothingDescription }: VirtualTryOnRequest = await req.json();

    if (!personImage) {
      return new Response(
        JSON.stringify({ error: "请提供人物照片" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!clothingImage) {
      return new Response(
        JSON.stringify({ error: "请选择服装" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const AI_API_KEY = Deno.env.get("AI_API_KEY");
    if (!AI_API_KEY) {
      throw new Error("AI服务未配置");
    }

    console.log("开始AI换装处理...");

    // 使用AI Gateway进行图像分析和换装效果描述
    const analysisResponse = await fetch("https://ai.gateway.needware.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `你是一个专业的虚拟试衣AI助手。请分析人物照片，然后详细描述这个人穿上指定服装后的效果。

输出要求：
1. 描述人物特征（身材、肤色、气质等）
2. 分析服装特点
3. 描述穿搭效果和整体搭配建议
4. 给出适合度评分（1-10分）

请用中文回复，语言专业但亲切。`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `请帮我分析这个人穿上以下服装的效果：\n服装描述：${clothingDescription}`
              },
              {
                type: "image_url",
                image_url: { url: personImage }
              },
              {
                type: "image_url",
                image_url: { url: clothingImage }
              }
            ]
          }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!analysisResponse.ok) {
      const errorText = await analysisResponse.text();
      console.error("AI服务错误:", analysisResponse.status, errorText);

      if (analysisResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "请求过于频繁，请稍后再试" }),
          { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      if (analysisResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI服务额度已用尽" }),
          { status: 402, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      throw new Error(`AI处理失败: ${errorText}`);
    }

    const analysisData = await analysisResponse.json();
    const analysisResult = analysisData.choices?.[0]?.message?.content;

    if (!analysisResult) {
      throw new Error("AI未能生成分析结果");
    }

    console.log("AI换装分析完成");

    // 使用AI生成换装效果图（使用图像生成模型）
    let generatedImageUrl = null;

    try {
      const imageGenResponse = await fetch("https://ai.gateway.needware.dev/v1/images/generations", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${AI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "black-forest-labs/flux-1.1-pro",
          prompt: `A professional fashion photo of a person wearing ${clothingDescription}. The person should look natural and confident. High quality, studio lighting, clean background. Fashion photography style.`,
          n: 1,
          size: "1024x1024",
          response_format: "url"
        }),
      });

      if (imageGenResponse.ok) {
        const imageData = await imageGenResponse.json();
        generatedImageUrl = imageData.data?.[0]?.url;
        console.log("换装效果图生成成功");
      } else {
        console.log("图像生成失败，仅返回分析结果");
      }
    } catch (imageError) {
      console.error("图像生成错误:", imageError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        result: {
          analysis: analysisResult,
          generatedImage: generatedImageUrl,
          clothingDescription
        },
        model: "google/gemini-2.5-flash"
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      }
    );

  } catch (error: any) {
    console.error("换装处理错误:", error);
    return new Response(
      JSON.stringify({ error: error.message || "未知错误" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      }
    );
  }
};

serve(handler);
