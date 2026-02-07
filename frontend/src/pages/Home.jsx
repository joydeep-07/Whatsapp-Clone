import React, { useState } from "react";
import Dashboard from "../components/Dashboard";
import NotLoggedIn from "../components/NotLoggedIn";

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);

  return <div>{isLogin ? <Dashboard /> : <NotLoggedIn />}</div>;
};

export default Home;
