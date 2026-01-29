import { Sparkles, Download, RefreshCw } from 'lucide-react';

interface ResultPreviewProps {
  result: string | null;
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
          <p className="text-sm text-muted-foreground mt-1">请稍候，这可能需要几秒钟</p>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden glass-card group">
        <img
          src={result}
          alt="AI Result"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-2">
            <button
              onClick={onDownload}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg
                         bg-primary/20 backdrop-blur-sm text-primary-foreground
                         hover:bg-primary/30 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">下载</span>
            </button>
            <button
              onClick={onRetry}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg
                         bg-muted/50 backdrop-blur-sm text-foreground
                         hover:bg-muted/70 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm">重试</span>
            </button>
          </div>
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
