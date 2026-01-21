// src/hooks/useCreateBlog.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNewBlog } from '@/api/blogApi'
import { NewBlogInput } from '@/types/blog'

export function useCreateBlog() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: NewBlogInput) => createNewBlog(data),
    onSuccess: () => {
      // Automatically refresh the blog list after creation
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      // Optional: also invalidate single blog queries if needed
      // queryClient.invalidateQueries({ queryKey: ['blog'] })
    },
    onError: (error) => {
      console.error('Create blog error:', error)
    }
  })
}