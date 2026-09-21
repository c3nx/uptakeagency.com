// Tarayıcı girişi: gerçek window/document ile tek örnek kurar.
// Astro'nun bundle ettiği <script> etiketleri bu modülü paylaşır, durum tektir.

import { GA_MEASUREMENT_ID } from "../config/analytics";
import { createAnalytics } from "./analytics";

const analytics = createAnalytics({
  window,
  document,
  measurementId: GA_MEASUREMENT_ID,
});

export const readStoredConsent = analytics.readStoredConsent;
export const storeConsent = analytics.storeConsent;
export const enableAnalytics = analytics.enableAnalytics;
export const disableAnalytics = analytics.disableAnalytics;
export const applyStoredConsent = analytics.applyStoredConsent;
export const trackEvent = analytics.trackEvent;
export const initMailtoTracking = analytics.initMailtoTracking;
export const initConsentSync = analytics.initConsentSync;
