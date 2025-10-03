import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Copy, Sparkles, RefreshCw } from "lucide-react";
import { toast } from "sonner";

type Tone = "formal" | "casual" | "mentorship";

const sampleMessages: Record<Tone, string> = {
  formal: "Dear Sarah,\n\nI hope this message finds you well. I came across your recent post about product-market fit and found your insights particularly valuable, especially regarding customer discovery methodologies.\n\nI'm currently exploring opportunities in product management and would greatly appreciate the chance to learn from your experience. Would you be open to a brief 15-minute conversation at your convenience?\n\nThank you for considering my request.\n\nBest regards",
  casual: "Hey Sarah!\n\nJust saw your post about product-market fit - such great insights! I've been diving deep into PM work lately and your perspective really resonated.\n\nWould love to chat sometime if you're up for it. Even 15 mins would be awesome!\n\nCheers!",
  mentorship: "Hi Sarah,\n\nI've been following your journey in product management and I'm genuinely inspired by your approach to customer discovery and product-market fit.\n\nI'm at a pivotal point in my career and would be honored if you'd consider being a mentor. I'm looking for guidance on transitioning into senior PM roles and navigating the challenges you've clearly mastered.\n\nWould you be open to an initial conversation to see if this could be mutually beneficial?\n\nWarm regards"
};

const MessageGenerator = () => {
  const [selectedTone, setSelectedTone] = useState<Tone>("formal");
  const [generatedMessage, setGeneratedMessage] = useState(sampleMessages.formal);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleToneChange = (tone: Tone) => {
    setSelectedTone(tone);
    setGeneratedMessage(sampleMessages[tone]);
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("Message regenerated with fresh perspective!");
    }, 1000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMessage);
    toast.success("Message copied to clipboard!");
  };

  const getToneBadgeClass = (tone: Tone) => {
    if (tone === selectedTone) {
      return "bg-primary text-primary-foreground";
    }
    return "bg-secondary text-secondary-foreground hover:bg-primary/10 cursor-pointer";
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">AI Message Generator</h2>
        </div>
        <p className="text-muted-foreground">
          Personalized outreach messages tailored to your networking goals
        </p>
      </div>

      <Card className="p-8 space-y-6 border-border/50 shadow-card bg-gradient-to-b from-card to-secondary/30">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Message Tone</label>
            <div className="flex flex-wrap gap-3">
              <Badge
                onClick={() => handleToneChange("formal")}
                className={`${getToneBadgeClass("formal")} px-4 py-2 transition-all duration-300`}
              >
                Professional
              </Badge>
              <Badge
                onClick={() => handleToneChange("casual")}
                className={`${getToneBadgeClass("casual")} px-4 py-2 transition-all duration-300`}
              >
                Friendly
              </Badge>
              <Badge
                onClick={() => handleToneChange("mentorship")}
                className={`${getToneBadgeClass("mentorship")} px-4 py-2 transition-all duration-300`}
              >
                Mentorship Request
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Generated Message</label>
            <Textarea
              value={generatedMessage}
              onChange={(e) => setGeneratedMessage(e.target.value)}
              className="min-h-[250px] resize-none border-border/50 focus:border-primary font-mono text-sm"
            />
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleRegenerate}
              disabled={isGenerating}
              variant="outline"
              className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                  Regenerating...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Regenerate
                </>
              )}
            </Button>
            <Button
              onClick={handleCopy}
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Message
            </Button>
          </div>
        </div>

        <div className="rounded-lg bg-primary/5 p-4 border border-primary/10">
          <h4 className="font-semibold mb-2 text-sm">Beyond Messages</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">•</span>
              <span>Comment thoughtfully on their recent posts to build visibility</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">•</span>
              <span>Congratulate them on new roles or achievements</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">•</span>
              <span>Share relevant articles that align with their interests</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">•</span>
              <span>Offer help or resources when you see they're working on something</span>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default MessageGenerator;
