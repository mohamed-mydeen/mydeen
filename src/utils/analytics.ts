import posthog from 'posthog-js';

export type PortfolioEventName =
  | 'project_clicked'
  | 'resume_downloaded'
  | 'contact_clicked'
  | 'github_clicked'
  | 'linkedin_clicked';

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const POSTHOG_HOST = (import.meta.env.VITE_POSTHOG_HOST as string | undefined) || 'https://us.i.posthog.com';

function getHeartbeatEndpoint(): string {
  const configured = import.meta.env.VITE_ANALYTICS_HEARTBEAT_URL as string | undefined;
  if (configured) return configured;
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:5174/api/heartbeat';
  }
  return 'https://mydeen-analytics.vercel.app/api/heartbeat';
}

let initialized = false;

function getAnonymousVisitorId(): string {
  const storageKey = 'mydeen_anon_vid';
  let id = localStorage.getItem(storageKey);
  if (!id) {
    id = `v_${crypto.randomUUID().replace(/-/g, '').slice(0, 16)}`;
    localStorage.setItem(storageKey, id);
  }
  return id;
}

function getDeviceInfo(): { device_type: 'Mobile' | 'Desktop' | 'Tablet'; browser: string; os: string } {
  const ua = navigator.userAgent;
  const isTablet = /iPad|Tablet|PlayBook|Silk/i.test(ua);
  const isMobile = !isTablet && /Mobi|Android|iPhone|iPod/i.test(ua);
  const device_type: 'Mobile' | 'Desktop' | 'Tablet' = isTablet
    ? 'Tablet'
    : isMobile
    ? 'Mobile'
    : 'Desktop';

  let browser = 'Other';
  if (ua.includes('Edg/')) browser = 'Edge';
  else if (ua.includes('Chrome/')) browser = 'Chrome';
  else if (ua.includes('Firefox/')) browser = 'Firefox';
  else if (ua.includes('Safari/') && !ua.includes('Chrome')) browser = 'Safari';

  let os = 'Other';
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac OS')) os = 'macOS';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
  else if (ua.includes('Linux')) os = 'Linux';

  return { device_type, browser, os };
}

export function initAnalytics(): void {
  if (initialized) return;
  initialized = true;

  if (POSTHOG_KEY && !POSTHOG_KEY.includes('your_posthog')) {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: 'identified_only',
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: false,
      respect_dnt: true,
    });
  }
}

export function trackPageView(path: string): void {
  if (POSTHOG_KEY && !POSTHOG_KEY.includes('your_posthog')) {
    posthog.capture('$pageview', { $current_url: window.location.href, path });
  }
}

export function trackEvent(event: PortfolioEventName, props?: Record<string, unknown>): void {
  if (POSTHOG_KEY && !POSTHOG_KEY.includes('your_posthog')) {
    posthog.capture(event, props);
  }
}

export function startHeartbeat(getCurrentPath: () => string): () => void {
  const heartbeatUrl = getHeartbeatEndpoint();
  if (!heartbeatUrl) {
    return () => {};
  }

  const send = () => {
    if (document.visibilityState === 'hidden') return;
    const { device_type, browser, os } = getDeviceInfo();
    fetch(heartbeatUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        visitor_id: getAnonymousVisitorId(),
        current_page: getCurrentPath(),
        device_type,
        browser,
        os,
      }),
    }).catch(() => {
      // Silently ignore network errors so portfolio UX is never affected
    });
  };

  send();
  const interval = window.setInterval(send, 30_000);
  const onVisibility = () => {
    if (document.visibilityState === 'visible') send();
  };
  document.addEventListener('visibilitychange', onVisibility);

  return () => {
    window.clearInterval(interval);
    document.removeEventListener('visibilitychange', onVisibility);
  };
}
