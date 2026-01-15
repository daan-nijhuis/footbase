import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Users, Trophy } from "lucide-react";

function NavLink({
  to,
  children,
  icon: Icon,
}: {
  to: string;
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const routerState = useRouterState();
  const isActive = routerState.location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      )}
    >
      <Icon className="h-4 w-4" />
      {children}
    </Link>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">F</span>
          </div>
          <span className="text-xl font-bold">Footbase</span>
        </Link>

        <div className="flex items-center gap-1">
          <NavLink to="/players" icon={Users}>
            Spelers
          </NavLink>
          <NavLink to="/competitions" icon={Trophy}>
            Competities
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
