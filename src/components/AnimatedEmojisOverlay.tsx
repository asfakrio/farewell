"use client";

import { Heart, HeartCrack } from 'lucide-react';
import { useEffect, useState } from 'react';

interface EmojiProp {
  id: string;
  icon: React.ElementType;
  color: string;
  size: string;
  style: React.CSSProperties;
}

const emojiTypes = [
  { icon: Heart, color: 'text-pink-500' },
  { icon: HeartCrack, color: 'text-indigo-400' },
  { icon: Heart, color: 'text-red-500' },
  { icon: Heart, color: 'text-purple-500' },
];

export default function AnimatedEmojisOverlay() {
  const [emojis, setEmojis] = useState<EmojiProp[]>([]);

  useEffect(() => {
    const generateEmojis = () => {
      const newEmojis: EmojiProp[] = [];
      const numEmojis = 20;
      for (let i = 0; i < numEmojis; i++) {
        const type = emojiTypes[i % emojiTypes.length];
        const size = `${2 + Math.random() * 4}rem`; // Random size 2rem to 6rem
        newEmojis.push({
          id: `emoji-${i}-${Date.now()}`,
          icon: type.icon,
          color: type.color,
          size: size,
          style: {
            position: 'absolute',
            left: `${Math.random() * 90}%`, // within 0-90% of width
            top: `${Math.random() * 90}%`, // within 0-90% of height
            animationName: 'float, pulse-intense',
            animationDuration: `${3 + Math.random() * 2}s, ${1.5 + Math.random()}s`,
            animationIterationCount: 'infinite, infinite',
            animationTimingFunction: 'ease-in-out, ease-in-out',
            animationDelay: `${Math.random() * 1}s, ${Math.random() * 0.5}s`,
            opacity: 0.7 + Math.random() * 0.3,
            transform: `scale(${0.8 + Math.random() * 0.4})`,
          },
        });
      }
      setEmojis(newEmojis);
    };
    generateEmojis();
  }, []);


  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden bg-background/50 backdrop-blur-sm">
      <div className="relative w-full h-full">
        {emojis.map(({ id, icon: Icon, color, size, style }) => (
          <Icon
            key={id}
            className={`absolute ${color}`}
            style={{ ...style, width: size, height: size }}
            strokeWidth={1.5}
          />
        ))}
      </div>
      <div className="absolute text-center p-4">
          <p className="text-2xl md:text-3xl font-semibold text-primary animate-fadeInUp" style={{animationDelay: '0.5s'}}>Thinking of our moments...</p>
      </div>
    </div>
  );
}
