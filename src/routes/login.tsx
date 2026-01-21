import { useState, useEffect, useRef } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Loader2, Mail, Lock, User, ArrowRight, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient, authConfig } from "@/lib/auth-client";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

type AuthMode = "login" | "signup";

function LoginPage() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const hasRedirected = useRef(false);

  // If already logged in, redirect to home (check cached data too)
  useEffect(() => {
    if (hasRedirected.current) return;
    const cachedSession = authClient.getSessionData?.();
    if (session || cachedSession) {
      hasRedirected.current = true;
      router.navigate({ to: "/" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Check if auth is properly configured
    if (!authConfig.isConfigured) {
      setError(
        "Authenticatie is niet correct geconfigureerd. Neem contact op met de beheerder."
      );
      console.error("Auth not configured. VITE_CONVEX_SITE_URL:", authConfig.baseURL);
      setIsLoading(false);
      return;
    }

    try {
      if (mode === "login") {
        const result = await authClient.signIn.email({
          email,
          password,
        });

        if (result.error) {
          // Map common error codes to user-friendly Dutch messages
          const errorMessage = getErrorMessage(result.error);
          setError(errorMessage);
          setIsLoading(false);
        } else {
          setSuccess(true);
          hasRedirected.current = true;
          router.navigate({ to: "/" });
        }
      } else {
        const result = await authClient.signUp.email({
          email,
          password,
          name,
        });

        if (result.error) {
          const errorMessage = getErrorMessage(result.error);
          setError(errorMessage);
          setIsLoading(false);
        } else {
          setSuccess(true);
          hasRedirected.current = true;
          router.navigate({ to: "/" });
        }
      }
    } catch (err) {
      // Handle network errors and unexpected failures
      const errorMessage = getNetworkErrorMessage(err);
      setError(errorMessage);
      console.error("Auth error:", err);
      setIsLoading(false);
    }
  };

  // Map Better Auth error codes to Dutch user-friendly messages
  function getErrorMessage(error: { message?: string; code?: string; status?: number }): string {
    const code = error.code?.toLowerCase() || "";
    const message = error.message?.toLowerCase() || "";
    const status = error.status;

    // Check status codes first
    if (status === 404) {
      return "Authenticatieserver niet bereikbaar. Controleer de configuratie.";
    }
    if (status === 401 || code === "invalid_credentials" || message.includes("invalid")) {
      return "Onjuist e-mailadres of wachtwoord.";
    }
    if (status === 429 || code === "too_many_requests") {
      return "Te veel inlogpogingen. Probeer het later opnieuw.";
    }

    // Check error codes
    if (code === "user_not_found" || message.includes("user not found")) {
      return "Geen account gevonden met dit e-mailadres.";
    }
    if (code === "email_already_exists" || message.includes("already exists")) {
      return "Er bestaat al een account met dit e-mailadres.";
    }
    if (code === "invalid_email" || message.includes("invalid email")) {
      return "Ongeldig e-mailadres.";
    }
    if (code === "password_too_short" || message.includes("password") && message.includes("short")) {
      return "Wachtwoord moet minimaal 8 tekens bevatten.";
    }
    if (code === "weak_password" || message.includes("weak password")) {
      return "Kies een sterker wachtwoord.";
    }

    // Fallback to original message or generic error
    return error.message || "Er is iets misgegaan. Probeer het opnieuw.";
  }

  // Handle network-level errors
  function getNetworkErrorMessage(err: unknown): string {
    if (err instanceof TypeError && err.message.includes("fetch")) {
      return "Kan geen verbinding maken met de server. Controleer je internetverbinding.";
    }
    if (err instanceof Error) {
      if (err.message.includes("404")) {
        return "Authenticatieserver niet gevonden. De app is mogelijk niet correct geconfigureerd.";
      }
      if (err.message.includes("network") || err.message.includes("CORS")) {
        return "Netwerkfout. Probeer het later opnieuw.";
      }
    }
    return "Er is een onverwachte fout opgetreden. Probeer het opnieuw.";
  }

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto h-12 w-12 rounded-xl bg-primary flex items-center justify-center mb-4">
              <span className="text-primary-foreground font-bold text-2xl">F</span>
            </div>
            <CardTitle className="text-2xl font-bold">
              {mode === "login" ? "Welkom terug" : "Account aanmaken"}
            </CardTitle>
            <CardDescription className="mt-2">
              {mode === "login"
                ? "Log in om door te gaan naar Footbase"
                : "Maak een account aan om te beginnen"}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="name">Naam</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Je naam"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                      required={mode === "signup"}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="je@email.nl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Wachtwoord</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Je wachtwoord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || success}
              >
                {success ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Gelukt!
                  </span>
                ) : isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Even geduld...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    {mode === "login" ? "Inloggen" : "Account aanmaken"}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {mode === "login" ? (
                <>
                  Nog geen account?{" "}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-primary hover:underline font-medium transition-colors"
                  >
                    Registreer hier
                  </button>
                </>
              ) : (
                <>
                  Al een account?{" "}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-primary hover:underline font-medium transition-colors"
                  >
                    Log in
                  </button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
