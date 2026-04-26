import { ErrorPage } from "./error-page";

// Registry of available components
const componentRegistry: Record<string, React.ComponentType<unknown>> = {
  // Add actual components here as they are implemented
  // InternetExplorer: InternetExplorerComponent,
  // JSDos: JSDosComponent,
};

interface ComponentRendererProps {
  component?: string;
  data?: Record<string, unknown>;
  onClose?: () => void;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  component,
  data,
  onClose,
}) => {
  if (!component) {
    return <ErrorPage componentName="Unknown" onClose={onClose} />;
  }

  const ComponentToRender = componentRegistry[component];

  if (!ComponentToRender) {
    return <ErrorPage componentName={component} onClose={onClose} />;
  }

  return <ComponentToRender {...data} />;
};

// Helper to check if a component exists
export const hasComponent = (name: string): boolean => {
  return name in componentRegistry;
};
