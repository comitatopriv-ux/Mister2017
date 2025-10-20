import React from "react";

type Props = { children: React.ReactNode };
type State = { error?: Error };

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = {};

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("❌ Caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <pre
          style={{
            background: "black",
            color: "lime",
            padding: "20px",
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
          }}
        >
          ⚠️ ERRORE RUNTIME:
          {"\n\n"}
          {String(this.state.error.stack || this.state.error.message)}
        </pre>
      );
    }
    return this.props.children;
  }
}
