import { useState, useCallback } from 'react';
import { Sparkles, Wand2 } from 'lucide-react';
import { UploadZone } from '@/components/UploadZone';
import { ClothingGallery } from '@/components/ClothingGallery';
import { ResultPreview } from '@/components/ResultPreview';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedClothing, setSelectedClothing] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = useCallback(async () => {
    if (!uploadedImage) {
      toast({
        title: '请先上传照片',
        description: '需要上传一张人物照片才能进行换装',
        variant: 'destructive',
      });
      return;
    }

    if (!selectedClothing) {
      toast({
        title: '请选择服装',
        description: '请从服装库中选择一件服装',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    // Simulate AI processing (replace with actual AI API call)
    await new Promise(resolve => setTimeout(resolve, 3000));

    // For demo, use the uploaded image as result
    // In production, this would be the AI-generated result
    setResultImage(uploadedImage);
    setIsLoading(false);

    toast({
      title: '换装完成',
      description: 'AI已为您完成换装，快来看看效果吧！',
    });
  }, [uploadedImage, selectedClothing, toast]);

  const handleDownload = useCallback(() => {
    if (resultImage) {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = 'ai-outfit-result.png';
      link.click();
    }
  }, [resultImage]);

  const handleRetry = useCallback(() => {
    setResultImage(null);
    handleGenerate();
  }, [handleGenerate]);

  const canGenerate = uploadedImage && selectedClothing && !isLoading;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Wand2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold gradient-text">AI 换装</h1>
          </div>
          <p className="text-sm text-muted-foreground hidden sm:block">智能试衣，一键换装</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            AI 智能换装体验
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            上传您的照片，选择心仪的服装，让AI为您展示试穿效果
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Upload Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">1</span>
              上传照片
            </h3>
            <UploadZone image={uploadedImage} onImageChange={setUploadedImage} />
          </div>

          {/* Clothing Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">2</span>
              选择服装
            </h3>
            <ClothingGallery selectedId={selectedClothing} onSelect={setSelectedClothing} />
          </div>

          {/* Result Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">3</span>
              效果预览
            </h3>
            <ResultPreview
              result={resultImage}
              isLoading={isLoading}
              onDownload={handleDownload}
              onRetry={handleRetry}
            />
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-center">
          <button
            onClick={handleGenerate}
            disabled={!canGenerate}
            className={`btn-gradient flex items-center gap-3 text-lg px-10 py-4 ${canGenerate ? 'pulse-glow' : ''}`}
          >
            <Sparkles className="w-5 h-5" />
            <span>开始换装</span>
          </button>
        </div>

        {/* Info Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            { title: '智能识别', desc: 'AI精准识别人体轮廓与姿态' },
            { title: '无缝贴合', desc: '服装自然贴合，效果逼真' },
            { title: '快速生成', desc: '几秒钟即可完成换装效果' },
          ].map((item, i) => (
            <div key={i} className="glass-card p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>AI 换装体验 · 智能试衣新体验</p>
        </div>
      </footer>

      <Toaster />
    </div>
  );
};

export default Index;
