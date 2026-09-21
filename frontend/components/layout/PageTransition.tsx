'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // 1. Masquer immédiatement
    setVisible(false);
    // 2. Laisser le navigateur peindre l'état invisible (double rAF),
    //    puis déclencher la transition d'entrée
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        setVisible(true);
      });
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
  }, [pathname]);

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      {children}
    </div>
  );
};
