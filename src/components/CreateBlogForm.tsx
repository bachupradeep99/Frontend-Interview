import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createBlog } from "@/api/blogs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CreateBlogForm() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    mutation.mutate({
      title: form.title.value,
      description: form.description.value,
      content: form.content.value,
      category: ["GENERAL"],
      coverImage: "https://picsum.photos/800/400",
      date: new Date().toISOString(),
    })

    form.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input name="title" placeholder="Title" required />
      <Input name="description" placeholder="Description" required />
      <Input name="content" placeholder="Content" required />
      <Button type="submit">Create Blog</Button>
    </form>
  )
}
