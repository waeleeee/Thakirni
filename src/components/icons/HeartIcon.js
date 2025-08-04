import React from 'react';

const HeartIcon = ({ size = 24, color = 'currentColor', filled = false, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? color : "none"}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Main heart shape */}
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      
      {/* Decorative sparkle effect */}
      <circle cx="8" cy="8" r="0.5" fill={color} />
      <circle cx="16" cy="8" r="0.5" fill={color} />
      <circle cx="12" cy="4" r="0.5" fill={color} />
      
      {/* Inner highlight */}
      {!filled && (
        <path d="M12 8a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2z" fill="none" />
      )}
    </svg>
  );
};

export default HeartIcon; 