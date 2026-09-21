import { useState, useEffect, useRef } from 'react';

interface CounterProps {
  value: string | number;
  duration?: number; // duration in ms, defaults to 2000
  className?: string;
  delay?: number; // optional delay in ms
}

export default function Counter({
  value,
  duration = 2000,
  className = '',
  delay = 0
}: CounterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);

  // Parse prefix, number, suffix, and formatting
  const strVal = String(value).trim();
  const match = strVal.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);

  const prefix = match ? match[1] : '';
  const numStr = match ? match[2] : '0';
  const suffix = match ? match[3] : '';
  const targetNum = parseFloat(numStr) || 0;
  const isDecimal = numStr.includes('.');
  const decimalPlaces = isDecimal ? numStr.split('.')[1].length : 0;
  const isPadded = !isDecimal && numStr.length > 1 && numStr.startsWith('0');
  const padLength = isPadded ? numStr.length : 0;

  const initialFormatted = isPadded ? `${prefix}${'0'.repeat(padLength)}${suffix}` : `${prefix}0${suffix}`;
  const [displayValue, setDisplayValue] = useState<string>(initialFormatted);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;
    let timerId: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger animation
          timerId = setTimeout(() => {
            const step = (timestamp: number) => {
              if (!startTimestamp) startTimestamp = timestamp;
              const elapsed = timestamp - startTimestamp;
              const progress = Math.min(elapsed / duration, 1);

              // Ease-out expo curve for ultra-smooth realistic odometer/counter effect
              const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              const currentNum = easeProgress * targetNum;

              let formattedNum: string;
              if (isDecimal) {
                formattedNum = currentNum.toFixed(decimalPlaces);
              } else {
                const rounded = Math.round(currentNum);
                formattedNum = padLength > 0 ? String(rounded).padStart(padLength, '0') : String(rounded);
              }

              setDisplayValue(`${prefix}${formattedNum}${suffix}`);

              if (progress < 1) {
                animationFrameId = requestAnimationFrame(step);
              } else {
                // Ensure exact final string representation
                setDisplayValue(strVal);
              }
            };

            animationFrameId = requestAnimationFrame(step);
          }, delay);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (timerId) clearTimeout(timerId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [value, duration, delay, targetNum, prefix, suffix, isDecimal, decimalPlaces, isPadded, padLength, strVal]);

  // Re-run on hover or click for delightful user feedback
  const handleReplay = () => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const replayStep = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / (duration * 0.75), 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentNum = easeProgress * targetNum;

      let formattedNum: string;
      if (isDecimal) {
        formattedNum = currentNum.toFixed(decimalPlaces);
      } else {
        const rounded = Math.round(currentNum);
        formattedNum = padLength > 0 ? String(rounded).padStart(padLength, '0') : String(rounded);
      }

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(replayStep);
      } else {
        setDisplayValue(strVal);
      }
    };

    animationFrameId = requestAnimationFrame(replayStep);
  };

  return (
    <span
      ref={elementRef}
      onMouseEnter={handleReplay}
      className={`inline-block tabular-nums font-variant-numeric select-none transition-transform ${className}`}
      title={`${strVal} (Hover to re-animate counter)`}
    >
      {displayValue}
    </span>
  );
}
