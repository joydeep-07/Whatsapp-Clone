import React, { useState } from "react";
import Dashboard from "../components/Dashboard";
import Auth from "../components/Auth";

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);

  return <div>{isLogin ? <Dashboard /> : <Auth />}</div>;
};

export default Home;
