'use client';

import React, { useEffect, useState } from 'react';

interface StatCounterProps {
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  end,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1800,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease out quad
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      setCount(easedProgress * end);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  const formattedNumber = count.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className="font-mono font-bold tracking-tight font-tabular">
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
};
