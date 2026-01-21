import { useQuery } from "@tanstack/react-query"
import { getBlogs } from "@/api/blogs"
import BlogCard from "./BlogCard"

export default function BlogList({
  onSelect,
}: {
  onSelect: (id: number) => void
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  })

  if (isLoading) return <p>Loading blogs...</p>
  if (error) return <p>Error loading blogs</p>

  return (
    <div className="space-y-4">
      {data!.map((blog) => (
        <BlogCard key={blog.id} blog={blog} onClick={onSelect} />
      ))}
    </div>
  )
}
