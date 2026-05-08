import { formations as defaultFormations } from '@/data/formations'
import { coursgratuits as defaultCours } from '@/data/cours'
import { blogPosts as defaultBlog } from '@/data/blog'
import type { Formation, FreeCourse, BlogPost, Prospect, SiteSettings } from '@/types'

// In-memory store — initialized with static data, replace with a real DB later
let _formations: Formation[] = JSON.parse(JSON.stringify(defaultFormations))
let _cours: FreeCourse[] = JSON.parse(JSON.stringify(defaultCours))
let _blog: BlogPost[] = JSON.parse(JSON.stringify(defaultBlog))
let _prospects: Prospect[] = []
let _settings: SiteSettings = {
  heroFormationSlug: 'marketing-digital-reseaux-sociaux',
  siteName: 'Sirius Academy',
  slogan: 'Apprendre le digital en pratiquant.',
  country: "Sénégal — Afrique de l'Ouest",
  currency: 'FCFA',
  contactEmail: 'contact@siriusacademy.sn',
  whatsappNumber: '+221 77 000 00 00',
  whatsappLink: 'https://wa.me/221770000000',
  heroTitle: 'Apprendre le digital en pratiquant.',
  heroSubtitle:
    "Pour les étudiants, entrepreneurs et personnes en reconversion qui veulent maîtriser le digital.",
  heroCta1: 'Voir les formations',
  heroCta2: 'Notre approche',
  footerText: '© 2025 Sirius Academy — Tous droits réservés.',
  siteDescription: "Sirius Academy est une académie digitale basée au Sénégal. Nous vous aidons à construire des compétences concrètes, visibles et utiles grâce à un accompagnement personnalisé en petits groupes.",
  contactPhone: '+221 77 000 00 00',
  contactAddress: 'Dakar, Sénégal (et 100% en ligne)',
  contactHours: 'Lun–Ven : 9h–18h · Sam : 10h–14h',
  faq: [
    {
      question: "Y a-t-il des prérequis pour s'inscrire ?",
      answer: "Chaque formation a ses propres prérequis, détaillés sur la page de la formation. La plupart de nos formations sont accessibles aux débutants.",
    },
    {
      question: "Les formations sont-elles en direct ou en replay ?",
      answer: "Nos formations proposent un mix des deux : les cours sont disponibles en replay à tout moment, avec des sessions live hebdomadaires pour les Q&A et le suivi.",
    },
    {
      question: "Puis-je travailler en même temps que ma formation ?",
      answer: "Absolument. Nos formations sont conçues pour être compatibles avec une activité professionnelle. Comptez environ 10-15h par semaine selon la formation.",
    },
    {
      question: "Quel est le délai de réponse après mon inscription ?",
      answer: "Notre équipe vous contacte dans les 48h ouvrées suivant votre demande d'inscription pour un entretien de qualification et pour répondre à toutes vos questions.",
    },
  ],
  testimonials: [
    {
      name: 'Fatou Diallo',
      role: 'Développeuse Frontend · Dakar',
      avatar: 'https://ui-avatars.com/api/?name=Fatou+Diallo&background=10B981&color=fff&size=200',
      formation: 'Développement Web Full-Stack',
      text: "Grâce aux projets concrets, j'ai pu constituer un vrai portfolio dès la fin de la formation. Je me suis lancée en freelance deux semaines après.",
    },
    {
      name: 'Mamadou Sow',
      role: 'Community Manager Freelance',
      avatar: 'https://ui-avatars.com/api/?name=Mamadou+Sow&background=F59E0B&color=0B1F3A&size=200',
      formation: 'Marketing Digital & Réseaux Sociaux',
      text: "Les exercices sont applicables immédiatement. J'ai décroché mes premiers clients avec exactement ce que j'avais appris en formation.",
    },
    {
      name: 'Amina Traoré',
      role: 'UI Designer · Agence créative',
      avatar: 'https://ui-avatars.com/api/?name=Amina+Traore&background=4c6ef5&color=fff&size=200',
      formation: 'Design UX/UI avec Figma',
      text: "L'accompagnement individualisé fait vraiment la différence. J'ai un portfolio solide que je peux présenter avec confiance.",
    },
  ],
  stats: [
    { value: 'Petits groupes', label: 'accompagnement personnalisé' },
    { value: '4 Formations', label: 'métiers du digital' },
    { value: '5+ ans', label: "d'expérience terrain" },
    { value: '100%', label: 'projets concrets & portfolio' },
  ],
  features: [
    {
      title: 'Formation orientée pratique',
      description: "Chaque notion est suivie d'un exercice ou d'une application concrète. On apprend en faisant, pas en lisant.",
    },
    {
      title: 'Projets concrets',
      description: 'Les apprenants travaillent sur des cas réalistes pour mieux comprendre le terrain et construire des réalisations présentables.',
    },
    {
      title: 'Ressources accessibles',
      description: 'Cours gratuits, supports PDF, vidéos ou contenus structurés selon les modules — disponibles à votre rythme.',
    },
    {
      title: 'Attestation de réussite',
      description: "Remise aux apprenants ayant suivi et validé leur parcours. Une preuve concrète de votre engagement.",
    },
    {
      title: 'Progression encadrée',
      description: "Les parcours sont organisés étape par étape pour faciliter l'apprentissage et éviter de se perdre.",
    },
    {
      title: 'Orientation métier',
      description: 'Aide à mieux comprendre les métiers du digital et choisir une spécialisation adaptée à votre profil.',
    },
  ],
  processSteps: [
    {
      title: 'Exercices corrigés',
      description: 'Chaque module propose des exercices pratiques avec corrections pour valider votre compréhension.',
    },
    {
      title: 'Projets guidés',
      description: 'Vous travaillez sur des projets réels, étape par étape, avec des consignes claires et un cadre structuré.',
    },
    {
      title: 'Supports pratiques',
      description: "Des ressources téléchargeables : fiches mémo, templates, guides d'application selon les modules.",
    },
    {
      title: 'Ressources gratuites',
      description: "Des contenus d'introduction accessibles à tous pour découvrir les bases avant de s'engager.",
    },
    {
      title: 'Amélioration continue',
      description: 'Les programmes sont régulièrement mis à jour pour rester alignés avec les pratiques actuelles du digital.',
    },
  ],
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const store = {
  settings: {
    get: () => _settings,
    update: (updates: Partial<SiteSettings>) => {
      _settings = { ..._settings, ...updates }
      return _settings
    },
  },

  formations: {
    getAll: () => _formations,
    getBySlug: (slug: string) => _formations.find((f) => f.slug === slug),
    create: (data: Omit<Formation, 'id' | 'slug'> & { slug?: string }): Formation => {
      const slug = data.slug || slugify(data.title)
      const f: Formation = { ...data, id: String(Date.now()), slug } as Formation
      _formations.push(f)
      return f
    },
    update: (slug: string, updates: Partial<Formation>): Formation | null => {
      const idx = _formations.findIndex((f) => f.slug === slug)
      if (idx < 0) return null
      _formations[idx] = { ..._formations[idx], ...updates }
      return _formations[idx]
    },
    delete: (slug: string): boolean => {
      const prev = _formations.length
      _formations = _formations.filter((f) => f.slug !== slug)
      return _formations.length < prev
    },
  },

  cours: {
    getAll: () => _cours,
    getBySlug: (slug: string) => _cours.find((c) => c.slug === slug),
    create: (data: Omit<FreeCourse, 'id' | 'slug'> & { slug?: string }): FreeCourse => {
      const slug = data.slug || slugify(data.title)
      const c: FreeCourse = { ...data, id: String(Date.now()), slug } as FreeCourse
      _cours.push(c)
      return c
    },
    update: (slug: string, updates: Partial<FreeCourse>): FreeCourse | null => {
      const idx = _cours.findIndex((c) => c.slug === slug)
      if (idx < 0) return null
      _cours[idx] = { ..._cours[idx], ...updates }
      return _cours[idx]
    },
    delete: (slug: string): boolean => {
      const prev = _cours.length
      _cours = _cours.filter((c) => c.slug !== slug)
      return _cours.length < prev
    },
  },

  blog: {
    getAll: () => _blog,
    getBySlug: (slug: string) => _blog.find((p) => p.slug === slug),
    create: (data: Omit<BlogPost, 'id' | 'slug'> & { slug?: string }): BlogPost => {
      const slug = data.slug || slugify(data.title)
      const p: BlogPost = { ...data, id: String(Date.now()), slug } as BlogPost
      _blog.push(p)
      return p
    },
    update: (slug: string, updates: Partial<BlogPost>): BlogPost | null => {
      const idx = _blog.findIndex((p) => p.slug === slug)
      if (idx < 0) return null
      _blog[idx] = { ..._blog[idx], ...updates }
      return _blog[idx]
    },
    delete: (slug: string): boolean => {
      const prev = _blog.length
      _blog = _blog.filter((p) => p.slug !== slug)
      return _blog.length < prev
    },
  },

  prospects: {
    getAll: () => _prospects,
    getById: (id: string) => _prospects.find((p) => p.id === id),
    create: (data: Omit<Prospect, 'id'>): Prospect => {
      const p: Prospect = {
        ...data,
        id: String(Date.now()) + Math.random().toString(36).slice(2, 7),
      }
      _prospects.push(p)
      return p
    },
    update: (id: string, updates: Partial<Prospect>): Prospect | null => {
      const idx = _prospects.findIndex((p) => p.id === id)
      if (idx < 0) return null
      _prospects[idx] = { ..._prospects[idx], ...updates }
      return _prospects[idx]
    },
    delete: (id: string): boolean => {
      const prev = _prospects.length
      _prospects = _prospects.filter((p) => p.id !== id)
      return _prospects.length < prev
    },
  },
}

export { slugify }
