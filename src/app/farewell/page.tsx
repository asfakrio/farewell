import FarewellMessageClient from '@/components/FarewellMessageClient';
import { Suspense } from 'react';

function FarewellContent({ name }: { name: string | null }) {
  return <FarewellMessageClient name={name} />;
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-primary text-2xl">
      Loading your special message...
    </div>
  );
}

export default function FarewellPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const name = searchParams?.name ? String(searchParams.name) : null;

  return (
    <Suspense fallback={<LoadingFallback />}>
      <FarewellContent name={name} />
    </Suspense>
  );
}
