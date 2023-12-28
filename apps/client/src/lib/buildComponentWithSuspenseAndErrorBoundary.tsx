import { Suspense } from "react";
import { withErrorBoundary } from "react-error-boundary";

export function withSuspense<T>(WrappedComponent: React.ComponentType<T>, fallback: NonNullable<React.ReactNode> | null = null) {
  return (props: any) => (
    <Suspense fallback={fallback || <div>Loading...</div>}>
      <WrappedComponent {...props} />
    </Suspense>
  );
}
function ErrorBoundaryGenericFallback({ error, resetErrorBoundary }: { error: any; resetErrorBoundary: any }) {
  return (
    <div>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
export function buildComponentWithSuspenseAndErrorBoundary<T>(
  WrappedComponent: React.ComponentType<T>,
  fallback: NonNullable<React.ReactNode> | null = null
) {
  const WithSuspense = withSuspense<T>(WrappedComponent, fallback);
  const WithErrorBoundary = withErrorBoundary(WithSuspense, {
    FallbackComponent: ErrorBoundaryGenericFallback,
  });
  return WithErrorBoundary;
}
