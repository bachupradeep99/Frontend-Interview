import { useBlog } from '@/hooks/useBlogs';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogDetailProps {
  blogId: number;
}

export function BlogDetail({ blogId }: BlogDetailProps) {
  const { data: blog, isLoading, error } = useBlog(blogId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-96 w-full rounded-lg" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-80 w-full" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-12">Error: {error.message}</div>;
  }

  if (!blog) {
    return <div className="text-center py-12 text-muted-foreground">Blog not found</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{blog.title}</h1>
      </div>

      <img
        src={blog.coverImage}
        alt={blog.title}
        className="w-full h-96 object-cover rounded-lg"
        onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/1200x600?text=No+Cover+Image'; }}
      />

      <div className="flex flex-wrap gap-2">
        {blog.category.map((cat) => (
          <span key={cat} className="text-sm bg-muted px-3 py-1 rounded-full">
            {cat}
          </span>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        Published on {new Date(blog.date).toLocaleDateString()}
      </p>

      <div className="prose max-w-none dark:prose-invert">
        <p className="whitespace-pre-wrap leading-relaxed">{blog.content}</p>
      </div>
    </div>
  );
}
