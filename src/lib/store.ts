import { formations as defaultFormations } from '@/data/formations'
import { coursgratuits as defaultCours } from '@/data/cours'
import { blogPosts as defaultBlog } from '@/data/blog'
import type { Formation, FreeCourse, BlogPost } from '@/types'

// In-memory store — initialized with static data, replaced by a real DB later
let _formations: Formation[] = JSON.parse(JSON.stringify(defaultFormations))
let _cours: FreeCourse[] = JSON.parse(JSON.stringify(defaultCours))
let _blog: BlogPost[] = JSON.parse(JSON.stringify(defaultBlog))

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const store = {
  formations: {
    getAll: () => _formations,
    getBySlug: (slug: string) => _formations.find((f) => f.slug === slug),
    create: (data: Omit<Formation, 'id' | 'slug'> & { slug?: string }): Formation => {
      const slug = data.slug || slugify(data.title)
      const f: Formation = {
        ...data,
        id: String(Date.now()),
        slug,
      } as Formation
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
}

export { slugify }
