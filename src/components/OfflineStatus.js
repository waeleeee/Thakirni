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

const InstallHint = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 8px 12px;
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.4;
`;

const OfflineStatus = () => {
  const { isOnline, wasOffline } = useOnlineStatus();
  const [showBanner, setShowBanner] = React.useState(false);

  React.useEffect(() => {
    if (!isOnline) {
      setShowBanner(true);
    } else if (wasOffline) {
      // Show online message briefly
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 3000);
    } else {
      setShowBanner(false);
    }
  }, [isOnline, wasOffline]);

  if (!showBanner) return null;

  return (
    <OfflineBanner isOnline={isOnline} show={showBanner}>
      <OfflineMessage>
        <OfflineIcon>
          {isOnline ? '✅' : '📱'}
        </OfflineIcon>
        {isOnline ? (
          'تم استعادة الاتصال بالإنترنت'
        ) : (
          <>
            <span>أنت غير متصل بالإنترنت</span>
            <InstallHint>
              💡 نصيحة: قم بتثبيت التطبيق للاستخدام بدون إنترنت
            </InstallHint>
          </>
        )}
      </OfflineMessage>
    </OfflineBanner>
  );
};

export default OfflineStatus; 