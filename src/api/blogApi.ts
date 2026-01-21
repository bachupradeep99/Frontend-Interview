// src/api/blogApi.ts
import { Blog, NewBlogInput } from '@/types/blog';

const API_BASE = 'http://localhost:3001';

export async function fetchAllBlogs(): Promise<Blog[]> {
  const response = await fetch(`${API_BASE}/blogs`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch blogs: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export async function fetchBlogById(id: number | string): Promise<Blog> {
  const response = await fetch(`${API_BASE}/blogs/${id}`);

  if (!response.ok) {
    throw new Error(
      `Blog not found: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export async function createNewBlog(data: NewBlogInput): Promise<Blog> {
  const response = await fetch(`${API_BASE}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      date: new Date().toISOString(), // Automatically set creation date
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to create blog: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}