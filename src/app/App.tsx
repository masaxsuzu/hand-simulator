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
    <BrowserRouter basename={ROUTER_BASENAME}>
      <Routes>
        <Route key="0" path="/" element={<Home></Home>} />
        <Route key="1" path="/*" element={<Navigate to="/404"></Navigate>} />
        <Route key="404" path="/404" element={<NotFound></NotFound>} />
      </Routes>
    </BrowserRouter>
  );
};
