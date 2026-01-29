import { Check } from 'lucide-react';

interface ClothingCardProps {
  id: string;
  image: string;
  name: string;
  selected: boolean;
  onSelect: (id: string) => void;
}

export function ClothingCard({ id, image, name, selected, onSelect }: ClothingCardProps) {
  return (
    <div
      className={`clothing-card p-2 ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(id)}
    >
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        {selected && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <Check className="w-4 h-4 text-primary-foreground" />
          </div>
        )}
      </div>
      <p className="mt-2 text-sm text-foreground text-center truncate px-1">{name}</p>
    </div>
  );
}
