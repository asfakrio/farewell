"use client";

import { useEffect, useState, useRef } from 'react';
import ConfettiRain from '@/components/ConfettiRain';
import AnimatedEmojisOverlay from '@/components/AnimatedEmojisOverlay';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

interface FarewellMessageClientProps {
  name: string | null;
}

export default function FarewellMessageClient({ name }: FarewellMessageClientProps) {
  const [currentStage, setCurrentStage] = useState<'emojiOverlay' | 'showMessage' | 'loading'>('loading');
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if(name) { // Only start animations if name is present
      setCurrentStage('emojiOverlay');
      const emojiTimer = setTimeout(() => {
        setCurrentStage('showMessage');
      }, 4000); // Show emojis for 4 seconds

      return () => clearTimeout(emojiTimer);
    }
  }, [name]);

  useEffect(() => {
    if (currentStage === 'showMessage' && audioRef.current) {
      audioRef.current.volume = 0.3; // Set a softer volume
      audioRef.current.play().catch(error => {
        console.log("Autoplay prevented, user interaction needed for audio: ", error);
        // Optionally show a message to the user to enable sound
      });
    }
  }, [currentStage]);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (currentStage === 'loading' || !name) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-animated text-primary-foreground text-2xl p-4 text-center">
        Preparing your unforgettable farewell message, {name || 'friend'}... ✨
      </div>
    );
  }

  const farewellText = `As our college journey comes to an end, I just want to say thank you for being a part of this beautiful chapter of my life. We've shared countless memories, laughter, struggles, and moments that I’ll cherish forever.

Now, as we step into a new phase of life, I sincerely wish you all the happiness, success, and peace you deserve. May your dreams turn into reality, and may life treat you with kindness wherever you go.

Never forget how far you’ve come, and never stop believing in yourself. No matter where life takes us, you’ll always be a friend I’m proud to have.

Good luck for everything that’s coming your way. Stay happy, stay true, and always keep that smile alive!`;

  const paragraphs = farewellText.split('\n\n');

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-animated text-foreground p-6 md:p-8">
      {currentStage === 'emojiOverlay' && <AnimatedEmojisOverlay />}

      {currentStage === 'showMessage' && (
        <>
          <ConfettiRain />
          <div className="absolute top-4 right-4 z-30">
            <Button onClick={toggleMute} variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
              {isMuted ? <VolumeX /> : <Volume2 />}
              <span className="sr-only">{isMuted ? 'Unmute' : 'Mute'}</span>
            </Button>
          </div>
          <div className="z-10 text-center space-y-6 max-w-3xl bg-background/80 backdrop-blur-md p-8 md:p-12 rounded-xl shadow-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-primary animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Hey {name},
            </h1>
            {paragraphs.map((p, index) => (
              <p
                key={index}
                className="text-lg md:text-xl leading-relaxed text-balance animate-fadeInUp"
                style={{ animationDelay: `${0.5 + index * 0.4}s` }}
              >
                {p}
              </p>
            ))}
            <p 
              className="text-xl md:text-2xl font-semibold mt-10 animate-fadeInUp text-accent"
              style={{ animationDelay: `${0.5 + paragraphs.length * 0.4}s` }}
            >
              From Your Friend ❤️
            </p>
          </div>
        </>
      )}
      <audio ref={audioRef} src="/music/farewell-song.mp3" loop />
    </div>
  );
}
