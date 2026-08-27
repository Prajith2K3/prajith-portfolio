import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: -100, y: -100 });
  const isHoveredRef = useRef(false);
  const isVisibleRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const render = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${target.current.x - 6}px, ${target.current.y - 6}px, 0) scale(${isHoveredRef.current ? 2.8 : 1})`;
        cursorRef.current.style.opacity = isHoveredRef.current ? '0.85' : '0.6';
      }
      rafRef.current = null;
    };

    const onPointerMove = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
      isHoveredRef.current = Boolean((event.target as Element | null)?.closest('button, a, [role="button"]'));
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(render);
    };

    const onPointerLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 w-3 h-3 bg-[#0071E3] rounded-full pointer-events-none z-50 mix-blend-difference"
      style={{ willChange: 'transform, opacity' }}
    />
  );
};
