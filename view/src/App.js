import "./App.css";
import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./routes/Home"
import Register from "./routes/Register/Register"
import Login from "./routes/Login/Login"
import Auth from "./routes/Auth"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="auth" element={<Auth/>} />
      <Route path="auth/register" element={<Register />} />
      <Route path="auth/login" element={<Login />} />

    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
