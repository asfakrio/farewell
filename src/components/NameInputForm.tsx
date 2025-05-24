"use client";

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function NameInputForm() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      router.push(`/farewell?name=${encodeURIComponent(name.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name..."
        className="text-lg p-4 h-14 rounded-lg shadow-sm focus:ring-2 focus:ring-primary"
        aria-label="Your name"
        required
      />
      <Button type="submit" className="w-full text-lg p-4 h-14 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" size="lg">
        Go <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </form>
  );
}
