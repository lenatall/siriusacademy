export interface Module {
  id: string
  title: string
  description: string
  duration: string
  lessons: number
}

export interface Instructor {
  name: string
  title: string
  avatar: string
  bio: string
}

export type FormationStatus = 'ouvert' | 'bientot' | 'brouillon'
export type FormationSchedule = 'date-fixe' | 'weekend' | 'sans-date'
export type PaymentType = 'unique' | 'tranches'

export interface PaymentTranche {
  nom: string
  montant: number
  echeance: string
}

export interface Formation {
  id: string
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  image: string
  price: number
  originalPrice?: number
  paymentType?: PaymentType
  tranches?: PaymentTranche[]
  duration: string
  level: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Tous niveaux'
  modules: Module[]
  instructor: Instructor
  tags: string[]
  isFeatured: boolean
  objectives: string[]
  prerequisites: string[]
  keyPoints: string[]
  skillsTargeted?: string[]
  targetAudience?: string
  maxPlaces?: number
  programPdfUrl?: string
  metaTitle?: string
  metaDescription?: string
  certificate: boolean
  category: string
  status: FormationStatus
  schedule: FormationSchedule
  startDate?: string
  endDate?: string
  weekendDates?: string[]
}

export interface FreeCourse {
  id: string
  slug: string
  title: string
  description: string
  image: string
  duration: string
  level: 'Débutant' | 'Intermédiaire' | 'Avancé'
  topics: string[]
  instructor: string
  category: string
  lessonsCount: number
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  author: {
    name: string
    avatar: string
    title: string
  }
  publishedAt: string
  readTime: number
  tags: string[]
  category: string
  metaTitle?: string
  metaDescription?: string
  isFeatured?: boolean
  published?: boolean
}

export type ProspectSource = 'inscription' | 'pdf' | 'contact' | 'liste-attente'
export type ProspectStatus =
  | 'nouveau'
  | 'contacte'
  | 'interesse'
  | 'attente-paiement'
  | 'inscrit'
  | 'relancer'
  | 'non-interesse'

export interface Prospect {
  id: string
  nom: string
  prenom: string
  email: string
  telephone?: string
  formationSlug?: string
  source: ProspectSource
  status: ProspectStatus
  note?: string
  message?: string
  statut?: string
  createdAt: string
}

export interface FaqItem {
  question: string
  answer: string
  visible?: boolean
}

export interface TestimonialItem {
  name: string
  role: string
  avatar: string
  formation: string
  text: string
  visible?: boolean
}

export interface StatItem {
  value: string
  label: string
}

export interface FeatureItem {
  title: string
  description: string
}

export interface ProcessStep {
  title: string
  description: string
}

export interface SiteSettings {
  heroFormationSlug: string
  siteName: string
  slogan: string
  country: string
  currency: string
  contactEmail: string
  whatsappNumber: string
  whatsappLink: string
  heroTitle: string
  heroSubtitle: string
  heroCta1: string
  heroCta2: string
  footerText: string
  socialFacebook?: string
  socialInstagram?: string
  socialLinkedin?: string
  socialTwitter?: string
  legalMentions?: string
  privacyPolicy?: string
  logoUrl?: string
  siteDescription?: string
  contactPhone?: string
  contactAddress?: string
  contactHours?: string
  faq?: FaqItem[]
  testimonials?: TestimonialItem[]
  stats?: StatItem[]
  features?: FeatureItem[]
  processSteps?: ProcessStep[]
  showTestimonials?: boolean
  socialTiktok?: string
  socialYoutube?: string
  notificationEmail?: string
  formConfirmationContact?: string
  formConfirmationInscription?: string
  formConfirmationPdf?: string
  formLegalText?: string
}

export interface RegistrationForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  formation: string
  message: string
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}
