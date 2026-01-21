export interface Blog {
  id: number
  title: string
  category: string[]          // e.g. ["FINANCE", "TECH"]
  description: string
  date: string                // ISO string
  coverImage: string
  content: string
}

export type NewBlog = Omit<Blog, 'id' | 'date'>