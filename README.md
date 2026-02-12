# Argo Workflow GUI Builder

A visual workflow designer for creating Argo Workflows using React and React Flow. This tool provides an intuitive drag-and-drop interface for building Kubernetes workflows without writing YAML manually.

![Argo Workflow GUI Builder](https://github.com/user-attachments/assets/312a9af0-cddf-42d8-9183-29e5b5d2290b)

## Features

- 🎨 **Visual Workflow Design**: Drag-and-drop interface powered by React Flow
- 📦 **Multiple Template Types**: Support for Container, DAG, Script, Steps, and Resource templates
- 🔄 **Real-time YAML Generation**: Instantly convert your visual workflow to valid Argo Workflow YAML
- ✅ **Schema Validation**: Built-in validation using the official Argo Workflows JSON schema
- 📋 **Easy Export**: Copy generated YAML to clipboard with one click
- 🎯 **Kubernetes-native**: Generates workflows compatible with Argo Workflows

## Supported Template Types

- **Container**: Run Docker containers with custom images and commands
- **DAG**: Directed Acyclic Graph for complex workflow dependencies
- **Script**: Execute scripts in containers (Python, Bash, etc.)
- **Steps**: Sequential execution of workflow steps
- **Resource**: Kubernetes resource operations (create, apply, delete, patch)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kobalt42z/argo-workflow-gui-builder.git
cd argo-workflow-gui-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Creating a Workflow

1. **Add Templates**: Click on the template type buttons (Container, DAG, Script, etc.) to add nodes to the canvas
2. **Arrange Nodes**: Drag nodes to position them on the canvas
3. **Connect Nodes**: Draw connections between nodes to define dependencies
4. **Export YAML**: Click "Export YAML" to generate and view the workflow YAML
5. **Copy to Clipboard**: Use the "Copy" button to copy the YAML for use in your Kubernetes cluster

### Building and Deploying

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Technology Stack

- **React 19**: Modern UI framework
- **TypeScript**: Type-safe development
- **React Flow**: Visual workflow canvas
- **Vite**: Fast build tool and dev server
- **js-yaml**: YAML parsing and generation
- **Ajv**: JSON schema validation

## Project Structure

```
src/
├── components/          # React components
│   ├── nodes/          # Custom node components
│   ├── Toolbar.tsx     # Main toolbar
│   ├── WorkflowCanvas.tsx  # React Flow canvas
│   └── YAMLPanel.tsx   # YAML export panel
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
│   ├── yamlConverter.ts    # YAML conversion logic
│   └── schemaValidator.ts  # Schema validation
└── App.tsx             # Main application component
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Roadmap

- [ ] YAML import functionality
- [ ] Node property editing panel
- [ ] Save/load workflows to local storage
- [ ] Export to file
- [ ] REST API integration for workflow submission
- [ ] Real-time workflow status monitoring
- [ ] Template library with common patterns
- [ ] Workflow validation and error highlighting

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Acknowledgments

- [Argo Workflows](https://argoproj.github.io/workflows/) - The workflow engine this tool generates YAML for
- [React Flow](https://reactflow.dev/) - The visual workflow library
- [Vite](https://vitejs.dev/) - Build tool and dev server
