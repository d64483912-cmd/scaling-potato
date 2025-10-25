'use client';

import { useSettings } from '@/contexts/SettingsContext';

export default function HamburgerMenu() {
  const { isMenuOpen, toggleMenu } = useSettings();

  return (
    <button
      onClick={toggleMenu}
      className="fixed top-6 right-6 z-50 p-2 rounded-lg bg-background-secondary border border-border hover:border-accent transition-colors duration-200"
      aria-label="Toggle menu"
    >
      <div className="w-6 h-5 flex flex-col justify-between">
        <span
          className={`block h-0.5 bg-foreground rounded transition-all duration-300 ${
            isMenuOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`block h-0.5 bg-foreground rounded transition-all duration-300 ${
            isMenuOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block h-0.5 bg-foreground rounded transition-all duration-300 ${
            isMenuOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </div>
    </button>
  );
}
