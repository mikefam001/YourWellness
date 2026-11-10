/**
 * Verified Crisis Hotlines & Support Directory Types
 */

export interface CrisisContact {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  telephone: string;
  sms?: string;
  website?: string;
  operatingHours: string;
  freephone: boolean;
  notes: string;
  category: 'suicide_prevention' | 'mental_health_support' | 'emergency_services' | 'youth_support';
}

export interface CountryCrisisInfo {
  countryName: string;
  code: string;
  generalEmergencyNumber: string;
  primaryHelplineName: string;
  primaryHelplineNumber: string;
  description: string;
  contacts: CrisisContact[];
}
