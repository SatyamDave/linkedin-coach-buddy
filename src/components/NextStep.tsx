import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export function NextStep({ to, children }) {
  return (
    <div className="fixed bottom-8 right-8">
      <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent text-white">
        <Link to={to} className="flex items-center gap-2">
          {children}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </Button>
    </div>
  );
}
