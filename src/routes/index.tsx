import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Trophy } from "lucide-react";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary mb-6">
            <span className="text-primary-foreground font-bold text-3xl">F</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Footbase
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            European Football Scouting Platform
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/players">
              <Button size="lg" className="gap-2">
                <Users className="h-5 w-5" />
                Bekijk Spelers
              </Button>
            </Link>
            <Link to="/competitions">
              <Button size="lg" variant="outline" className="gap-2">
                <Trophy className="h-5 w-5" />
                Bekijk Competities
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Spelers Ranking</CardTitle>
              <CardDescription>
                Bekijk en vergelijk spelers op basis van prestaties over 365 dagen of de laatste 5 wedstrijden
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/players">
                <Button variant="outline" className="w-full">
                  Naar Spelers
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
                <Trophy className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle>Competities</CardTitle>
              <CardDescription>
                Verken competities met tier classificatie: Platinum, Diamond, Elite, Goud, Zilver, Brons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/competitions">
                <Button variant="outline" className="w-full">
                  Naar Competities
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-muted-foreground">
          <p>MVP Version - Geen authenticatie vereist</p>
          <p className="mt-2">
            Competition Tiers: Platinum, Diamond/Elite, Goud, Zilver, Brons
          </p>
        </div>
      </div>
    </div>
  );
}
