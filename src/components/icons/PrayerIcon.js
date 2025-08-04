import React from 'react';

const PrayerIcon = ({ size = 24, color = 'currentColor', ...props }) => {
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
      {/* Main prayer beads circle */}
      <circle cx="12" cy="12" r="8" />
      
      {/* Decorative dots around the circle */}
      <circle cx="12" cy="4" r="1.5" fill={color} />
      <circle cx="12" cy="20" r="1.5" fill={color} />
      <circle cx="4" cy="12" r="1.5" fill={color} />
      <circle cx="20" cy="12" r="1.5" fill={color} />
      
      {/* Inner decorative elements */}
      <circle cx="12" cy="12" r="3" fill="none" />
      <circle cx="12" cy="12" r="1" fill={color} />
      
      {/* Crescent moon element */}
      <path d="M8 8a4 4 0 0 1 8 0" fill="none" />
      <path d="M8 8a2 2 0 0 1 4 0" fill={color} />
    </svg>
  );
};

export default PrayerIcon; 