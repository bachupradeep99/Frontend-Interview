// src/App.tsx
import { Routes, Route, useParams, Link } from 'react-router-dom';
import { BlogList } from './components/BlogList';
import { BlogDetail } from './components/BlogDetail';
import { BlogForm } from './components/BlogForm';
import { Button } from './components/ui/button';

function BlogDetailWrapper() {
  const { id } = useParams<{ id: string }>();
  const blogId = id ? Number(id) : undefined;
  return blogId ? <BlogDetail blogId={blogId} /> : <div>Invalid blog ID</div>;
}

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
        <div className="container flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            CA Monk Blog
          </Link>
          <Button asChild>
            <Link to="/create">Create Blog</Link>
          </Button>
        </div>
      </header>

      <main className="container py-8 pb-20">
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetailWrapper />} />
          <Route path="/create" element={<BlogForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
