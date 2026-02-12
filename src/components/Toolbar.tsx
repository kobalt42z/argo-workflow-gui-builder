import type { WorkflowNode } from '../types/workflow';

interface ToolbarProps {
  onAddNode: (nodeType: WorkflowNode['type']) => void;
  onGenerateYAML: () => void;
  onImportYAML: () => void;
  onClear: () => void;
}

export function Toolbar({ onAddNode, onGenerateYAML, onImportYAML, onClear }: ToolbarProps) {
  const buttonStyle: React.CSSProperties = {
    padding: '8px 16px',
    margin: '0 4px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s',
  };

  return (
    <div
      style={{
        padding: '12px 16px',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <div style={{ marginRight: '16px', fontWeight: 'bold' }}>
        Add Template:
      </div>
      
      <button
        style={{ ...buttonStyle, borderColor: '#4a90e2', color: '#4a90e2' }}
        onClick={() => onAddNode('container')}
        title="Add Container Template"
      >
        📦 Container
      </button>
      
      <button
        style={{ ...buttonStyle, borderColor: '#50c878', color: '#50c878' }}
        onClick={() => onAddNode('dag')}
        title="Add DAG Template"
      >
        🔀 DAG
      </button>
      
      <button
        style={{ ...buttonStyle, borderColor: '#f39c12', color: '#f39c12' }}
        onClick={() => onAddNode('script')}
        title="Add Script Template"
      >
        📝 Script
      </button>
      
      <button
        style={{ ...buttonStyle, borderColor: '#9b59b6', color: '#9b59b6' }}
        onClick={() => onAddNode('steps')}
        title="Add Steps Template"
      >
        📋 Steps
      </button>
      
      <button
        style={{ ...buttonStyle, borderColor: '#e74c3c', color: '#e74c3c' }}
        onClick={() => onAddNode('resource')}
        title="Add Resource Template"
      >
        ⚙️ Resource
      </button>

      <div style={{ flex: 1 }} />

      <button
        style={{ ...buttonStyle, backgroundColor: '#4a90e2', color: 'white', borderColor: '#4a90e2' }}
        onClick={onGenerateYAML}
        title="Generate YAML"
      >
        ⬇️ Export YAML
      </button>
      
      <button
        style={{ ...buttonStyle, backgroundColor: '#50c878', color: 'white', borderColor: '#50c878' }}
        onClick={onImportYAML}
        title="Import YAML"
      >
        ⬆️ Import YAML
      </button>
      
      <button
        style={{ ...buttonStyle, backgroundColor: '#e74c3c', color: 'white', borderColor: '#e74c3c' }}
        onClick={onClear}
        title="Clear Canvas"
      >
        🗑️ Clear
      </button>
    </div>
  );
}
