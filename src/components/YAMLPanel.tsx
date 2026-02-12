import { useState, useEffect } from 'react';

interface YAMLPanelProps {
  yamlContent: string;
  errors: string[];
  onClose: () => void;
  onCopy: () => void;
}

export function YAMLPanel({ yamlContent, errors, onClose, onCopy }: YAMLPanelProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '40%',
        backgroundColor: 'white',
        boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          padding: '16px',
          borderBottom: '1px solid #ddd',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '18px' }}>Generated YAML</h2>
        <div>
          <button
            onClick={handleCopy}
            style={{
              padding: '8px 16px',
              marginRight: '8px',
              borderRadius: '4px',
              border: '1px solid #4a90e2',
              backgroundColor: copied ? '#50c878' : '#4a90e2',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            ✕ Close
          </button>
        </div>
      </div>

      {errors.length > 0 && (
        <div
          style={{
            padding: '16px',
            backgroundColor: '#fee',
            borderBottom: '1px solid #fcc',
          }}
        >
          <h3 style={{ margin: '0 0 8px 0', color: '#c00', fontSize: '14px' }}>
            Validation Errors:
          </h3>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px' }}>
            {errors.map((error, index) => (
              <li key={index} style={{ color: '#c00' }}>
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
        <pre
          style={{
            margin: 0,
            fontFamily: 'monospace',
            fontSize: '13px',
            lineHeight: '1.5',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {yamlContent}
        </pre>
      </div>
    </div>
  );
}
