import { useBlogs } from '@/hooks/useBlogs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';

export function BlogList() {
  const { data: blogs, isLoading, error } = useBlogs();

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">Error: {error.message}</div>;
  }

  if (!blogs?.length) {
    return <div className="text-center py-12 text-muted-foreground">No blogs found</div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <Link key={blog.id} to={`/blog/${blog.id}`} className="block group">
          <Card className="overflow-hidden h-full transition-shadow group-hover:shadow-lg">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="h-48 w-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image'; }}
            />
            <CardHeader className="pb-2">
              <div className="flex flex-wrap gap-2 mb-2">
                {blog.category.map((cat) => (
                  <span key={cat} className="text-xs bg-muted px-2 py-1 rounded">
                    {cat}
                  </span>
                ))}
              </div>
              <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                {blog.title}
              </CardTitle>
              <CardDescription className="line-clamp-3">
                {blog.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {new Date(blog.date).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
