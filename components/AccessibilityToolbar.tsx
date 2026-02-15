"use client";

import { useState, useEffect } from 'react';
import { Type, Sun, RotateCcw } from 'lucide-react';

const AccessibilityToolbar = () => {
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('a11y-font-size');
    const savedContrast = localStorage.getItem('a11y-high-contrast');
    if (saved) setFontSize(Number(saved));
    if (savedContrast === 'true') setHighContrast(true);
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem('a11y-font-size', String(fontSize));
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    localStorage.setItem('a11y-high-contrast', String(highContrast));
  }, [highContrast]);

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 10, 150));
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 10, 80));
  const resetAll = () => {
    setFontSize(100);
    setHighContrast(false);
  };

  return (
    <div
      role="toolbar"
      aria-label="Accessibility options"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-1 bg-navy text-white p-2 shadow-lg border border-gold/30"
    >
      <button
        onClick={decreaseFontSize}
        aria-label={`Decrease text size. Currently ${fontSize}%`}
        className="p-2 hover:bg-navy-light transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
        title="Decrease text size"
      >
        <Type className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={increaseFontSize}
        aria-label={`Increase text size. Currently ${fontSize}%`}
        className="p-2 hover:bg-navy-light transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
        title="Increase text size"
      >
        <Type className="h-5 w-5" />
      </button>
      <div className="w-px h-6 bg-white/20 mx-1" role="separator" />
      <button
        onClick={() => setHighContrast(!highContrast)}
        aria-label={highContrast ? 'Disable high contrast mode' : 'Enable high contrast mode'}
        aria-pressed={highContrast}
        className={`p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-gold ${
          highContrast ? 'bg-gold text-navy' : 'hover:bg-navy-light'
        }`}
        title="Toggle high contrast"
      >
        <Sun className="h-4 w-4" />
      </button>
      <div className="w-px h-6 bg-white/20 mx-1" role="separator" />
      <button
        onClick={resetAll}
        aria-label="Reset accessibility settings"
        className="p-2 hover:bg-navy-light transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
        title="Reset settings"
      >
        <RotateCcw className="h-4 w-4" />
      </button>
    </div>
  );
};

export default AccessibilityToolbar;
