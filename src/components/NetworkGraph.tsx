import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, TrendingUp, Users } from "lucide-react";

interface Node {
  id: string;
  name: string;
  title: string;
  company: string;
  degree: number;
  x: number;
  y: number;
}

interface Link {
  source: string;
  target: string;
}

interface NetworkGraphProps {
  targetRole?: string;
  targetCompany?: string;
}

const NetworkGraph = ({ targetRole, targetCompany }: NetworkGraphProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    // Generate network data
    const centerX = 400;
    const centerY = 300;

    const generatedNodes: Node[] = [
      {
        id: "you",
        name: "You",
        title: "Your Profile",
        company: "Your Company",
        degree: 0,
        x: centerX,
        y: centerY,
      },
    ];

    const generatedLinks: Link[] = [];

    // 1st degree connections (green)
    const firstDegree = [
      { name: "Alex Johnson", title: "Senior Analyst", company: "JP Morgan" },
      { name: "Lisa Chen", title: "Associate", company: "Morgan Stanley" },
      { name: "Tom Williams", title: "Manager", company: "Deloitte" },
    ];

    firstDegree.forEach((person, idx) => {
      const angle = (idx / firstDegree.length) * Math.PI * 2;
      const radius = 150;
      generatedNodes.push({
        id: `1st-${idx}`,
        name: person.name,
        title: person.title,
        company: person.company,
        degree: 1,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      });
      generatedLinks.push({ source: "you", target: `1st-${idx}` });
    });

    // Target contacts (varied degrees)
    const targets = [
      { name: "Sarah Mitchell", title: "VP Investment Banking", degree: 2 },
      { name: "David Chen", title: "Managing Director", degree: 3 },
      { name: "Emily Rodriguez", title: "Associate", degree: 1 },
      { name: "Michael Park", title: "Analyst", degree: 2 },
    ];

    targets.forEach((contact, idx) => {
      const angle = (idx / targets.length) * Math.PI * 2 + Math.PI / 4;
      const radius = contact.degree === 1 ? 150 : contact.degree === 2 ? 250 : 330;
      const nodeId = `target-${idx}`;

      generatedNodes.push({
        id: nodeId,
        name: contact.name,
        title: contact.title,
        company: targetCompany || "Goldman Sachs",
        degree: contact.degree,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      });

      if (contact.degree === 1) {
        generatedLinks.push({ source: "you", target: nodeId });
      } else if (contact.degree === 2) {
        generatedLinks.push({ source: `1st-${idx % firstDegree.length}`, target: nodeId });
      } else {
        generatedLinks.push({ source: `1st-${idx % firstDegree.length}`, target: nodeId });
      }
    });

    setNodes(generatedNodes);
    setLinks(generatedLinks);
  }, [targetCompany]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw links
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 2;
      links.forEach((link) => {
        const sourceNode = nodes.find((n) => n.id === link.source);
        const targetNode = nodes.find((n) => n.id === link.target);
        if (sourceNode && targetNode) {
          ctx.beginPath();
          ctx.moveTo(sourceNode.x, sourceNode.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          ctx.stroke();

          // Draw arrow
          const angle = Math.atan2(targetNode.y - sourceNode.y, targetNode.x - sourceNode.x);
          const arrowX = targetNode.x - Math.cos(angle) * 25;
          const arrowY = targetNode.y - Math.sin(angle) * 25;
          
          ctx.beginPath();
          ctx.moveTo(arrowX, arrowY);
          ctx.lineTo(
            arrowX - 10 * Math.cos(angle - Math.PI / 6),
            arrowY - 10 * Math.sin(angle - Math.PI / 6)
          );
          ctx.moveTo(arrowX, arrowY);
          ctx.lineTo(
            arrowX - 10 * Math.cos(angle + Math.PI / 6),
            arrowY - 10 * Math.sin(angle + Math.PI / 6)
          );
          ctx.stroke();
        }
      });

      // Draw nodes
      nodes.forEach((node) => {
        const isSelected = selectedNode?.id === node.id;
        const isHovered = hoveredNode?.id === node.id;
        
        // Node color based on degree
        let color = "#0A66C2"; // You
        if (node.degree === 1) color = "#16A34A"; // 1st degree
        if (node.degree === 2) color = "#F59E0B"; // 2nd degree
        if (node.degree === 3) color = "#EF4444"; // 3rd degree

        // Draw node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, isSelected || isHovered ? 22 : 18, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Draw border for selected/hovered
        if (isSelected || isHovered) {
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 3;
          ctx.stroke();
        }

        // Draw label
        ctx.fillStyle = "#1e293b";
        ctx.font = "12px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(node.name, node.x, node.y + 35);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [nodes, links, selectedNode, hoveredNode]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedNode = nodes.find((node) => {
      const distance = Math.sqrt((node.x - x) ** 2 + (node.y - y) ** 2);
      return distance < 20;
    });

    setSelectedNode(clickedNode || null);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const hovered = nodes.find((node) => {
      const distance = Math.sqrt((node.x - x) ** 2 + (node.y - y) ** 2);
      return distance < 20;
    });

    setHoveredNode(hovered || null);
    canvas.style.cursor = hovered ? "pointer" : "default";
  };

  const getDegreeLabel = (degree: number) => {
    if (degree === 0) return "You";
    if (degree === 1) return "1st degree";
    if (degree === 2) return "2nd degree";
    return "3rd degree";
  };

  const getDegreeDescription = (degree: number) => {
    if (degree === 0) return "Your profile";
    if (degree === 1) return "Direct connection - you can message directly";
    if (degree === 2) return "Connection of your connection - ask for intro";
    return "Extended network - build path through mutual connections";
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Graph visualization */}
        <div className="lg:col-span-2">
          <Card className="p-6 border-border/50 shadow-card bg-gradient-to-b from-card to-secondary/30">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Network Map</h3>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {nodes.length} connections
                </Badge>
              </div>

              <div className="rounded-lg bg-gradient-to-br from-background/80 to-secondary/50 border border-border/30 overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={600}
                  onClick={handleCanvasClick}
                  onMouseMove={handleCanvasMouseMove}
                  className="w-full h-auto"
                />
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 pt-2 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#0A66C2]"></div>
                  <span className="text-sm text-muted-foreground">You</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#16A34A]"></div>
                  <span className="text-sm text-muted-foreground">1st Degree</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#F59E0B]"></div>
                  <span className="text-sm text-muted-foreground">2nd Degree</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#EF4444]"></div>
                  <span className="text-sm text-muted-foreground">3rd Degree</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Node details */}
        <div>
          <Card className="p-6 border-border/50 shadow-card bg-gradient-to-b from-card to-secondary/30 sticky top-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                <h3 className="font-semibold text-lg">
                  {selectedNode ? "Connection Details" : "Click a Node"}
                </h3>
              </div>

              {selectedNode ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">{selectedNode.name}</div>
                    <div className="text-muted-foreground">{selectedNode.title}</div>
                    <div className="text-sm font-medium text-primary">{selectedNode.company}</div>
                  </div>

                  <Badge 
                    className={`${
                      selectedNode.degree === 0 ? "bg-primary/10 text-primary border-primary/20" :
                      selectedNode.degree === 1 ? "bg-accent/10 text-accent border-accent/20" :
                      selectedNode.degree === 2 ? "bg-orange-500/10 text-orange-600 border-orange-500/20" :
                      "bg-red-500/10 text-red-600 border-red-500/20"
                    }`}
                  >
                    {getDegreeLabel(selectedNode.degree)}
                  </Badge>

                  <div className="space-y-2 pt-4 border-t border-border/50">
                    <div className="text-sm font-medium">Connection Path</div>
                    <p className="text-sm text-muted-foreground">
                      {getDegreeDescription(selectedNode.degree)}
                    </p>
                  </div>

                  {selectedNode.degree > 0 && (
                    <div className="space-y-3 pt-4">
                      <div className="text-sm font-medium">Next Steps</div>
                      {selectedNode.degree === 1 && (
                        <div className="space-y-2">
                          <Button className="w-full bg-primary hover:bg-primary-light">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Send Message
                          </Button>
                          <Button variant="outline" className="w-full border-primary/30">
                            View Profile
                          </Button>
                        </div>
                      )}
                      {selectedNode.degree === 2 && (
                        <div className="space-y-2">
                          <Button className="w-full bg-accent hover:bg-accent/90">
                            <Users className="mr-2 h-4 w-4" />
                            Request Introduction
                          </Button>
                          <Button variant="outline" className="w-full border-primary/30">
                            Find Mutual Connections
                          </Button>
                        </div>
                      )}
                      {selectedNode.degree === 3 && (
                        <div className="space-y-2">
                          <Button className="w-full" variant="outline">
                            Build Connection Path
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            Strengthen relationships with 2nd degree connections first
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">
                    Click on any node to see connection details and recommended actions
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NetworkGraph;
