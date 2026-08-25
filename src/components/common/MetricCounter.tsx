import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface MetricCounterProps {
  value: string; // e.g. "5,000", "0.68", "$4.64M", "7.06x", "98%"
  label: string;
  sublabel?: string;
  darkTheme?: boolean;
  className?: string;
}

export const MetricCounter: React.FC<MetricCounterProps> = ({
  value,
  label,
  sublabel,
  darkTheme = false,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayText, setDisplayText] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const match = value.match(/^([^0-9.]*)([0-9.,]+)(.*)$/);
    if (!match) {
      setDisplayText(value);
      return;
    }

    const prefix = match[1];
    const rawNumberStr = match[2].replace(/,/g, '');
    const suffix = match[3];
    const targetNum = parseFloat(rawNumberStr);

    if (isNaN(targetNum)) {
      setDisplayText(value);
      return;
    }

    const isDecimal = rawNumberStr.includes('.');
    const decimalPlaces = isDecimal ? rawNumberStr.split('.')[1].length : 0;
    const hasCommas = match[2].includes(',');

    let start = 0;
    const duration = 1400;
    const startTime = performance.now();

    const animateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = start + (targetNum - start) * easeProgress;

      let formattedNum = current.toFixed(decimalPlaces);
      if (hasCommas) {
        const parts = formattedNum.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        formattedNum = parts.join('.');
      }

      setDisplayText(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setDisplayText(value);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView, value]);

  return (
    <div
      ref={ref}
      className={`p-6 rounded-2xl transition-all ${
        darkTheme
          ? 'bg-[#121217] border border-white/10 text-white'
          : 'bg-white border border-[#D2D2D7]/60 text-[#1D1D1F] shadow-sm'
      } ${className}`}
    >
      <div className={`text-xs font-mono uppercase tracking-wider mb-2 font-medium ${darkTheme ? 'text-[#A1A1A6]' : 'text-[#6E6E73]'}`}>
        {label}
      </div>
      <div className="text-4xl sm:text-5xl font-semibold font-display tracking-tight leading-none">
        {isInView ? displayText : "0"}
      </div>
      {sublabel && (
        <div className={`text-xs mt-3 leading-relaxed font-sans ${darkTheme ? 'text-[#A1A1A6]' : 'text-[#6E6E73]'}`}>
          {sublabel}
        </div>
      )}
    </div>
  );
};
