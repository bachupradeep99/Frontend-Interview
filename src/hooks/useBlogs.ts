// src/hooks/useBlogs.ts
import { useQuery } from '@tanstack/react-query';
import { fetchAllBlogs } from '@/api/blogApi';

export function useBlogs() {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: fetchAllBlogs,
  });
}