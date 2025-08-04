import React from 'react';

const QuranIcon = ({ size = 24, color = 'currentColor', ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Main scroll/book shape */}
      <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
      
      {/* Decorative Islamic pattern */}
      <circle cx="12" cy="12" r="2" fill={color} />
      <path d="M12 8l2 2-2 2" />
      <path d="M12 16l-2-2 2-2" />
      
      {/* Crescent moon */}
      <path d="M18 8a3 3 0 0 1 3 3 3 3 0 0 1-3 3" fill="none" />
      <path d="M18 8a1.5 1.5 0 0 1 1.5 1.5 1.5 1.5 0 0 1-1.5 1.5" fill={color} />
      
      {/* Decorative dots */}
      <circle cx="8" cy="8" r="0.5" fill={color} />
      <circle cx="16" cy="16" r="0.5" fill={color} />
    </svg>
  );
};

export default QuranIcon; 