// src/App.tsx
import { useState } from 'react'
import { useBlogs } from '@/hooks/useBlogs'
import { BlogCard } from '@/components/BlogCard'           // create this if not already
import { BlogSkeleton } from '@/components/BlogSkeleton'   // create this if not already
import { BlogForm } from '@/components/BlogForm'           // from previous message
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default function App() {
  const { data: blogs = [], isLoading, isError, error } = useBlogs()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const selectedBlog = blogs.find(b => String(b.id) === selectedId)

  // Simple client-side filter
  const filteredBlogs = blogs.filter(blog => {
    if (!searchTerm.trim()) return true
    const term = searchTerm.toLowerCase()
    return (
      blog.title.toLowerCase().includes(term) ||
      blog.description.toLowerCase().includes(term) ||
      blog.category.some(cat => cat.toLowerCase().includes(term))
    )
  })

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">CA Monk Blogs</h1>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <Input
            placeholder="Search title, description, category..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button>Create New Blog</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Blog</DialogTitle>
              </DialogHeader>
              <BlogForm 
                onSuccess={() => {
                  // Optional: you can add logic to close dialog here if needed
                  // (using useRef on DialogClose or external close function)
                }} 
              />
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel - List */}
        <div className="w-full md:w-5/12 lg:w-2/5 border-r overflow-y-auto p-4 sm:p-6 space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <BlogSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <div className="text-red-600 p-6 text-center">
              Error loading blogs: {error?.message || 'Unknown error'}
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              {searchTerm ? 'No matching blogs found' : 'No blogs available yet'}
            </div>
          ) : (
            filteredBlogs.map(blog => (
              <BlogCard
                key={blog.id}
                blog={blog}
                isSelected={String(blog.id) === selectedId}
                onClick={() => setSelectedId(String(blog.id))}
              />
            ))
          )}
        </div>

        {/* Right panel - Detail (desktop) */}
        <div className="hidden md:flex md:flex-1 overflow-y-auto p-6 lg:p-8 bg-muted/30">
          {selectedBlog ? (
            <div className="max-w-4xl w-full mx-auto">
              <img
                src={selectedBlog.coverImage}
                alt={selectedBlog.title}
                className="w-full h-64 sm:h-80 object-cover rounded-xl mb-6 shadow-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 
                    'https://via.placeholder.com/1200x600?text=Image+Not+Found'
                }}
              />

              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{selectedBlog.title}</h2>

              <div className="flex flex-wrap gap-2 mb-5">
                {selectedBlog.category.map(cat => (
                  <Badge key={cat} variant="secondary" className="text-sm">
                    {cat}
                  </Badge>
                ))}
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                {new Date(selectedBlog.date).toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>

              <Separator className="my-6" />

              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="whitespace-pre-line leading-relaxed text-lg">
                  {selectedBlog.content}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground text-lg">
              Select a blog from the list to read
            </div>
          )}
        </div>
      </div>

      {/* Mobile detail view - full screen overlay */}
      {selectedBlog && (
        <div className="md:hidden fixed inset-0 bg-background z-50 flex flex-col">
          <div className="p-4 border-b flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedId(null)}
            >
              ←
            </Button>
            <h2 className="text-lg font-semibold truncate flex-1">
              {selectedBlog.title}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            <img
              src={selectedBlog.coverImage}
              alt={selectedBlog.title}
              className="w-full h-56 object-cover rounded-xl mb-6 shadow-sm"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 
                  'https://via.placeholder.com/800x450?text=Image+Not+Found'
              }}
            />

            <div className="flex flex-wrap gap-2 mb-5">
              {selectedBlog.category.map(cat => (
                <Badge key={cat} variant="outline">{cat}</Badge>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              {new Date(selectedBlog.date).toLocaleDateString()}
            </p>

            <p className="leading-relaxed whitespace-pre-line text-base">
              {selectedBlog.content}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}