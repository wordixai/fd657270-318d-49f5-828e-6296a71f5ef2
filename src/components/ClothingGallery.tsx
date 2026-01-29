import { ClothingCard } from './ClothingCard';

export const CLOTHING_ITEMS = [
  {
    id: '1',
    name: '经典白T恤',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop',
    description: '经典白色纯棉T恤，简约百搭，适合日常休闲穿着',
  },
  {
    id: '2',
    name: '商务西装',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=600&fit=crop',
    description: '深蓝色修身商务西装，面料挺括，适合正式商务场合',
  },
  {
    id: '3',
    name: '休闲卫衣',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=600&fit=crop',
    description: '灰色连帽运动卫衣，宽松舒适，适合休闲运动场合',
  },
  {
    id: '4',
    name: '优雅连衣裙',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop',
    description: '黑色优雅连衣裙，修身剪裁，适合晚宴派对等正式场合',
  },
  {
    id: '5',
    name: '皮夹克',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop',
    description: '经典黑色皮夹克，帅气有型，适合街头潮流穿搭',
  },
  {
    id: '6',
    name: '运动套装',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop',
    description: '时尚运动套装，透气舒适，适合健身运动和休闲出行',
  },
];

interface ClothingGalleryProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ClothingGallery({ selectedId, onSelect }: ClothingGalleryProps) {
  return (
    <div className="glass-card p-4 rounded-2xl">
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-3">
        {CLOTHING_ITEMS.map((item) => (
          <ClothingCard
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            selected={selectedId === item.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
