export enum Step {
  Details = 'Details',
  Images = 'Images',
  Templates = 'Templates',
  Styles = 'Styles',
  Export = 'Export',
}

export type Template = 'minimal' | 'modern' | 'corporate' | 'professional' | 'creative' | 'banner' | 'classic' | 'verticalSocial' | 'logoFocus';

export interface SocialLinks {
  linkedIn: string;
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  tiktok: string;
}

export interface SignatureData {
  // Details
  firstName: string;
  lastName: string;
  jobTitle: string;
  department: string;
  companyName: string;
  officePhone: string;
  mobilePhone: string;
  websiteUrl: string;
  email: string;
  address: string;
  socials: SocialLinks;

  // Images
  logo: string; // base64
  avatar: string; // base64
  imagePosition: 'left' | 'right' | 'top';
  imageSize: number; // in px
  imageRoundness: number; // in %

  // Template
  template: Template;

  // Styles
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontSize: number; // in px
  lineHeight: number; // in %
  spacing: 'compact' | 'normal' | 'spacious';
  showSeparators: boolean;
  showIcons: boolean;
  useAccentUnderline: boolean;
  direction: 'ltr' | 'rtl';
}

export interface SignatureState extends SignatureData {
  activeStep: Step;
  setActiveStep: (step: Step) => void;
  updateData: (data: Partial<SignatureData>) => void;
  resetData: () => void;
  importData: (data: SignatureData) => void;
}