import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, GraduationCap, Target } from "lucide-react";

const clusters = [
  {
    name: "Tech Leaders",
    icon: Briefcase,
    count: 45,
    description: "Senior engineers, CTOs, and tech founders",
    color: "bg-primary/10 text-primary",
  },
  {
    name: "Alumni Network",
    icon: GraduationCap,
    count: 32,
    description: "Former classmates and university connections",
    color: "bg-accent/10 text-accent",
  },
  {
    name: "Recruiters",
    icon: Target,
    count: 18,
    description: "Talent acquisition and HR professionals",
    color: "bg-primary-light/10 text-primary-light",
  },
  {
    name: "Mentors & Advisors",
    icon: Users,
    count: 12,
    description: "Industry veterans and career coaches",
    color: "bg-accent/10 text-accent",
  },
];

const ConnectionClusters = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Network Clusters</h2>
        <p className="text-muted-foreground">
          Your connections organized by relationship type and industry
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {clusters.map((cluster) => {
          const Icon = cluster.icon;
          return (
            <Card
              key={cluster.name}
              className="p-6 space-y-4 border-border/50 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-b from-card to-secondary/30"
            >
              <div className="flex items-start justify-between">
                <div className={`h-12 w-12 rounded-lg ${cluster.color} flex items-center justify-center`}>
                  <Icon className="h-6 w-6" />
                </div>
                <Badge variant="secondary" className="text-lg font-semibold">
                  {cluster.count}
                </Badge>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{cluster.name}</h3>
                <p className="text-sm text-muted-foreground">{cluster.description}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ConnectionClusters;
