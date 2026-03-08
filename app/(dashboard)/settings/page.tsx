'use client';

import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';
import InviteFriends from '@/components/InviteFriends';

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Manage your preferences
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft dark:border-gray-700 dark:bg-gray-800/50"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Account
        </h2>
        <div className="mt-4 space-y-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {session?.user?.email}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {session?.user?.name || '—'}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft dark:border-gray-700 dark:bg-gray-800/50"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Invite Friends
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Share the platform with others
        </p>
        <div className="mt-4">
          <InviteFriends />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft dark:border-gray-700 dark:bg-gray-800/50"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Appearance
        </h2>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Dark Mode
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Toggle dark/light theme
            </p>
          </div>
          <ThemeToggle />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft dark:border-gray-700 dark:bg-gray-800/50"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          About
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          BHASHA-MEDIA AI enables Indian creators to generate multilingual
          scripts and voice content using AI. Powered by AWS Bedrock, Polly, and
          S3.
        </p>
      </motion.div>
    </div>
  );
}
