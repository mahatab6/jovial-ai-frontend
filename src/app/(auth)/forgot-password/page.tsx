'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Mail, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ROUTES } from '@/constants';
import api from '@/services/api';

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
});
type Form = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Form) => {
    try {
      await api.post('/api/auth/forgot-password', data);
      setSent(true);
    } catch (err: any) {
      toast.error('Failed to send reset email');
    }
  };

  if (sent) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-7 w-7 text-primary" />
        </div>
        <h1 className="text-xl font-bold">Check your email</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We sent a password reset link to your email address. It may take a few minutes to arrive.
        </p>
        <Link href={ROUTES.LOGIN}>
          <Button variant="outline" className="mt-6 gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Forgot your password?</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email address</Label>
          <Input id="email" type="email" placeholder="you@example.com" {...register('email')} className={errors.email ? 'border-destructive' : ''} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
          {isSubmitting ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        <Link href={ROUTES.LOGIN} className="flex items-center justify-center gap-1 text-primary hover:underline">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Login
        </Link>
      </p>
    </div>
  );
}
