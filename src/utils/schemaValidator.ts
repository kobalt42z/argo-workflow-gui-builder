import Ajv, { type ValidateFunction } from 'ajv';

/**
 * JSON Schema validator for Argo Workflows
 */
class SchemaValidator {
  private ajv: Ajv;
  private validateFunction: ValidateFunction | null = null;
  private initialized: boolean = false;

  constructor() {
    this.ajv = new Ajv({
      allErrors: true,
      strict: false,
      validateFormats: false,
    });
  }

  /**
   * Initialize the validator with the schema
   */
  initialize(): void {
    if (this.initialized) return;
    
    try {
      // For now, skip full schema validation due to complexity
      // Schema file is 576KB with 417 definitions
      // We'll do basic structure validation instead
      this.initialized = true;
    } catch (error) {
      console.error('Failed to compile schema:', error);
    }
  }

  /**
   * Validate a workflow object against the schema
   */
  validate(workflow: any): { valid: boolean; errors: string[] } {
    this.initialize();
    
    // Basic validation - check required fields
    const errors: string[] = [];
    
    if (!workflow.apiVersion) {
      errors.push('Missing required field: apiVersion');
    }
    
    if (!workflow.kind) {
      errors.push('Missing required field: kind');
    }
    
    if (!workflow.metadata?.name) {
      errors.push('Missing required field: metadata.name');
    }
    
    if (!workflow.spec?.templates || workflow.spec.templates.length === 0) {
      errors.push('Workflow must have at least one template');
    }

    return { 
      valid: errors.length === 0, 
      errors 
    };
  }

  /**
   * Get schema definitions for a specific type
   */
  getDefinition(definitionKey: string): any {
    // Return empty object for now
    return {};
  }

  /**
   * Get all available workflow-related definitions
   */
  getWorkflowDefinitions(): string[] {
    return [];
  }
}

export const schemaValidator = new SchemaValidator();
