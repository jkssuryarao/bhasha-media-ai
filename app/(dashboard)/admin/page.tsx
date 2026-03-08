'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getHistory } from '@/lib/history';
import type { HistoryItem } from '@/lib/history';

export default function AdminPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    if (session?.user?.email !== 'admin@bhashasetu.ai') {
      router.push('/dashboard');
    }
    setHistory(getHistory());
  }, [session, router]);

  const stats = {
    total: history.length,
    languages: history.reduce<Record<string, number>>((acc, h) => {
      acc[h.language] = (acc[h.language] || 0) + 1;
      return acc;
    }, {}),
  };
  const mostUsed = Object.entries(stats.languages).sort((a, b) => b[1] - a[1])[0];
  const recent = history.slice(0, 10);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Overview of platform usage
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft dark:border-gray-700 dark:bg-gray-800/50"
        >
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Total Generations
          </p>
          <p className="mt-2 text-4xl font-bold text-saffron">{stats.total}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft dark:border-gray-700 dark:bg-gray-800/50"
        >
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Most Used Language
          </p>
          <p className="mt-2 text-4xl font-bold text-indiaGreen">
            {mostUsed?.[0] || '—'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {mostUsed?.[1] || 0} generations
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft dark:border-gray-700 dark:bg-gray-800/50"
        >
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Languages Used
          </p>
          <p className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">
            {Object.keys(stats.languages).length}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft dark:border-gray-700 dark:bg-gray-800/50"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h2>
        <div className="mt-4 space-y-3">
          {recent.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0 dark:border-gray-700"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {item.topic}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.language} •{' '}
                  {new Date(item.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
          {recent.length === 0 && (
            <p className="py-8 text-center text-gray-500 dark:text-gray-400">
              No activity yet
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
