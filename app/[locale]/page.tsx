"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Building2, Lock, Mail, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push("/home");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isAuthenticated) return null;

  const handleDemoLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        toast.success("Welcome back!");
        router.push("/home");
      } else {
        setError("Invalid demo credentials");
        toast.error("Invalid email or password");
      }
      setLoading(false);
    }, 500);
  };

  const handleSupabaseLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (err: unknown) {
      let message = "An error occurred during login";
      if (err instanceof Error) {
        if (err.message.includes("Invalid login credentials")) {
          message = "Invalid email or password";
        } else {
          message = err.message;
        }
      }
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="flex size-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Building2 className="size-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">AM Enterprises</h1>
            <p className="text-sm text-muted-foreground">360° Digital Agency Admin Panel</p>
          </div>
        </div>

        {/* Card */}
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-lg">Sign in to your account</CardTitle>
            <CardDescription>Choose your login method</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="demo" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="demo" disabled={loading}>Demo Account</TabsTrigger>
                <TabsTrigger value="supabase" disabled={loading}>Supabase Auth</TabsTrigger>
              </TabsList>

              <TabsContent value="demo" className="mt-4">
                <form onSubmit={handleDemoLogin} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="demo-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="demo-email"
                        type="email"
                        placeholder="admin@amenterprises.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="demo-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="demo-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {error && <p className="text-sm text-destructive">{error}</p>}

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign in with Demo"
                    )}
                  </Button>
                </form>

                {/* Demo Accounts Info */}
                <div className="mt-6 rounded-lg bg-muted p-3">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">Demo Accounts:</p>
                  <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                    <button
                      type="button"
                      onClick={() => { setEmail("admin@amenterprises.com"); setPassword("admin123"); }}
                      className="text-left hover:text-foreground transition-colors"
                      disabled={loading}
                    >
                      Admin: admin@amenterprises.com / admin123
                    </button>
                    <button
                      type="button"
                      onClick={() => { setEmail("manager@amenterprises.com"); setPassword("manager123"); }}
                      className="text-left hover:text-foreground transition-colors"
                      disabled={loading}
                    >
                      Manager: manager@amenterprises.com / manager123
                    </button>
                    <button
                      type="button"
                      onClick={() => { setEmail("dev@amenterprises.com"); setPassword("dev123"); }}
                      className="text-left hover:text-foreground transition-colors"
                      disabled={loading}
                    >
                      Dev: dev@amenterprises.com / dev123
                    </button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="supabase" className="mt-4">
                <form onSubmit={handleSupabaseLogin} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="supabase-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="supabase-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="supabase-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="supabase-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {error && <p className="text-sm text-destructive">{error}</p>}

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign in with Supabase"
                    )}
                  </Button>
                </form>

                <div className="mt-4 text-center text-sm">
                  Don't have an account?{" "}
                  <Link href="/auth/sign-up" className="underline underline-offset-4 hover:text-primary">
                    Sign up
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}