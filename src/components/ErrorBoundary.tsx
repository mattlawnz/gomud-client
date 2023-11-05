import React, { useState } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const componentDidCatch = (error: Error, errorInfo: React.ErrorInfo) => {
    // You can log the error or send it to a logging service here
    console.error(error, errorInfo);
    setHasError(true);
    setError(error);
  };

  if (hasError) {
    // You can render a custom error component here
    return (
      <div>
        <h1>Something went wrong.</h1>
        <p>{error?.message}</p>
        {/* Add more error handling or reporting UI here */}
      </div>
    );
  }

  return <>{children}</>;
}

export default ErrorBoundary;
