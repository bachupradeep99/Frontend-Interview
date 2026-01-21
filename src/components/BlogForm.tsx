// src/components/BlogForm.tsx
import { useState } from 'react'
import { useCreateBlog } from '@/hooks/useCreateBlog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { DialogClose } from '@/components/ui/dialog'

export function BlogForm({ onSuccess }: { onSuccess?: () => void }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [categoriesStr, setCategoriesStr] = useState('')

  const { mutate, isPending } = useCreateBlog()
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !description.trim() || !content.trim() || !coverImage.trim()) {
      toast({
        title: "Missing required fields",
        description: "Title, description, content and image URL are required",
        variant: "destructive",
      })
      return
    }

    const categories = categoriesStr
      .split(',')
      .map(c => c.trim())
      .filter(Boolean)

    mutate(
      {
        title: title.trim(),
        description: description.trim(),
        content: content.trim(),
        coverImage: coverImage.trim(),
        category: categories.length > 0 ? categories : ['GENERAL'],
      },
      {
        onSuccess: () => {
          toast.success("Blog created successfully")
          setTitle('')
          setDescription('')
          setContent('')
          setCoverImage('')
          setCategoriesStr('')
          onSuccess?.()
        },
        onError: () => {
          toast.error("Failed to create blog. Please try again.")
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 py-2">
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Future of Fintech"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short summary..."
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Full Content *</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write the complete blog here..."
          rows={10}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImage">Cover Image URL *</Label>
        <Input
          id="coverImage"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder="https://images.pexels.com/..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="categories">Categories (comma separated)</Label>
        <Input
          id="categories"
          value={categoriesStr}
          onChange={(e) => setCategoriesStr(e.target.value)}
          placeholder="FINANCE, TECH, CAREER"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <DialogClose asChild>
          <Button type="button" variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create Blog'}
        </Button>
      </div>
    </form>
  )
}