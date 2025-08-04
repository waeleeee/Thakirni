import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const InstallPrompt = styled.div`
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: ${props => props.theme.cardBackground};
  border: 2px solid ${props => props.theme.primaryColor};
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  z-index: 1000;
  max-width: 300px;
  text-align: center;
  animation: slideUp 0.3s ease-out;
  
  @keyframes slideUp {
    from {
      transform: translateX(-50%) translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  }
`;

const InstallTitle = styled.h3`
  font-size: 1rem;
  color: ${props => props.theme.primaryColor};
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const InstallText = styled.p`
  font-size: 0.8rem;
  color: ${props => props.theme.textColor};
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const InstallButton = styled.button`
  background: ${props => props.theme.primaryColor};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 0.5rem;
  
  &:hover {
    background: ${props => props.theme.primaryColor}dd;
    transform: translateY(-2px);
  }
`;

const DismissButton = styled.button`
  background: transparent;
  color: ${props => props.theme.textColor};
  border: 1px solid ${props => props.theme.borderColor};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.backgroundColor};
  }
`;

const PWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if it's iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    });

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallPrompt(false);
    }

    // Check if user dismissed the prompt before
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      setShowInstallPrompt(false);
    }
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (!showInstallPrompt) return null;

  return (
    <InstallPrompt>
      <InstallTitle>📱 تثبيت التطبيق</InstallTitle>
      <InstallText>
        {isIOS ? (
          'اضغط على "مشاركة" ثم "إضافة إلى الشاشة الرئيسية" لتثبيت التطبيق'
        ) : (
          'يمكنك تثبيت هذا التطبيق على هاتفك لاستخدامه بدون إنترنت'
        )}
      </InstallText>
      {!isIOS && (
        <InstallButton onClick={handleInstall}>
          تثبيت التطبيق
        </InstallButton>
      )}
      <DismissButton onClick={handleDismiss}>
        إغلاق
      </DismissButton>
    </InstallPrompt>
  );
};

export default PWAInstall; 