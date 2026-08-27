import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const render = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${target.current.x - 6}px, ${target.current.y - 6}px, 0) scale(${isHovered ? 2.8 : 1})`;
      }
      rafRef.current = null;
    };

    const onMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      setIsVisible(true);
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(render);
    };

    const onMouseOver = (e: MouseEvent) => {
      const element = e.target as Element | null;
      setIsHovered(Boolean(element?.closest('button, a, [role="button"]')));
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isHovered]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 w-3 h-3 bg-[#0071E3] rounded-full pointer-events-none z-50 mix-blend-difference"
      style={{ opacity: isHovered ? 0.85 : 0.6, willChange: 'transform' }}
    />
  );
};
