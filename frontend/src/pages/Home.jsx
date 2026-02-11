import React from "react";
import { useSelector } from "react-redux";
import Dashboard from "../components/Dashboard";
import Auth from "../components/Auth";

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return <div>{isAuthenticated ? <Dashboard /> : <Auth />}</div>;
};

export default Home;
