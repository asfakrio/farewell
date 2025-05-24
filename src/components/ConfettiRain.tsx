"use client";

import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  style: React.CSSProperties;
  color: string;
}

const confettiColors = [
  'hsl(var(--primary))',
  'hsl(var(--accent))',
  'hsl(var(--secondary))',
  '#FFC107', // Amber
  '#4CAF50', // Green
];

export default function ConfettiRain() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const newPieces: ConfettiPiece[] = [];
    const numPieces = typeof window !== 'undefined' && window.innerWidth > 768 ? 100 : 50; // Fewer pieces on mobile

    for (let i = 0; i < numPieces; i++) {
      const duration = Math.random() * 3 + 4; // Fall duration 4-7 seconds
      const delay = Math.random() * 5; // Start falling at different times
      const xPosition = Math.random() * 100; // Horizontal position in vw
      const size = Math.random() * 8 + 8; // Size 8px to 16px
      const rotation = Math.random() * 360; // Initial rotation

      newPieces.push({
        id: i,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        style: {
          position: 'absolute',
          left: `${xPosition}vw`,
          top: `${Math.random() * -50 - 10}vh`, // Start above the screen
          width: `${size}px`,
          height: `${size * (Math.random() > 0.5 ? 1 : 0.5)}px`, // Some are more rectangular
          opacity: Math.random() * 0.5 + 0.5, // Opacity 0.5 to 1
          transform: `rotate(${rotation}deg)`,
          animation: `fall ${duration}s linear ${delay}s infinite`,
          zIndex: 10, // Below main content but above background
        },
      });
    }
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {pieces.map(piece => (
        <div key={piece.id} style={{ ...piece.style, backgroundColor: piece.color }} />
      ))}
    </div>
  );
}
