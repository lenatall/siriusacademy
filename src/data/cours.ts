import type { FreeCourse } from '@/types'

export const coursgratuits: FreeCourse[] = [
  {
    id: '1',
    slug: 'intro-html-css',
    title: 'Introduction au HTML & CSS',
    description:
      'Apprenez les bases du langage HTML pour structurer vos pages et CSS pour les mettre en forme. Un point de départ essentiel pour tout apprenti développeur web.',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80',
    duration: '3h 30min',
    level: 'Débutant',
    category: 'Développement',
    lessonsCount: 12,
    instructor: 'Marie Dupont',
    topics: [
      'Structure d\'une page HTML5',
      'Sélecteurs et propriétés CSS',
      'Le modèle de boîte (box model)',
      'Flexbox pour la mise en page',
      'Responsive design basique',
    ],
  },
  {
    id: '2',
    slug: 'bases-seo',
    title: 'Les bases du référencement SEO',
    description:
      'Découvrez comment fonctionne Google et apprenez les règles fondamentales du SEO pour améliorer la visibilité de votre site web dès aujourd\'hui.',
    image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&q=80',
    duration: '2h 15min',
    level: 'Débutant',
    category: 'Marketing',
    lessonsCount: 8,
    instructor: 'Thomas Renard',
    topics: [
      'Comment fonctionnent les moteurs de recherche',
      'Recherche de mots-clés avec des outils gratuits',
      'Optimisation des balises title et meta description',
      'Structure des URLs et maillage interne',
      'Introduction au netlinking',
    ],
  },
  {
    id: '3',
    slug: 'figma-debutants',
    title: 'Figma pour débutants',
    description:
      'Prenez en main Figma, l\'outil de design incontournable. Créez vos premières maquettes et apprenez les bases du design d\'interface en partant de zéro.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    duration: '4h 00min',
    level: 'Débutant',
    category: 'Design',
    lessonsCount: 14,
    instructor: 'Camille Martin',
    topics: [
      'Interface et navigation dans Figma',
      'Formes, textes et images',
      'Utilisation des composants',
      'Auto-layout pour des designs flexibles',
      'Création d\'un prototype cliquable',
    ],
  },
  {
    id: '4',
    slug: 'python-premiers-pas',
    title: 'Python : premiers pas',
    description:
      'Initiez-vous à Python, le langage de programmation le plus populaire au monde. Variables, conditions, boucles et fonctions — maîtrisez les fondamentaux.',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80',
    duration: '3h 00min',
    level: 'Débutant',
    category: 'Développement',
    lessonsCount: 10,
    instructor: 'Dr. Julien Leroy',
    topics: [
      'Installation et environnement de développement',
      'Variables, types de données et opérateurs',
      'Conditions if/elif/else',
      'Boucles for et while',
      'Fonctions et modules',
    ],
  },
  {
    id: '5',
    slug: 'fondamentaux-marketing-digital',
    title: 'Les fondamentaux du Marketing Digital',
    description:
      'Un panorama complet du marketing digital en 2024. Comprenez les canaux, outils et stratégies essentiels pour développer votre présence en ligne.',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80',
    duration: '2h 45min',
    level: 'Débutant',
    category: 'Marketing',
    lessonsCount: 9,
    instructor: 'Thomas Renard',
    topics: [
      'Vue d\'ensemble du marketing digital',
      'SEO vs SEA : quelles différences ?',
      'Réseaux sociaux : choisir les bons canaux',
      'Email marketing : les bonnes pratiques',
      'Mesurer ses résultats avec Google Analytics',
    ],
  },
]

export function getCoursGratuitBySlug(slug: string): FreeCourse | undefined {
  return coursgratuits.find((c) => c.slug === slug)
}
