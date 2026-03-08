'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import InviteFriends from './InviteFriends';

interface MobileMenuProps {
  onClose: () => void;
  isOpen: boolean;
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/generate', label: 'Generate', icon: '✨' },
  { href: '/history', label: 'History', icon: '📜' },
  { href: '/settings', label: 'Settings', icon: '⚙️' },
];

export default function MobileMenu({ onClose, isOpen }: MobileMenuProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.2 }}
            className="fixed left-0 top-0 z-50 h-full w-72 bg-white dark:bg-gray-900 shadow-xl lg:hidden"
          >
            <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-700">
              <Link href="/dashboard" onClick={onClose} className="flex items-center gap-2 font-bold text-saffron">
                <span className="text-2xl">🇮🇳</span>
                BHASHA MEDIA AI
              </Link>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close menu"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-1 p-4">
              <div className="mb-4">
                <InviteFriends />
              </div>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} onClick={onClose}>
                    <div
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
                        isActive
                          ? 'bg-saffron/20 text-saffron'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      {item.label}
                    </div>
                  </Link>
                );
              })}
              {session?.user?.email === 'admin@bhashasetu.ai' && (
                <Link href="/admin" onClick={onClose}>
                  <div
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
                      pathname === '/admin'
                        ? 'bg-indiaGreen/20 text-indiaGreen'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="text-lg">👑</span>
                    Admin
                  </div>
                </Link>
              )}
              <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                <button
                  onClick={() => {
                    signOut({ callbackUrl: '/login' });
                    onClose();
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <span>🚪</span>
                  Sign Out
                </button>
              </div>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
