import { useQuery } from "@tanstack/react-query"
import { getBlogById } from "@/api/blogs"

export default function BlogDetail({ id }: { id: number }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id),
    enabled: !!id,
  })

  if (!id) return <p>Select a blog</p>
  if (isLoading) return <p>Loading blog...</p>
  if (error) return <p>Error loading blog</p>

  return (
    <div className="space-y-4">
      <img
        src={data!.coverImage}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h1 className="text-2xl font-bold">{data!.title}</h1>
      <p className="text-gray-600">{data!.content}</p>
    </div>
  )
}
