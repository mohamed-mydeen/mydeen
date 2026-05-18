import React, { useRef, useEffect } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // degrees
  glare?: boolean;
}

/**
 * Lightweight CSS-based tilt card with optional glare.
 * No external deps — pure pointer events + CSS transforms.
 */
const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 8,
  glare = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let targetRx = 0, targetRy = 0, currentRx = 0, currentRy = 0;
    let glareX = 50, glareY = 50, glareOpacity = 0;
    let isHovered = false;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const speed = 0.08;

      currentRx = lerp(currentRx, targetRx, speed);
      currentRy = lerp(currentRy, targetRy, speed);

      card.style.transform = isHovered
        ? `perspective(800px) rotateX(${currentRx}deg) rotateY(${currentRy}deg) scale3d(1.015, 1.015, 1.015)`
        : `perspective(800px) rotateX(${lerp(currentRx, 0, speed * 2)}deg) rotateY(${lerp(currentRy, 0, speed * 2)}deg) scale3d(1,1,1)`;

      if (glare && glareRef.current) {
        glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${glareOpacity}) 0%, transparent 60%)`;
      }
    };
    rafRef.current = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      targetRy = (x - 0.5) * maxTilt * 2;
      targetRx = -(y - 0.5) * maxTilt * 2;
      glareX = x * 100;
      glareY = y * 100;
      glareOpacity = 0.08;
    };

    const onEnter = () => { isHovered = true; };
    const onLeave = () => {
      isHovered = false;
      targetRx = 0;
      targetRy = 0;
      glareOpacity = 0;
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, [maxTilt]);

  return (
    <div
      ref={cardRef}
      className={`relative will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d', transition: 'box-shadow 0.3s ease' }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ zIndex: 10, borderRadius: 'inherit' }}
        />
      )}
    </div>
  );
};

export default TiltCard;
