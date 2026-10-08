import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/layouts/Navbar";
import { Footer } from "@/layouts/Footer";
import { PageTransition } from "./Loader";

export function RootLayout() {
  const { pathname } = useLocation();

  return (
    <ThemeProvider>
      
      
      <Navbar />
      <main className="min-h-screen">
        <PageTransition routeKey={pathname}>
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 font-heading text-2xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full px-5 py-2.5 font-button text-sm text-primary-foreground [background-image:var(--gradient-brand)]"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

type ErrorBoundaryProps = { children: React.ReactNode };
type ErrorBoundaryState = { error: Error | null };

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  override componentDidCatch(error: Error) {
    console.error(error);
  }

  reset = () => this.setState({ error: null });

  override render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
          <div className="max-w-md text-center">
            <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
              This page didn't load
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Something went wrong on our end. You can try refreshing or head back home.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => {
                  this.reset();
                  window.location.reload();
                }}
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 font-button text-sm text-primary-foreground [background-image:var(--gradient-brand)]"
              >
                Try again
              </button>
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2.5 font-button text-sm text-foreground transition-colors hover:bg-accent/10"
              >
                Go home
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
