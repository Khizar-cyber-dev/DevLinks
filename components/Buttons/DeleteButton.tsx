'use client';


import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Icons } from '../Icon';

export function DeleteButton({ projectId }: { projectId: string }) {
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      const response = await fetch(`/api/project/${projectId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete project');
      
      toast.success('Project deleted successfully');
      window.location.reload();
    } catch (error) {
      toast.error('Failed to delete project');
      console.error('Delete error:', error);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-red-600 hover:text-red-700"
      onClick={handleDelete}
    >
      <Icons.delete className="h-4 w-4 mr-2" />
      Delete
    </Button>
  );
}