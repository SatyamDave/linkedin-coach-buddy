export function findShortestPath(startNode, endNode, graph) {
  const queue = [[startNode, [startNode]]];
  const visited = new Set([startNode.id]);

  while (queue.length > 0) {
    const [currentNode, path] = queue.shift();

    if (currentNode.id === endNode.id) {
      return path;
    }

    for (const link of graph.links) {
      if (link.source.id === currentNode.id && !visited.has(link.target.id)) {
        visited.add(link.target.id);
        const newPath = [...path, link.target];
        queue.push([link.target, newPath]);
      } else if (link.target.id === currentNode.id && !visited.has(link.source.id)) {
        visited.add(link.source.id);
        const newPath = [...path, link.source];
        queue.push([link.source, newPath]);
      }
    }
  }

  return null; // No path found
}
