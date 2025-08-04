import React from 'react';

const NotificationIcon = ({ size = 24, color = 'currentColor', hasNotification = false, ...props }) => {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      {hasNotification && (
        <circle cx="18" cy="6" r="4" fill="#E1BEE7" stroke="white" strokeWidth="2" />
      )}
    </svg>
  );
};

export default NotificationIcon; 