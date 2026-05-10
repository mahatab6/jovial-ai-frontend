'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, LogIn, Eye, EyeOff, ShieldCheck, Users, User } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/constants';
import api from '@/services/api';
import GoogleLogin from '@/components/auth/GoogleLogin';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

// ─── Demo credential definitions ─────────────────────────────────────────────
const DEMO_CREDENTIALS = [
  {
    role: 'Admin',
    email: 'admin@gmail.com',
    password: 'password1234',
    icon: ShieldCheck,
    description: 'Full system access',
    color: 'from-rose-500/10 to-rose-600/5 border-rose-500/30 hover:border-rose-500/60',
    iconColor: 'text-rose-500',
    badge: 'bg-rose-500/15 text-rose-500',
  },
  {
    role: 'Manager',
    email: 'manager@gmail.com',
    password: 'password1234',
    icon: Users,
    description: 'Team management',
    color: 'from-amber-500/10 to-amber-600/5 border-amber-500/30 hover:border-amber-500/60',
    iconColor: 'text-amber-500',
    badge: 'bg-amber-500/15 text-amber-500',
  },
  {
    role: 'User',
    email: 'user@gmail.com',
    password: 'password1234',
    icon: User,
    description: 'Standard access',
    color: 'from-blue-500/10 to-blue-600/5 border-blue-500/30 hover:border-blue-500/60',
    iconColor: 'text-blue-500',
    badge: 'bg-blue-500/15 text-blue-500',
  },
] as const;

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setToken, isAuthenticated } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [demoLoadingRole, setDemoLoadingRole] = useState<string | null>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await api.post('/api/auth/sign-in/email', data);
      const { token, user } = res.data;
      setToken(token);
      setUser(user);
      toast.success('Welcome back!', { description: `Logged in as ${user.name}` });
      router.push(ROUTES.DASHBOARD);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Invalid email or password';
      setError('email', { message: msg });
      toast.error('Login failed', { description: msg });
    }
  };

  // Auto-fill credentials and submit for the selected demo role
  const handleDemoLogin = async (cred: (typeof DEMO_CREDENTIALS)[number]) => {
    setDemoLoadingRole(cred.role);
    setValue('email', cred.email, { shouldValidate: true });
    setValue('password', cred.password, { shouldValidate: true });
    try {
      await onSubmit({ email: cred.email, password: cred.password });
    } finally {
      setDemoLoadingRole(null);
    }
  };

  const isAnyLoading = isSubmitting || demoLoadingRole !== null;

  return (
    <div>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Sign in to your Jovial AI account
        </p>
      </div>

      {/* Google Login */}
      <GoogleLogin />

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
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="current-password"
              {...register('password')}
              className={`${errors.password ? 'border-destructive' : ''} pr-10`}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full gap-2" disabled={isAnyLoading}>
          {isSubmitting && demoLoadingRole === null ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogIn className="h-4 w-4" />
          )}
          {isSubmitting && demoLoadingRole === null ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      {/* ── Demo Credentials ─────────────────────────────────────────── */}
      <div className="mt-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground font-medium">Demo credentials</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {DEMO_CREDENTIALS.map((cred) => {
            const Icon = cred.icon;
            const isLoading = demoLoadingRole === cred.role;
            return (
              <button
                key={cred.role}
                type="button"
                disabled={isAnyLoading}
                onClick={() => handleDemoLogin(cred)}
                className={`
                  relative flex flex-col items-center gap-1.5 rounded-xl border bg-gradient-to-b
                  px-2 py-3 text-center transition-all duration-200 cursor-pointer
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${cred.color}
                `}
              >
                {isLoading ? (
                  <Loader2 className={`h-5 w-5 animate-spin ${cred.iconColor}`} />
                ) : (
                  <Icon className={`h-5 w-5 ${cred.iconColor}`} />
                )}
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${cred.badge}`}>
                  {cred.role}
                </span>
                <span className="text-[10px] text-muted-foreground leading-tight">
                  {cred.description}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-2 text-center text-[10px] text-muted-foreground">
          Click any card to instantly sign in with that role
        </p>
      </div>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href={ROUTES.REGISTER} className="font-medium text-primary hover:underline">
          Sign up free
        </Link>
      </p>
    </div>
  );
}
