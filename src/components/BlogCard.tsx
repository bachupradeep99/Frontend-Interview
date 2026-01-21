// src/components/BlogCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils' // shadcn/ui utility
import { Blog } from '@/types/blog'

interface BlogCardProps {
  blog: Blog
  isSelected: boolean
  onClick: () => void
}

export function BlogCard({ blog, isSelected, onClick }: BlogCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md hover:border-primary/50",
        isSelected && "border-primary border-2 shadow-lg"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex flex-wrap gap-2 mb-2">
          {blog.category.map((cat) => (
            <Badge key={cat} variant="secondary" className="text-xs">
              {cat}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-lg leading-tight line-clamp-2">
          {blog.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
          {blog.description}
        </p>
        <p className="text-xs text-muted-foreground">
          {new Date(blog.date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
        </p>
      </CardContent>
    </Card>
  )
}