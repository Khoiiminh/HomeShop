// Card Components
import React from 'react';
export const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
      {children}
    </div>
  );
  
  export const CardHeader = ({ children, className = "" }) => (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
  
  export const CardTitle = ({ children, className = "" }) => (
    <h3 className={`text-xl font-semibold leading-none tracking-tight ${className}`}>
      {children}
    </h3>
  );
  
  export const CardDescription = ({ children, className = "" }) => (
    <p className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}>
      {children}
    </p>
  );
  
  export const CardContent = ({ children, className = "" }) => (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
  
  // Tabs Components
  export const Tabs = ({ children, defaultValue, onValueChange }) => {
    const [value, setValue] = React.useState(defaultValue);
  
    const handleValueChange = (newValue) => {
      setValue(newValue);
      onValueChange?.(newValue);
    };
  
    const childrenWithProps = React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { value, onValueChange: handleValueChange });
      }
      return child;
    });
  
    return <div className="w-full">{childrenWithProps}</div>;
  };
  
  export const TabsList = ({ children, className = "" }) => (
    <div className={`inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1 ${className}`}>
      {children}
    </div>
  );
  
  export const TabsTrigger = ({ children, value, onValueChange, className = "" }) => (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
        ${value === children.toLowerCase() ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'} ${className}`}
      onClick={() => onValueChange?.(children.toLowerCase())}
    >
      {children}
    </button>
  );
  
  export const TabsContent = ({ children, value, className = "" }) => {
    const isActive = value === children.props?.value;
    if (!isActive) return null;
    
    return (
      <div className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 ${className}`}>
        {children}
      </div>
    );
  };
  
  // Alert Components
  export const Alert = ({ children, className = "" }) => (
    <div
      role="alert"
      className={`relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11 ${className}`}
    >
      {children}
    </div>
  );
  
  export const AlertTitle = ({ children, className = "" }) => (
    <h5 className={`mb-1 font-medium leading-none tracking-tight ${className}`}>
      {children}
    </h5>
  );
  
  export const AlertDescription = ({ children, className = "" }) => (
    <div className={`text-sm opacity-90 [&_p]:leading-relaxed ${className}`}>
      {children}
    </div>
  );