import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, MessageSquare, Target, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-network.png";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 md:py-32">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-primary via-primary-light to-primary-glow bg-clip-text text-transparent">
                  Master Your LinkedIn Network
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl">
                  Transform your connections into opportunities. Get AI-powered insights, personalized outreach strategies, and weekly action plans to grow your professional network effectively.
                </p>
              </div>
              
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/analyzer')}
                  className="bg-primary hover:bg-primary-light transition-all duration-300 shadow-lg hover:shadow-xl group"
                >
                  Start Analyzing
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  Learn More
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary-glow/20 blur-3xl rounded-full"></div>
              <img 
                src={heroImage} 
                alt="LinkedIn Network Visualization" 
                className="relative rounded-2xl shadow-2xl border border-border/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Your Personal Networking Coach
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Strategic insights and actionable recommendations to make every connection count
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6 space-y-4 border-border/50 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-b from-card to-secondary/30">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Smart Clustering</h3>
              <p className="text-muted-foreground">
                Automatically group your connections by industry, role, and relationship strength
              </p>
            </Card>

            <Card className="p-6 space-y-4 border-border/50 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-b from-card to-secondary/30">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Priority Picks</h3>
              <p className="text-muted-foreground">
                Get 3-5 high-impact connections to reach out to each week
              </p>
            </Card>

            <Card className="p-6 space-y-4 border-border/50 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-b from-card to-secondary/30">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Message Templates</h3>
              <p className="text-muted-foreground">
                AI-generated personalized messages in formal, casual, or mentorship tones
              </p>
            </Card>

            <Card className="p-6 space-y-4 border-border/50 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-b from-card to-secondary/30">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Action Plans</h3>
              <p className="text-muted-foreground">
                Beyond messages: comment strategies, congratulations, and advice requests
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-primary to-primary-glow">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to Level Up Your Networking Game?
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Join professionals who are building meaningful connections and unlocking new opportunities every week
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/analyzer')}
            className="bg-background text-primary hover:bg-background/90 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
