import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function HomePage() {
  let session = null;
  try {
    const { getServerSession } = await import('next-auth');
    const { authOptions } = await import('@/lib/auth-options');
    session = await getServerSession(authOptions);
  } catch {
    session = null;
  }

  if (session) {
    redirect('/dashboard');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">BHASHA MEDIA AI</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Multilingual AI Content Generator</p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link
            href="/login"
            className="rounded-xl bg-saffron px-6 py-3 font-medium text-white hover:opacity-90"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-xl border-2 border-saffron px-6 py-3 font-medium text-saffron hover:bg-saffron/10"
          >
            Get Started
          </Link>
        </div>
      </div>
    </main>
  );
}
