import React from 'react';

export const FireParticles: React.FC = () => {
  const particles = Array.from({ length: 50 }, (_, i) => {
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const animationDelay = Math.random() * 15;
    return (
      <div
        key={i}
        className="fire-particle"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          animationDelay: `${animationDelay}s`,
        }}
      />
    );
  });

  return (
    <div className="fire-container">
      {particles}
    </div>
  );
};
