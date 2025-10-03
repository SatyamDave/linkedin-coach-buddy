import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from './ui/button';

const tourSteps = [
  {
    title: 'This is You',
    description: 'The blue node represents you in the network.',
  },
  {
    title: '1st-Degree Connections',
    description: 'Green nodes are your 1st-degree connections. You can message them directly.',
  },
  {
    title: '2nd and 3rd-Degree Connections',
    description: 'Orange nodes are 2nd-degree, and red nodes are 3rd-degree connections. You\'ll need an introduction to reach them.',
  },
  {
    title: 'Take Action',
    description: 'Click on any node to see more details about the person and get suggestions on how to connect.',
  },
];

export function GuidedTour({ onFinish }) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onFinish();
    }
  };

  const { title, description } = tourSteps[currentStep];

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 z-50">
      <Alert>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
      <div className="flex justify-end mt-2">
        <Button onClick={handleNext}>
          {currentStep < tourSteps.length - 1 ? 'Next' : 'Finish'}
        </Button>
      </div>
    </div>
  );
}
