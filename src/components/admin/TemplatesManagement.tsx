'use client';

import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, Loader2, Search, Info } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/services/api';
import { QUERY_KEYS } from '@/constants';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DataTable, SortableHeader } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { TableSkeleton } from '@/components/dashboard/skeletons/DashboardSkeleton';
import { Badge } from '@/components/ui/badge';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  previewText: string;
  specifications: string;
  createdAt: string;
}

export function TemplatesManagement() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    previewText: '',
    specifications: '',
  });

  // Fetch Templates
  const { data: templates, isLoading } = useQuery({
    queryKey: QUERY_KEYS.TEMPLATES_LIST,
    queryFn: async () => {
      const res = await api.get('/api/v1/templates');
      return res.data?.data || [];
    },
  });

  // Create Mutation
  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await api.post('/api/v1/templates', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TEMPLATES_LIST });
      toast.success('Template created successfully');
      handleCloseDialog();
    },
    onError: () => toast.error('Failed to create template'),
  });

  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<typeof formData> }) => {
      const res = await api.put(`/api/v1/templates/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TEMPLATES_LIST });
      toast.success('Template updated successfully');
      handleCloseDialog();
    },
    onError: () => toast.error('Failed to update template'),
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/api/v1/templates/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TEMPLATES_LIST });
      toast.success('Template deleted successfully');
    },
    onError: () => toast.error('Failed to delete template'),
  });

  const handleOpenCreate = () => {
    setEditingTemplate(null);
    setFormData({
      name: '',
      description: '',
      category: '',
      previewText: '',
      specifications: '',
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (template: Template) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      description: template.description,
      category: template.category,
      previewText: template.previewText,
      specifications: template.specifications,
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingTemplate(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTemplate) {
      updateMutation.mutate({ id: editingTemplate.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      deleteMutation.mutate(id);
    }
  };

  const columns = useMemo<ColumnDef<Template>[]>(() => [
    {
      accessorKey: 'name',
      header: ({ column }) => <SortableHeader column={column} title="Template Name" />,
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.name}</span>
          <span className="text-xs text-muted-foreground line-clamp-1">{row.original.description}</span>
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: ({ column }) => <SortableHeader column={column} title="Category" />,
      cell: ({ row }) => <Badge variant="secondary">{row.original.category}</Badge>,
    },
    {
      accessorKey: 'rating',
      header: ({ column }) => <SortableHeader column={column} title="Rating" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm">
          <span className="font-medium">{row.original.rating}</span>
          <span className="text-muted-foreground text-xs">({row.original.reviewCount})</span>
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleOpenEdit(row.original)}
            className="h-8 w-8 text-muted-foreground hover:text-primary"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(row.original.id)}
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending && deleteMutation.variables === row.original.id ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      ),
    },
  ], [deleteMutation]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">AI Templates</h3>
          <p className="text-sm text-muted-foreground">Configure the templates available for AI generation.</p>
        </div>
        <Button onClick={handleOpenCreate} className="gap-2">
          <Plus className="h-4 w-4" /> Create Template
        </Button>
      </div>

      <Card className="p-6 border-border shadow-sm">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <DataTable
            columns={columns}
            data={templates || []}
            searchKey="name"
            searchPlaceholder="Search templates..."
          />
        )}
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingTemplate ? 'Edit Template' : 'Create New Template'}</DialogTitle>
            <DialogDescription>
              Enter the details for the template. These fields will be used to guide the AI.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Professional Email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief summary of what this template does"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="previewText">Preview Text</Label>
              <Textarea
                id="previewText"
                value={formData.previewText}
                onChange={(e) => setFormData({ ...formData, previewText: e.target.value })}
                placeholder="A sample output to show users"
                className="min-h-[80px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specifications">Specifications (Instructions)</Label>
              <Textarea
                id="specifications"
                value={formData.specifications}
                onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                placeholder="Instructions for the AI (e.g., Tone, Style, Structure)"
                className="min-h-[120px]"
                required
              />
              <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Info className="h-3 w-3" /> This field is crucial for the AI output quality.
              </p>
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {(createMutation.isPending || updateMutation.isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {editingTemplate ? 'Update Template' : 'Create Template'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
