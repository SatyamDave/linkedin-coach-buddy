import { useState } from "react";
import { NetworkMap } from "@/components/NetworkMap";
import { GuidedTour } from "@/components/GuidedTour";
import { Button } from "@/components/ui/button";
import { NextStep } from "@/components/NextStep";
import { Filter } from "lucide-react";

export function MapPage() {
  const [showTour, setShowTour] = useState(true);

  const handleTourFinish = () => {
    setShowTour(false);
  };

  return (
    <div className="w-full h-screen relative">
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <Button variant="outline" className="bg-background">
          <Filter className="w-4 h-4 mr-2" />
          Company Size
        </Button>
        <Button variant="outline" className="bg-background">
          <Filter className="w-4 h-4 mr-2" />
          Role Level
        </Button>
        <Button variant="outline" className="bg-background">
          <Filter className="w-4 h-4 mr-2" />
          Geography
        </Button>
      </div>
      <NetworkMap />
      {showTour && <GuidedTour onFinish={handleTourFinish} />}
      <Button
        className="absolute top-4 right-4"
        onClick={() => setShowTour(true)}
      >
        Show Tour
      </Button>
      <NextStep to="/dashboard">View Dashboard</NextStep>
    </div>
  );
}
