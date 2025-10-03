import { ForceGraph2D } from 'react-force-graph';
import { useMemo } from 'react';

export function AnimatedNetworkBg() {
  const graphData = useMemo(() => {
    const nodes = [...Array(50).keys()].map(i => ({ id: i }));
    const links = [...Array(30).keys()].map(() => ({
      source: Math.floor(Math.random() * 50),
      target: Math.floor(Math.random() * 50),
    }));
    return { nodes, links };
  }, []);

  return (
    <div className="absolute inset-0 z-0 opacity-20">
      <ForceGraph2D
        graphData={graphData}
        nodeAutoColorBy="group"
        linkWidth={1}
        linkDirectionalParticles={0}
        nodeVal={1}
        enableNodeDrag={false}
        enableZoomPanInteraction={false}
        cooldownTicks={100}
        d3AlphaDecay={0.01}
        d3VelocityDecay={0.1}
      />
    </div>
  );
}
