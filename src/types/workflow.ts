/**
 * Type definitions for Argo Workflow templates and nodes
 */

export interface WorkflowNode {
  id: string;
  type: 'container' | 'dag' | 'steps' | 'script' | 'resource' | 'suspend';
  position: { x: number; y: number };
  data: TemplateData;
}

export interface TemplateData {
  name: string;
  templateType: string;
  config?: ContainerConfig | DAGConfig | ScriptConfig | StepsConfig | ResourceConfig;
}

export interface ContainerConfig {
  image?: string;
  command?: string[];
  args?: string[];
  env?: Array<{ name: string; value: string }>;
  resources?: {
    requests?: { cpu?: string; memory?: string };
    limits?: { cpu?: string; memory?: string };
  };
}

export interface DAGConfig {
  tasks?: Array<{
    name: string;
    template: string;
    dependencies?: string[];
  }>;
}

export interface StepsConfig {
  steps?: Array<Array<{
    name: string;
    template: string;
  }>>;
}

export interface ScriptConfig {
  image?: string;
  source?: string;
  command?: string[];
}

export interface ResourceConfig {
  action?: 'create' | 'apply' | 'delete' | 'patch';
  manifest?: string;
}

export interface WorkflowSpec {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
    namespace?: string;
  };
  spec: {
    entrypoint?: string;
    templates: TemplateDefinition[];
  };
}

export interface TemplateDefinition {
  name: string;
  container?: any;
  dag?: any;
  steps?: any;
  script?: any;
  resource?: any;
  suspend?: any;
  inputs?: any;
  outputs?: any;
}
