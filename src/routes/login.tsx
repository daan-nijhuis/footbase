import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
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
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // If already logged in, redirect to home (check cached data too)
  useEffect(() => {
    const cachedSession = authClient.getSessionData?.();
    if (session || cachedSession) {
      window.location.href = "/";
    }
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
          window.location.href = "/";
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
          window.location.href = "/";
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="text-center pb-2">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <div className="mx-auto h-12 w-12 rounded-xl bg-primary flex items-center justify-center mb-4">
                <span className="text-primary-foreground font-bold text-2xl">F</span>
              </div>
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <CardTitle className="text-2xl font-bold">
                  {mode === "login" ? "Welkom terug" : "Account aanmaken"}
                </CardTitle>
                <CardDescription className="mt-2">
                  {mode === "login"
                    ? "Log in om door te gaan naar Footbase"
                    : "Maak een account aan om te beginnen"}
                </CardDescription>
              </motion.div>
            </AnimatePresence>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {mode === "signup" && (
                  <motion.div
                    key="name-field"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
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
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
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
              </motion.div>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  type="submit"
                  className="w-full relative overflow-hidden"
                  disabled={isLoading || success}
                >
                  <AnimatePresence mode="wait">
                    {success ? (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Gelukt!
                      </motion.span>
                    ) : isLoading ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Even geduld...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        {mode === "login" ? "Inloggen" : "Account aanmaken"}
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </form>

            <motion.div
              className="mt-6 text-center text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
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
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
