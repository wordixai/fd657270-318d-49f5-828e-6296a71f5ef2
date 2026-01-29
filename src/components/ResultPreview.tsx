import { Sparkles, Download, RefreshCw } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface TryOnResult {
  analysis: string;
  generatedImage?: string | null;
  clothingDescription: string;
}

interface ResultPreviewProps {
  result: TryOnResult | null;
  isLoading: boolean;
  onDownload: () => void;
  onRetry: () => void;
}

export function ResultPreview({ result, isLoading, onDownload, onRetry }: ResultPreviewProps) {
  if (isLoading) {
    return (
      <div className="w-full aspect-[3/4] glass-card rounded-2xl flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-muted border-t-primary spin-slow" />
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
        </div>
        <div className="text-center">
          <p className="text-foreground font-medium">AI 正在换装中...</p>
          <p className="text-sm text-muted-foreground mt-1">正在分析人物特征并生成换装效果</p>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="w-full aspect-[3/4] glass-card rounded-2xl flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 p-4">
          {result.generatedImage && (
            <div className="mb-4 rounded-xl overflow-hidden">
              <img
                src={result.generatedImage}
                alt="AI生成效果图"
                className="w-full aspect-square object-cover"
              />
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI 换装分析</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {result.analysis}
            </p>
          </div>
        </ScrollArea>

        <div className="p-3 border-t border-border/50 flex gap-2">
          {result.generatedImage && (
            <button
              onClick={onDownload}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg
                         bg-primary/20 text-primary hover:bg-primary/30 transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              <span>下载</span>
            </button>
          )}
          <button
            onClick={onRetry}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg
                       bg-muted text-muted-foreground hover:bg-muted/80 transition-colors text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>重新生成</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full aspect-[3/4] glass-card rounded-2xl flex flex-col items-center justify-center gap-4 opacity-60">
      <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center float">
        <Sparkles className="w-10 h-10 text-muted-foreground" />
      </div>
      <div className="text-center px-6">
        <p className="text-foreground font-medium">换装效果预览</p>
        <p className="text-sm text-muted-foreground mt-1">上传照片并选择服装后<br />点击生成按钮</p>
      </div>
    </div>
  );
}
