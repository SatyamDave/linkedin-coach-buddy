import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, TrendingUp, Lightbulb } from "lucide-react";

const priorityContacts = [
  {
    name: "Sarah Chen",
    title: "Senior Product Manager",
    company: "Meta",
    reason: "Recently posted about product-market fit",
    priority: "high",
    action: "Comment on her latest post",
    initials: "SC",
  },
  {
    name: "Michael Rodriguez",
    title: "Engineering Director",
    company: "Amazon",
    reason: "Works in your target role",
    priority: "high",
    action: "Ask for career advice",
    initials: "MR",
  },
  {
    name: "Emily Thompson",
    title: "Talent Acquisition Lead",
    company: "Google",
    reason: "Active recruiter in your field",
    priority: "medium",
    action: "Send a friendly check-in",
    initials: "ET",
  },
  {
    name: "David Park",
    title: "Startup Founder",
    company: "TechVenture Inc",
    reason: "Recently raised Series A",
    priority: "high",
    action: "Congratulate on funding",
    initials: "DP",
  },
  {
    name: "Lisa Anderson",
    title: "Career Coach",
    company: "Independent",
    reason: "Mentor potential",
    priority: "medium",
    action: "Request mentorship call",
    initials: "LA",
  },
];

const PriorityConnections = () => {
  const getPriorityColor = (priority: string) => {
    return priority === "high" 
      ? "bg-accent/10 text-accent border-accent/20" 
      : "bg-primary/10 text-primary border-primary/20";
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-accent" />
          <h2 className="text-2xl font-bold">Weekly Priority Contacts</h2>
        </div>
        <p className="text-muted-foreground">
          5 high-impact connections to reach out to this week
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {priorityContacts.map((contact) => (
          <Card
            key={contact.name}
            className="p-6 space-y-4 border-border/50 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-b from-card to-secondary/30"
          >
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {contact.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <h3 className="font-semibold">{contact.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {contact.title}
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  {contact.company}
                </p>
              </div>
            </div>

            <Badge className={getPriorityColor(contact.priority)}>
              {contact.priority === "high" ? "High Priority" : "Medium Priority"}
            </Badge>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{contact.reason}</p>
              </div>
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              {contact.action}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PriorityConnections;
