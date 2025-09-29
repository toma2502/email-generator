import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { SignatureState, Step, SignatureData } from '../types';

const initialState: SignatureData = {
  // Details
  firstName: 'Josip',
  lastName: 'Tomić',
  jobTitle: 'Vlasnik',
  department: 'Marketing',
  companyName: 'Simplex Digital obrt za marketing i usluge',
  officePhone: '111 222 3333',
  mobilePhone: '091 608 7745',
  websiteUrl: 'https://simplexdigital.agency/',
  email: 'kontakt@simplexdigital.agency',
  address: 'Šećerana ul. 53, 32270, Županja',
  socials: {
    linkedIn: 'https://www.linkedin.com/in/josip-tomic/',
    facebook: '',
    instagram: 'https://www.instagram.com/simplex.digital.agency/',
    twitter: '',
    youtube: '',
    tiktok: '',
  },
  // Images
  logo: '',
  avatar: '',
  imagePosition: 'left',
  imageSize: 72,
  imageRoundness: 50,
  // Template
  template: 'modern',
  // Styles
  primaryColor: '#3b82f6',
  secondaryColor: '#cbd5e1',
  accentColor: '#f97316',
  fontSize: 14,
  lineHeight: 140,
  spacing: 'normal',
  showSeparators: true,
  showIcons: true,
  useAccentUnderline: true,
  direction: 'ltr',
};

export const useSignatureStore = create<SignatureState>()(
  persist(
    (set) => ({
      ...initialState,
      activeStep: Step.Details,
      setActiveStep: (step) => set({ activeStep: step }),
      updateData: (data) => set((state) => ({ ...state, ...data })),
      resetData: () => set({ ...initialState }),
      importData: (data) => set({ ...data }),
    }),
    {
      name: 'email-signature-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);