import { useState } from 'react';
import { useCreateBlog } from '@/hooks/useBlogs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

export function BlogForm() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    content: '',
    coverImage: '',
  });

  const createMutation = useCreateBlog();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const categories = formData.category
      .split(',')
      .map(c => c.trim())
      .filter(Boolean);

    createMutation.mutate(
      {
        ...formData,
        category: categories.length ? categories : ['GENERAL'],
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Blog created successfully",
          });
          navigate('/');
        },
        onError: (err) => {
          toast({
            title: "Error",
            description: err.message,
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
      <div>
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="category">Categories (comma separated)</Label>
        <Input
          id="category"
          placeholder="FINANCE, TECHNOLOGY, LIFESTYLE"
          value={formData.category}
          onChange={e => setFormData({ ...formData, category: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="description">Short Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="coverImage">Cover Image URL</Label>
        <Input
          id="coverImage"
          type="url"
          placeholder="https://example.com/image.jpg"
          value={formData.coverImage}
          onChange={e => setFormData({ ...formData, coverImage: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="content">Full Content *</Label>
        <Textarea
          id="content"
          className="min-h-[400px] font-mono"
          value={formData.content}
          onChange={e => setFormData({ ...formData, content: e.target.value })}
          required
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? 'Creating...' : 'Publish Blog'}
        </Button>
      </div>
    </form>
  );
}
