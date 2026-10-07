import * as React from "react";

/**
 * Minimal, dependency-free stand-in for `react-helmet-async`.
 *
 * `react-helmet-async@2.0.5` declares a peer dependency of
 * `^16.6.0 || ^17.0.0 || ^18.0.0` on React, which conflicts with React 19 and
 * breaks `npm install` under npm 7+'s strict peer-dependency resolution.
 *
 * Every page in this project only ever renders a flat list of
 * `<title>` / `<meta ... />` / `<link ... />` / `<script type="application/ld+json">`
 * children inside `<Helmet>` — exactly the subset this component supports.
 * The public API (`Helmet`, `HelmetProvider`) is intentionally identical to
 * `react-helmet-async`'s so every page's JSX is unchanged; only the import
 * source changed.
 */

type HelmetProps = {
  children?: React.ReactNode;
};

export function Helmet({ children }: HelmetProps) {
  React.useEffect(() => {
    const createdNodes: Element[] = [];
    let previousTitle: string | null = null;
    let titleWasSet = false;

    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;

      const { type, props } = child as React.ReactElement<Record<string, unknown>>;

      if (type === "title") {
        previousTitle = document.title;
        titleWasSet = true;
        const text = (props as { children?: React.ReactNode }).children;
        if (typeof text === "string") {
          document.title = text;
        }
        return;
      }

      if (type === "meta" || type === "link") {
        const el = document.createElement(type);
        for (const [key, value] of Object.entries(props)) {
          if (key === "children" || value == null) continue;
          el.setAttribute(key, String(value));
        }
        document.head.appendChild(el);
        createdNodes.push(el);
        return;
      }

      if (type === "script") {
        const el = document.createElement("script");
        for (const [key, value] of Object.entries(props)) {
          if (key === "children" || value == null) continue;
          el.setAttribute(key, String(value));
        }
        const text = (props as { children?: React.ReactNode }).children;
        if (typeof text === "string") {
          el.textContent = text;
        }
        document.head.appendChild(el);
        createdNodes.push(el);
        return;
      }
    });

    return () => {
      for (const el of createdNodes) {
        el.remove();
      }
      if (titleWasSet && previousTitle !== null) {
        document.title = previousTitle;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  return null;
}

export function HelmetProvider({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}
