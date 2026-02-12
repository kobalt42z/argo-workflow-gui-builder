import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

interface DAGNodeData {
  name: string;
  templateType: string;
  config?: {
    tasks?: Array<{
      name: string;
      template: string;
    }>;
  };
}

export const DAGNode = memo((props: NodeProps) => {
  const data = props.data as unknown as DAGNodeData;
  const config = data.config;
  const taskCount = config?.tasks?.length || 0;
  
  return (
    <div
      style={{
        padding: '10px 20px',
        borderRadius: '8px',
        border: '2px solid #50c878',
        backgroundColor: 'white',
        minWidth: '180px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Handle type="target" position={Position.Top} />
      <div>
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
          🔀 {data.name}
        </div>
        <div style={{ fontSize: '12px', color: '#666' }}>
          DAG Template
        </div>
        {taskCount > 0 && (
          <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>
            Tasks: {taskCount}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

DAGNode.displayName = 'DAGNode';
