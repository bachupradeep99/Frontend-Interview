const API_BASE = 'http://localhost:3001';

export const fetchBlogs = async (): Promise<Blog[]> => {
  const res = await fetch(`${API_BASE}/blogs`);
  if (!res.ok) throw new Error('Failed to fetch blogs');
  return res.json();
};

export const fetchBlogById = async (id: number): Promise<Blog> => {
  const res = await fetch(`${API_BASE}/blogs/${id}`);
  if (!res.ok) throw new Error('Failed to fetch blog');
  return res.json();
};

export const createBlog = async (newBlog: Omit<Blog, 'id'>): Promise<Blog> => {
  const res = await fetch(`${API_BASE}/blogs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...newBlog,
      date: new Date().toISOString(),
    }),
  });
  if (!res.ok) throw new Error('Failed to create blog');
  return res.json();
};
