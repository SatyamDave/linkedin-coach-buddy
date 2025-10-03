import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState } from "react";

const outreachTemplates = {
  Formal: (node) => `Dear ${node.name}, as a fellow ${node.school} alum exploring Investment Banking, I’d love to connect and hear about your journey.`,
  Casual: (node) => `Hey ${node.name}, saw you’re at ${node.company}! I’m also from ${node.school} — would love to hear your story.`,
  Mentorship: (node) => `Hi ${node.name}, I’m interested in Investment Banking and Alex suggested I reach out. Could I get 15 mins to learn from your experience?`,
};

export function SidePanel({ selectedNode, onOpenChange }) {
  const [tone, setTone] = useState('Formal');

  if (!selectedNode) return null;

  const handleToneChange = (newTone) => {
    setTone(newTone);
  };

  return (
    <Sheet open={!!selectedNode} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{selectedNode.name}</SheetTitle>
          <SheetDescription>
            {selectedNode.title} at {selectedNode.company}. {selectedNode.school} alum.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-4">
          <div>
            <h3 className="font-semibold">Cluster</h3>
            <Badge>{selectedNode.cluster}</Badge>
          </div>
          <div>
            <h3 className="font-semibold">Suggested Action</h3>
            <p>Request intro via Alex.</p>
          </div>
          <div>
            <h3 className="font-semibold">Outreach Templates</h3>
            <div className="flex space-x-2 my-2">
              <Button variant={tone === 'Formal' ? 'default' : 'outline'} onClick={() => handleToneChange('Formal')}>Formal</Button>
              <Button variant={tone === 'Casual' ? 'default' : 'outline'} onClick={() => handleToneChange('Casual')}>Casual</Button>
              <Button variant={tone === 'Mentorship' ? 'default' : 'outline'} onClick={() => handleToneChange('Mentorship')}>Mentorship</Button>
            </div>
            <textarea
              className="w-full h-40 p-2 border rounded"
              value={outreachTemplates[tone](selectedNode)}
              readOnly
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}