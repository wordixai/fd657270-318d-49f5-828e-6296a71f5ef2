import { useCallback, useState } from 'react';
import { Upload, X, User } from 'lucide-react';

interface UploadZoneProps {
  image: string | null;
  onImageChange: (image: string | null) => void;
}

export function UploadZone({ image, onImageChange }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageChange(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageChange]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageChange(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageChange]);

  const handleClear = useCallback(() => {
    onImageChange(null);
  }, [onImageChange]);

  if (image) {
    return (
      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden glass-card group">
        <img
          src={image}
          alt="Uploaded"
          className="w-full h-full object-cover"
        />
        <button
          onClick={handleClear}
          className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm
                     text-foreground opacity-0 group-hover:opacity-100 transition-opacity
                     hover:bg-destructive hover:text-destructive-foreground"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/90 to-transparent">
          <p className="text-sm text-muted-foreground">点击右上角可更换照片</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`upload-zone w-full aspect-[3/4] flex flex-col items-center justify-center gap-4 cursor-pointer
                  ${isDragging ? 'border-primary bg-primary/10' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <input
        id="file-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileInput}
      />
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
        <User className="w-10 h-10 text-muted-foreground" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-foreground">
          <Upload className="w-5 h-5" />
          <span className="font-medium">上传人物照片</span>
        </div>
        <p className="text-sm text-muted-foreground text-center px-4">
          拖放或点击上传<br />支持 JPG, PNG 格式
        </p>
      </div>
    </div>
  );
}
