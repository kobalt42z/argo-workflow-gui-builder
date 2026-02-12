import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

interface ScriptNodeData {
  name: string;
  templateType: string;
  config?: {
    image?: string;
    source?: string;
  };
}

export const ScriptNode = memo((props: NodeProps) => {
  const data = props.data as unknown as ScriptNodeData;
  const config = data.config;
  
  return (
    <div
      style={{
        padding: '10px 20px',
        borderRadius: '8px',
        border: '2px solid #f39c12',
        backgroundColor: 'white',
        minWidth: '180px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Handle type="target" position={Position.Top} />
      <div>
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
          📝 {data.name}
        </div>
        <div style={{ fontSize: '12px', color: '#666' }}>
          Script Template
        </div>
        {config?.image && (
          <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>
            Image: {config.image}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

ScriptNode.displayName = 'ScriptNode';
