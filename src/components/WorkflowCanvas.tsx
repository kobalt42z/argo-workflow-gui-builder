import { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type Connection,
  type NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ContainerNode } from './nodes/ContainerNode';
import { DAGNode } from './nodes/DAGNode';
import { ScriptNode } from './nodes/ScriptNode';

const nodeTypes: NodeTypes = {
  container: ContainerNode as any,
  dag: DAGNode as any,
  script: ScriptNode as any,
};

interface WorkflowCanvasProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange?: (nodes: Node[]) => void;
  onEdgesChange?: (edges: Edge[]) => void;
}

export function WorkflowCanvas({ nodes: externalNodes, edges: externalEdges, onNodesChange, onEdgesChange }: WorkflowCanvasProps) {
  const [nodes, setNodes, onNodesChangeInternal] = useNodesState<Node>(externalNodes);
  const [edges, setEdges, onEdgesChangeInternal] = useEdgesState<Edge>(externalEdges);

  // Sync external nodes with internal state
  useEffect(() => {
    setNodes(externalNodes);
  }, [externalNodes, setNodes]);

  // Sync external edges with internal state
  useEffect(() => {
    setEdges(externalEdges);
  }, [externalEdges, setEdges]);

  const onConnect = useCallback(
    (connection: Connection) => {
      const newEdges = addEdge(connection, edges);
      setEdges(newEdges);
      onEdgesChange?.(newEdges);
    },
    [edges, setEdges, onEdgesChange]
  );

  const handleNodesChange = useCallback(
    (changes: any) => {
      onNodesChangeInternal(changes);
      if (onNodesChange) {
        onNodesChange(nodes);
      }
    },
    [onNodesChangeInternal, onNodesChange, nodes]
  );

  const handleEdgesChange = useCallback(
    (changes: any) => {
      onEdgesChangeInternal(changes);
      if (onEdgesChange) {
        onEdgesChange(edges);
      }
    },
    [onEdgesChangeInternal, onEdgesChange, edges]
  );

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
