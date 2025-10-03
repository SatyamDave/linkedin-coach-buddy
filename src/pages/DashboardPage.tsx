import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WeeklyPlan } from "@/components/WeeklyPlan";
import { NextStep } from "@/components/NextStep";
import { Users, Briefcase, Award, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Progress Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Warm Intros</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">unlocked this month</p>
            <Progress value={50} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Alumni Connections</CardTitle>
            <Briefcase className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">built</p>
            <Progress value={30} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Networking Streak</CardTitle>
            <Zap className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 weeks</div>
            <p className="text-xs text-muted-foreground">keep it up!</p>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
              <Award className="w-4 h-4 mr-1" />
              Alumni Explorer
            </Badge>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
              <Users className="w-4 h-4 mr-1" />
              Recruiter Connector
            </Badge>
            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
              <Briefcase className="w-4 h-4 mr-1" />
              Mentorship Builder
            </Badge>
          </CardContent>
        </Card>
        <WeeklyPlan />
      </div>
      <NextStep to="/clusters">Explore Clusters</NextStep>
    </div>
  );
}