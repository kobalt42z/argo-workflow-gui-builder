import { useState, useCallback, useRef } from 'react';
import { ReactFlowProvider, type Node, type Edge } from '@xyflow/react';
import { WorkflowCanvas } from './components/WorkflowCanvas';
import { Toolbar } from './components/Toolbar';
import { YAMLPanel } from './components/YAMLPanel';
import { nodesToWorkflowSpec, workflowToYAML } from './utils/yamlConverter';
import { schemaValidator } from './utils/schemaValidator';
import type { WorkflowNode } from './types/workflow';
import './App.css';

function App() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [showYAMLPanel, setShowYAMLPanel] = useState(false);
  const [yamlContent, setYamlContent] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const nodeIdCounter = useRef(0);

  const handleAddNode = useCallback(
    (nodeType: WorkflowNode['type']) => {
      const nodeId = `node-${nodeIdCounter.current++}`;
      const newNode: Node = {
        id: nodeId,
        type: nodeType,
        position: {
          x: 100 + Math.random() * 300,
          y: 100 + Math.random() * 200,
        },
        data: {
          name: `${nodeType}-${nodeIdCounter.current}`,
          templateType: nodeType,
          config:
            nodeType === 'container'
              ? { image: 'alpine:latest', command: ['echo', 'hello'] }
              : nodeType === 'script'
              ? { image: 'python:alpine', source: 'print("Hello World")' }
              : nodeType === 'dag'
              ? { tasks: [] }
              : nodeType === 'steps'
              ? { steps: [] }
              : nodeType === 'resource'
              ? { action: 'create', manifest: '' }
              : {},
        },
      };

      setNodes((prev) => [...prev, newNode]);
    },
    []
  );

  const handleGenerateYAML = useCallback(() => {
    // Convert nodes to WorkflowNode format
    const workflowNodes: WorkflowNode[] = nodes.map((node) => ({
      id: node.id,
      type: node.type as WorkflowNode['type'],
      position: node.position,
      data: node.data as any,
    }));

    const spec = nodesToWorkflowSpec(workflowNodes, 'my-workflow');
    const yaml = workflowToYAML(spec);
    
    // Validate the generated YAML
    const validation = schemaValidator.validate(spec);
    
    setYamlContent(yaml);
    setValidationErrors(validation.errors);
    setShowYAMLPanel(true);
  }, [nodes]);

  const handleImportYAML = useCallback(() => {
    const yamlInput = prompt('Paste your Argo Workflow YAML:');
    if (yamlInput) {
      try {
        // TODO: Implement YAML import functionality
        alert('YAML import will be implemented in the next phase');
      } catch (error) {
        alert('Failed to parse YAML: ' + (error as Error).message);
      }
    }
  }, []);

  const handleClear = useCallback(() => {
    if (confirm('Are you sure you want to clear the canvas?')) {
      setNodes([]);
      setEdges([]);
      nodeIdCounter.current = 0;
    }
  }, []);

  const handleCopyYAML = useCallback(() => {
    navigator.clipboard.writeText(yamlContent);
  }, [yamlContent]);

  const handleNodesChange = useCallback((newNodes: Node[]) => {
    setNodes(newNodes);
  }, []);

  const handleEdgesChange = useCallback((newEdges: Edge[]) => {
    setEdges(newEdges);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          padding: '16px 24px',
          backgroundColor: '#2c3e50',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '24px' }}>
          🚀 Argo Workflow GUI Builder
        </h1>
        <div style={{ fontSize: '14px', opacity: 0.8 }}>
          Visual workflow designer for Kubernetes
        </div>
      </div>

      <Toolbar
        onAddNode={handleAddNode}
        onGenerateYAML={handleGenerateYAML}
        onImportYAML={handleImportYAML}
        onClear={handleClear}
      />

      <div style={{ flex: 1, position: 'relative' }}>
        <ReactFlowProvider>
          <WorkflowCanvas
            nodes={nodes}
            edges={edges}
            onNodesChange={handleNodesChange}
            onEdgesChange={handleEdgesChange}
          />
        </ReactFlowProvider>
      </div>

      {showYAMLPanel && (
        <YAMLPanel
          yamlContent={yamlContent}
          errors={validationErrors}
          onClose={() => setShowYAMLPanel(false)}
          onCopy={handleCopyYAML}
        />
      )}
    </div>
  );
}

export default App;
