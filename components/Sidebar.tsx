'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/generate', label: 'Generate', icon: '✨' },
  { href: '/history', label: 'History', icon: '📜' },
  { href: '/settings', label: 'Settings', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:pt-20">
      <div className="flex flex-1 flex-col gap-2 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-saffron/20 text-saffron dark:bg-saffron/30'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-saffron dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-saffron'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </motion.div>
            </Link>
          );
        })}
        {session?.user?.email === 'admin@bhashasetu.ai' && (
          <Link href="/admin">
            <motion.div
              whileHover={{ x: 4 }}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                pathname === '/admin'
                  ? 'bg-indiaGreen/20 text-indiaGreen dark:bg-indiaGreen/30'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-indiaGreen dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-indiaGreen'
              }`}
            >
              <span className="text-lg">👑</span>
              Admin
            </motion.div>
          </Link>
        )}
      </div>
    </aside>
  );
}
