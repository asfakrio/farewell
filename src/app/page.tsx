import NameInputForm from '@/components/NameInputForm';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-animated">
      <div className="bg-background/80 backdrop-blur-md p-8 md:p-12 rounded-xl shadow-2xl text-center max-w-lg w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8">
          College Farewell <span role="img" aria-label="Graduation cap">🎓</span>
        </h1>
        <NameInputForm />
      </div>
    </div>
  );
}
