'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, LogIn, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/constants';
import api from '@/services/api';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setToken } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await api.post('/api/auth/sign-in/email', data);
      const { token, user } = res.data;
      setToken(token);
      setUser(user);
      toast.success('Welcome back!', { description: `Logged in as ${user.name}` });
      router.push(ROUTES.DASHBOARD);
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Invalid email or password';
      setError('email', { message: msg });
      toast.error('Login failed', { description: msg });
    }
  };

  const handleDemoLogin = async () => {
    await onSubmit({ email: 'demo@jovial.ai', password: 'demo123456' });
  };

  return (
    <div>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Sign in to your Jovial AI account
        </p>
      </div>

      {/* Google Login */}
      <Button
        variant="outline"
        className="w-full gap-2"
        type="button"
        onClick={() => toast.info('Google OAuth coming soon')}
      >
        <Globe className="h-4 w-4" />
        Continue with Google
      </Button>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register('email')}
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href={ROUTES.FORGOT_PASSWORD}
              className="text-xs text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            {...register('password')}
            className={errors.password ? 'border-destructive' : ''}
          />
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogIn className="h-4 w-4" />
          )}
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      {/* Demo login */}
      <Button
        variant="ghost"
        className="mt-2 w-full text-xs text-muted-foreground"
        onClick={handleDemoLogin}
        disabled={isSubmitting}
      >
        Use demo account
      </Button>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href={ROUTES.REGISTER} className="font-medium text-primary hover:underline">
          Sign up free
        </Link>
      </p>
    </div>
  );
}
