import React from 'react';
import styled from 'styled-components';
import useOnlineStatus from '../hooks/useOnlineStatus';

const OfflineBanner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${props => props.isOnline ? '#10b981' : '#ef4444'};
  color: white;
  padding: 8px 16px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  z-index: 1001;
  transition: all 0.3s ease;
  transform: translateY(${props => props.show ? '0' : '-100%'});
  
  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 12px;
  }
`;

const OfflineMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const OfflineIcon = styled.span`
  font-size: 16px;
`;

const OfflineStatus = () => {
  const { isOnline, wasOffline } = useOnlineStatus();
  const [showBanner, setShowBanner] = React.useState(false);

  React.useEffect(() => {
    // Only show banner when connection status changes
    if (wasOffline && isOnline) {
      // Show brief message when coming back online
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 3000);
    } else if (!isOnline && wasOffline) {
      // Don't show persistent offline banner
      setShowBanner(false);
    }
  }, [isOnline, wasOffline]);

  // Don't show anything if offline
  if (!isOnline) return null;

  // Only show when coming back online
  if (!showBanner) return null;

  return (
    <OfflineBanner isOnline={isOnline} show={showBanner}>
      <OfflineMessage>
        <OfflineIcon>✅</OfflineIcon>
        <span>تم استعادة الاتصال بالإنترنت</span>
      </OfflineMessage>
    </OfflineBanner>
  );
};

export default OfflineStatus; 