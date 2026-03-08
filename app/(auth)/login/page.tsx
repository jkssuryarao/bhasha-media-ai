'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError('Invalid credentials. Please try again.');
      return;
    }

    router.push(callbackUrl);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-soft dark:border-gray-700 dark:bg-gray-800/50">
        <div className="mb-8 text-center">
          <span className="text-4xl">🇮🇳</span>
          <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            BHASHA-MEDIA AI
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Sign in to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-soft focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-soft focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-saffron px-4 py-3 font-medium text-white shadow-glow transition-colors hover:bg-saffron/90 disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="font-medium text-saffron hover:text-saffron/80"
          >
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex w-full max-w-md items-center justify-center rounded-2xl border border-gray-200 bg-white p-16 dark:border-gray-700 dark:bg-gray-800/50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-saffron border-t-transparent" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
