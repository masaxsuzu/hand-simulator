import * as React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import * as styles from "./App.scss";
import { Home } from "../pages/home/Home";
import { NotFound } from "../pages/404/NotFound";

const ROUTER_BASENAME =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
    ? "/"
    : "/hand-simulator";

console.log(`process.env.NODE_ENV=${process.env.NODE_ENV}`);
console.log(`ROUTER_BASENAME=${ROUTER_BASENAME}`);

export const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter basename={ROUTER_BASENAME}>
        <Routes>
          <Route key="0" path="/" element={<Home></Home>} />
          <Route key="1" path="/*" element={<Navigate to="/404"></Navigate>} />
          <Route key="404" path="/404" element={<NotFound></NotFound>} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

class ErrorBoundary extends React.Component<
  {},
  { hasError: boolean; error: any; errorInfo: any }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
    this.state = { hasError: true, error: error, errorInfo: errorInfo };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <h1>
          Something went wrong.
          <p>{`${this.state.error.stack}`}</p>
        </h1>
      );
    }

    return this.props.children;
  }
}
