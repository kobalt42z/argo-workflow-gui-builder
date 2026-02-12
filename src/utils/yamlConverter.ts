import yaml from 'js-yaml';
import type { 
  WorkflowSpec, 
  WorkflowNode, 
  TemplateDefinition,
  ContainerConfig,
  DAGConfig,
  StepsConfig,
  ScriptConfig,
  ResourceConfig
} from '../types/workflow';

/**
 * Converts workflow nodes to Argo Workflow YAML format
 */
export function nodesToWorkflowSpec(
  nodes: WorkflowNode[],
  workflowName: string = 'my-workflow'
): WorkflowSpec {
  const spec: WorkflowSpec = {
    apiVersion: 'argoproj.io/v1alpha1',
    kind: 'Workflow',
    metadata: {
      name: workflowName,
      namespace: 'default',
    },
    spec: {
      entrypoint: nodes.length > 0 ? nodes[0].data.name : 'main',
      templates: nodes.map((node) => {
        const template: TemplateDefinition = {
          name: node.data.name,
        };
        
        if (node.type === 'container' && node.data.config) {
          template.container = node.data.config as ContainerConfig;
        } else if (node.type === 'dag' && node.data.config) {
          template.dag = node.data.config as DAGConfig;
        } else if (node.type === 'steps' && node.data.config) {
          template.steps = node.data.config as StepsConfig;
        } else if (node.type === 'script' && node.data.config) {
          template.script = node.data.config as ScriptConfig;
        } else if (node.type === 'resource' && node.data.config) {
          template.resource = node.data.config as ResourceConfig;
        } else if (node.type === 'suspend') {
          template.suspend = {};
        }
        
        return template;
      }),
    },
  };

  return spec;
}

/**
 * Converts workflow spec to YAML string
 */
export function workflowToYAML(spec: WorkflowSpec): string {
  return yaml.dump(spec, {
    indent: 2,
    lineWidth: -1,
    noRefs: true,
  });
}

/**
 * Parses YAML string to workflow spec
 */
export function yamlToWorkflow(yamlString: string): WorkflowSpec {
  return yaml.load(yamlString) as WorkflowSpec;
}

/**
 * Converts workflow spec to nodes for React Flow
 */
export function workflowToNodes(spec: WorkflowSpec): WorkflowNode[] {
  if (!spec.spec?.templates) {
    return [];
  }

  return spec.spec.templates.map((template, index) => {
    let type: WorkflowNode['type'] = 'container';
    let config = {};

    if (template.container) {
      type = 'container';
      config = template.container;
    } else if (template.dag) {
      type = 'dag';
      config = template.dag;
    } else if (template.steps) {
      type = 'steps';
      config = template.steps;
    } else if (template.script) {
      type = 'script';
      config = template.script;
    } else if (template.resource) {
      type = 'resource';
      config = template.resource;
    } else if (template.suspend) {
      type = 'suspend';
      config = template.suspend;
    }

    return {
      id: `node-${index}`,
      type,
      position: { x: 100 + index * 250, y: 100 },
      data: {
        name: template.name,
        templateType: type,
        config,
      },
    };
  });
}
