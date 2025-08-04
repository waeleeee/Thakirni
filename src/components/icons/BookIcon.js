import React from 'react';

const BookIcon = ({ size = 24, color = 'currentColor', ...props }) => {
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
      {/* Main book cover */}
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      
      {/* Book pages lines */}
      <line x1="8" y1="6" x2="18" y2="6" />
      <line x1="8" y1="9" x2="18" y2="9" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="8" y1="15" x2="14" y2="15" />
      
      {/* Decorative bookmark */}
      <path d="M6 4l2 2v8l-2 2" fill="none" />
      <circle cx="7" cy="6" r="0.5" fill={color} />
    </svg>
  );
};

export default BookIcon; 