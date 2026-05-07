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

export interface Formation {
  id: string
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  image: string
  price: number
  originalPrice?: number
  monthlyPrice?: number
  paymentMonths?: number
  registrationFee?: number
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
