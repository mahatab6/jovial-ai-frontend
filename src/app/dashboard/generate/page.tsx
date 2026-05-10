'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Wand2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/shared/PageHeader';
import { JobTracker } from '@/features/ai/JobTracker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ROUTES } from '@/constants';
import api from '@/services/api';

const generateSchema = z.object({
  prompt: z.string().min(10, 'Prompt must be at least 10 characters long'),
  type: z.enum(['BLOG', 'SOCIAL_POST', 'EMAIL', 'PRODUCT_DESC', 'OTHER'], {
    error: 'Please select a content type',
  }),
  tone: z.string().optional(),
  model: z.string().optional(),
});

type GenerateForm = z.infer<typeof generateSchema>;

const CONTENT_TYPES = [
  { value: 'BLOG', label: 'Blog Post' },
  { value: 'SOCIAL_POST', label: 'Social Media Post' },
  { value: 'EMAIL', label: 'Email Campaign' },
  { value: 'PRODUCT_DESC', label: 'Product Description' },
  { value: 'OTHER', label: 'Other' },
];

const TONES = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual & Friendly' },
  { value: 'enthusiastic', label: 'Enthusiastic' },
  { value: 'persuasive', label: 'Persuasive' },
  { value: 'humorous', label: 'Humorous' },
];

const MODELS = [
  { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash (Google - Recommended)' },
  { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro (Google Premium)' },
  { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash (Classic)' },
  { value: 'gpt-4o-mini', label: 'GPT-4o Mini (Fast)' },
];

export default function AIGeneratorPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<GenerateForm>({
    resolver: zodResolver(generateSchema),
    defaultValues: {
      type: 'BLOG',
      tone: 'professional',
      model: 'gemini-2.5-flash',
    },
  });

  const onSubmit = async (data: GenerateForm) => {
    try {
      setIsSubmitting(true);
      const res = await api.post('/api/v1/ai/generate', data);
      
      toast.success('Generation started!', {
        description: 'Your content is being generated in the background.',
      });
      
      const newJobId = res.data?.data?.jobId;
      if (newJobId) {
        setJobId(newJobId);
      } else {
        throw new Error('No Job ID returned from server');
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to start generation';
      toast.error('Error', { description: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-8">
      <PageHeader
        title="AI Content Generator"
        description="Describe what you want to write, choose your settings, and let our AI do the heavy lifting."
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
      </PageHeader>

      {jobId ? (
        <JobTracker jobId={jobId} onReset={() => setJobId(null)} />
      ) : (
        <>
          <Card className="p-6 md:p-8 border-border shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Prompt Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="prompt" className="text-base font-semibold">
                    What would you like to create?
                  </Label>
                  <span className="text-xs text-muted-foreground">Min 10 characters</span>
                </div>
                <Textarea
                  id="prompt"
                  placeholder="E.g., Write a comprehensive guide on how to migrate from React to Next.js 15, focusing on server components..."
                  className={`min-h-[160px] resize-y text-base p-4 ${
                    errors.prompt ? 'border-destructive focus-visible:ring-destructive' : ''
                  }`}
                  {...register('prompt')}
                />
                {errors.prompt && (
                  <p className="text-sm text-destructive font-medium">{errors.prompt.message}</p>
                )}
              </div>

              {/* Settings Grid */}
              <div className="grid gap-6 md:grid-cols-3">
                
                {/* Content Type */}
                <div className="space-y-2">
                  <Label htmlFor="type" className="font-semibold">Content Type</Label>
                  <Controller
                    control={control}
                    name="type"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full h-10">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {CONTENT_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.type && <p className="text-xs text-destructive">{errors.type.message}</p>}
                </div>

                {/* Tone */}
                <div className="space-y-2">
                  <Label htmlFor="tone" className="font-semibold">Voice & Tone</Label>
                  <Controller
                    control={control}
                    name="tone"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full h-10">
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent>
                          {TONES.map((tone) => (
                            <SelectItem key={tone.value} value={tone.value}>
                              {tone.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* AI Model */}
                <div className="space-y-2">
                  <Label htmlFor="model" className="font-semibold">AI Model</Label>
                  <Controller
                    control={control}
                    name="model"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full h-10">
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent>
                          {MODELS.map((model) => (
                            <SelectItem key={model.value} value={model.value}>
                              {model.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end border-t border-border mt-8">
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 gap-2 font-semibold shadow-lg shadow-primary/20"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Wand2 className="h-5 w-5" />
                  )}
                  {isSubmitting ? 'Queueing Generation...' : 'Generate Content'}
                </Button>
              </div>

            </form>
          </Card>
          
          {/* Helper text */}
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Generations may take up to 60 seconds depending on the model and requested length.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
