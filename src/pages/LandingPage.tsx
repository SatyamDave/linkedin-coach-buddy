import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { AnimatedNetworkBg } from "@/components/AnimatedNetworkBg";
import { Search, Waypoints, CheckCircle, LayoutDashboard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <AnimatedNetworkBg />
      <div className="relative z-10 max-w-3xl text-center px-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Find the fastest path to your dream connection.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Step 1: Search → Step 2: Explore Path → Step 3: Act.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Ex: Investment Banking at Goldman Sachs"
              className="pl-10"
            />
          </div>
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent text-white">
            <Link to="/map">Find My Goldman Path →</Link>
          </Button>
          <Button variant="link" asChild>
            <Link to="/map?example=true">Try Example Search</Link>
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Built for Students, Career Switchers, and Young Pros.
        </p>
      </div>
      <div className="relative z-10 mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl w-full px-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Waypoints className="w-6 h-6 text-primary" />
              Visualize
            </CardTitle>
          </CardHeader>
          <CardContent>
            See your network as an interactive map and discover hidden connections.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-successGreen" />
              Connect
            </CardTitle>
          </CardHeader>
          <CardContent>
            Get AI-powered outreach templates and suggested actions for every connection.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LayoutDashboard className="w-6 h-6 text-accent" />
              Track
            </CardTitle>
          </CardHeader>
          <CardContent>
            Manage your networking efforts with a weekly plan and progress dashboard.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}