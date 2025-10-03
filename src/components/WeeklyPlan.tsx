import { useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialTasks = [
  { id: "task1", label: "DM Priya (Purdue alum, JPMorgan)", checked: true },
  { id: "task2", label: "Ask Alex for intro to Hannah (Goldman)", checked: false },
  { id: "task3", label: "Congratulate Sam on new role at Morgan Stanley", checked: false },
];

export function WeeklyPlan() {
  const [tasks, setTasks] = useState(initialTasks);

  const handleCheckedChange = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const completionPercentage = useMemo(() => {
    const completedTasks = tasks.filter((task) => task.checked).length;
    return (completedTasks / tasks.length) * 100;
  }, [tasks]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Weekly Networking Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center space-x-2">
              <Checkbox
                id={task.id}
                checked={task.checked}
                onCheckedChange={() => handleCheckedChange(task.id)}
                className="transition-all"
              />
              <Label
                htmlFor={task.id}
                className={`transition-all ${
                  task.checked ? "line-through text-muted-foreground" : ""
                }`}
              >
                {task.label}
              </Label>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Progress value={completionPercentage} />
          <p className="text-sm text-muted-foreground mt-1">
            {Math.round(completionPercentage)}% completed
          </p>
        </div>
      </CardContent>
    </Card>
  );
}