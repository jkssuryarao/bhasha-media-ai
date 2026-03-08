'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import MobileMenu from './MobileMenu';
import InviteFriends from './InviteFriends';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-30 w-full border-b border-saffron/20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-soft"
      >
        <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 sm:gap-2 text-lg sm:text-xl font-bold text-saffron dark:text-saffron truncate"
            >
              <span className="text-xl sm:text-2xl shrink-0">🇮🇳</span>
              <span className="hidden sm:inline truncate">BHASHA MEDIA AI</span>
              <span className="sm:hidden truncate">BHASHA MEDIA</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {status === 'authenticated' && (
              <div className="hidden sm:block">
                <InviteFriends />
              </div>
            )}
            <ThemeToggle />
            <div className="hidden lg:flex items-center gap-4">
              {status === 'authenticated' ? (
                <>
                  {session?.user?.email === 'admin@bhashasetu.ai' && (
                    <Link
                      href="/admin"
                      className="text-sm font-medium text-gray-700 hover:text-saffron dark:text-gray-300 dark:hover:text-saffron transition-colors"
                    >
                      Admin
                    </Link>
                  )}
                  <Link
                    href="/generate"
                    className="text-sm font-medium text-gray-700 hover:text-saffron dark:text-gray-300 dark:hover:text-saffron transition-colors"
                  >
                    Generate
                  </Link>
                  <Link
                    href="/history"
                    className="text-sm font-medium text-gray-700 hover:text-saffron dark:text-gray-300 dark:hover:text-saffron transition-colors"
                  >
                    History
                  </Link>
                  <Link
                    href="/settings"
                    className="text-sm font-medium text-gray-700 hover:text-saffron dark:text-gray-300 dark:hover:text-saffron transition-colors"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="rounded-lg bg-saffron/10 px-3 py-1.5 text-sm font-medium text-saffron hover:bg-saffron/20 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium text-gray-700 hover:text-saffron dark:text-gray-300 dark:hover:text-saffron transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="rounded-lg bg-saffron px-4 py-2 text-sm font-medium text-white hover:bg-saffron/90 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.nav>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
