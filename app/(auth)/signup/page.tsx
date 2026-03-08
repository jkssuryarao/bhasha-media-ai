'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const users = JSON.parse(localStorage.getItem('bhasha-users') || '[]');
    if (users.some((u: { email: string }) => u.email === email)) {
      setError('Email already registered. Please sign in.');
      setLoading(false);
      return;
    }

    users.push({
      id: `user-${Date.now()}`,
      name,
      email,
      password,
    });
    localStorage.setItem('bhasha-users', JSON.stringify(users));

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError('Signup successful but login failed. Please try signing in.');
      return;
    }

    router.push('/dashboard');
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
            Create Account
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Join BHASHA-MEDIA AI
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-soft focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              placeholder="Your name"
            />
          </div>
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
              minLength={6}
              className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-soft focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
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
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-saffron hover:text-saffron/80"
          >
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
