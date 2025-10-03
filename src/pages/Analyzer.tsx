import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import NetworkGraph from "@/components/NetworkGraph";
import ConnectionClusters from "@/components/ConnectionClusters";
import PriorityConnections from "@/components/PriorityConnections";
import MessageGenerator from "@/components/MessageGenerator";

const Analyzer = () => {
  const navigate = useNavigate();
  const [targetRole, setTargetRole] = useState("");
  const [targetCompany, setTargetCompany] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);


  const handleAnalyze = () => {
    if (!targetRole.trim() || !targetCompany.trim()) {
      toast.error("Please enter both role and company");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      toast.success(`Building network map for ${targetRole} at ${targetCompany}!`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary-light to-primary-glow bg-clip-text text-transparent">
            Network Path Finder
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how to reach anyone in your target company through your LinkedIn network
          </p>
        </div>

        {!showResults ? (
          <Card className="p-8 space-y-6 max-w-3xl mx-auto shadow-card border-border/50">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Role</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="e.g., Investment Banking, Product Manager, Software Engineer"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="pl-10 border-border/50 focus:border-primary h-12 text-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Target Company</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="e.g., Goldman Sachs, Google, McKinsey"
                    value={targetCompany}
                    onChange={(e) => setTargetCompany(e.target.value)}
                    className="pl-10 border-border/50 focus:border-primary h-12 text-lg"
                  />
                </div>
              </div>

              <Button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full h-12 bg-primary hover:bg-primary-light transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
                    Mapping Your Network...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Find Connection Path
                  </>
                )}
              </Button>
            </div>

            <div className="text-sm text-muted-foreground text-center pt-4 border-t border-border/50">
              <p className="font-medium mb-2">Example searches:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setTargetRole("Investment Banking");
                    setTargetCompany("Goldman Sachs");
                  }}
                  className="text-xs"
                >
                  Investment Banking at Goldman
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setTargetRole("Product Manager");
                    setTargetCompany("Google");
                  }}
                  className="text-xs"
                >
                  PM at Google
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setTargetRole("Software Engineer");
                    setTargetCompany("Meta");
                  }}
                  className="text-xs"
                >
                  SWE at Meta
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">
                  {targetRole} at {targetCompany}
                </h2>
                <p className="text-muted-foreground">
                  Analyzing your path to reach your target connections
                </p>
              </div>
              <Button 
                variant="outline"
                onClick={() => setShowResults(false)}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                New Search
              </Button>
            </div>

            <NetworkGraph targetRole={targetRole} targetCompany={targetCompany} />
            <ConnectionClusters />
            <PriorityConnections />
            <MessageGenerator />
          </div>
        )}
      </div>
    </div>
  );
};

export default Analyzer;
