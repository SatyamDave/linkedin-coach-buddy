import { useState, useCallback } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { mockNetwork } from '@/data/mockNetwork';
import { SidePanel } from './SidePanel';
import { findShortestPath } from '@/lib/graph';

const clusterColors = {
  Alumni: '#1f77b4',
  Recruiter: '#2ca02c',
  Peer: '#ff7f0e',
  Mentor: '#d62728',
};

export function NetworkMap() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoverPath, setHoverPath] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  const handleSidePanelClose = () => {
    setSelectedNode(null);
  };

  const handleNodeHover = (node) => {
    setHoveredNode(node);
    if (node) {
      const path = findShortestPath(mockNetwork.nodes[0], node, mockNetwork);
      setHoverPath(path);
    } else {
      setHoverPath(null);
    }
  };

  const isLinkInPath = (link) => {
    if (!hoverPath) return false;
    for (let i = 0; i < hoverPath.length - 1; i++) {
      if (
        (link.source.id === hoverPath[i].id && link.target.id === hoverPath[i + 1].id) ||
        (link.target.id === hoverPath[i].id && link.source.id === hoverPath[i + 1].id)
      ) {
        return true;
      }
    }
    return false;
  };

  const getLinkColor = useCallback((link) => {
    return isLinkInPath(link) ? 'rgba(255,0,0,0.8)' : 'rgba(0,0,0,0.2)';
  }, [hoverPath]);

  const getLinkWidth = useCallback((link) => {
    return isLinkInPath(link) ? 4 : 1;
  }, [hoverPath]);

  const nodeCanvasObject = (node, ctx, globalScale) => {
    const label = node.name;
    const fontSize = 12 / globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    const textWidth = ctx.measureText(label).width;
    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = clusterColors[node.cluster] || node.color;
    ctx.fillText(label, node.x, node.y);

    if (hoveredNode && node.id === hoveredNode.id) {
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'rgba(255,255,0,0.8)';
    } else {
      ctx.shadowBlur = 0;
    }
  };


  return (
    <>
      <ForceGraph2D
        graphData={mockNetwork}
        nodeCanvasObject={nodeCanvasObject}
        nodePointerAreaPaint={(node, color, ctx) => {
          ctx.fillStyle = color;
          const bckgDimensions = [ctx.measureText(node.name).width, 12].map(n => n + 12 * 0.2);
          ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
        }}
        linkColor={getLinkColor}
        linkWidth={getLinkWidth}
        linkDirectionalParticles={(link) => isLinkInPath(link) ? 4 : 0}
        linkDirectionalParticleWidth={4}
        linkDirectionalParticleSpeed={() => 0.01}
        linkDirectionalParticleColor={() => 'rgba(255,0,0,0.8)'}
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
      />
      <SidePanel selectedNode={selectedNode} onOpenChange={handleSidePanelClose} />
    </>
  );
}