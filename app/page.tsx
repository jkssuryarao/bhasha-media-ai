import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">BHASHA MEDIA AI</h1>
        <p className="mt-4">Multilingual AI Content Generator</p>
        <a
          href="/login"
          className="mt-6 inline-block rounded bg-orange-500 px-6 py-3 text-white"
        >
          Login
        </a>
      </div>
    </main>
  );
}
