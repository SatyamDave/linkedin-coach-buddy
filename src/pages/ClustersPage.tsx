import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NextStep } from "@/components/NextStep";
import { Users, Briefcase, School, Star } from "lucide-react";

const clusters = [
  {
    title: "Alumni",
    description: "Connections from your alma mater.",
    icon: School,
  },
  {
    title: "Recruiters in Finance",
    description: "Recruiters working in the finance industry.",
    icon: Briefcase,
  },
  {
    title: "Peers in Purdue",
    description: "People who also went to Purdue.",
    icon: Users,
  },
  {
    title: "Mentors in Banking",
    description: "Potential mentors in the banking sector.",
    icon: Star,
  },
];

export function ClustersPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Explore Clusters</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {clusters.map((cluster) => (
          <Card key={cluster.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">{cluster.title}</CardTitle>
              <cluster.icon className="w-6 h-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{cluster.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <NextStep to="/">Back to Home</NextStep>
    </div>
  );
}
