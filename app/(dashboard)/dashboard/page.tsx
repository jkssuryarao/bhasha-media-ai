'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import InviteFriends from '@/components/InviteFriends';
import { getHistory } from '@/lib/history';
import { useEffect, useState } from 'react';
import type { HistoryItem } from '@/lib/history';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const stats = {
    total: history.length,
    languages: history.reduce<Record<string, number>>((acc, h) => {
      acc[h.language] = (acc[h.language] || 0) + 1;
      return acc;
    }, {}),
  };
  const mostUsedLang = Object.entries(stats.languages).sort(
    (a, b) => b[1] - a[1]
  )[0];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-gradient-to-br from-saffron/10 via-indiaGreen/5 to-transparent p-8 dark:from-saffron/20 dark:via-indiaGreen/10"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {session?.user?.name || 'Creator'}! 👋
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Generate multilingual scripts and voice content for your audience.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 rounded-xl bg-saffron px-6 py-3 font-medium text-white shadow-glow transition-colors hover:bg-saffron/90"
          >
            ✨ Generate AI Content
          </Link>
          <InviteFriends />
        </div>
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
          <p className="mt-2 text-3xl font-bold text-saffron">{stats.total}</p>
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
          <p className="mt-2 text-3xl font-bold text-indiaGreen">
            {mostUsedLang?.[0] || '—'}
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
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {Object.keys(stats.languages).length || 0}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent History
          </h2>
          <Link
            href="/history"
            className="text-sm font-medium text-saffron hover:text-saffron/80"
          >
            View all
          </Link>
        </div>
        <div className="mt-4 space-y-3">
          {history.slice(0, 5).map((item) => (
            <Link
              key={item.id}
              href="/history"
              className="block rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-soft dark:border-gray-700 dark:bg-gray-800/50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {item.topic}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.language} •{' '}
                    {new Date(item.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-saffron">→</span>
              </div>
            </Link>
          ))}
          {history.length === 0 && (
            <p className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500 dark:border-gray-600 dark:text-gray-400">
              No generations yet. Start by generating content!
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
