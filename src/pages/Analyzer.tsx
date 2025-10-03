import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ConnectionClusters from "@/components/ConnectionClusters";
import PriorityConnections from "@/components/PriorityConnections";
import MessageGenerator from "@/components/MessageGenerator";

const Analyzer = () => {
  const navigate = useNavigate();
  const [connectionData, setConnectionData] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    if (!connectionData.trim()) {
      toast.error("Please paste your LinkedIn connections data");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      toast.success("Analysis complete! Check out your insights below");
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
            LinkedIn Network Analyzer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Paste your LinkedIn connections data to get personalized networking insights
          </p>
        </div>

        {!showResults ? (
          <Card className="p-8 space-y-6 max-w-3xl mx-auto shadow-card border-border/50">
            <div className="space-y-2">
              <label className="text-sm font-medium">Your LinkedIn Connections</label>
              <Textarea
                placeholder="Paste your connections data here (names, titles, companies, industries)&#10;Example:&#10;John Doe - Software Engineer at Google&#10;Jane Smith - Product Manager at Microsoft&#10;..."
                value={connectionData}
                onChange={(e) => setConnectionData(e.target.value)}
                className="min-h-[300px] resize-none border-border/50 focus:border-primary"
              />
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="flex-1 bg-primary hover:bg-primary-light transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Analyze Network
                  </>
                )}
              </Button>
            </div>

            <div className="text-sm text-muted-foreground text-center">
              Your data is processed locally and never stored on our servers
            </div>
          </Card>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-center">
              <Button 
                variant="outline"
                onClick={() => setShowResults(false)}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Analyze New Data
              </Button>
            </div>

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
