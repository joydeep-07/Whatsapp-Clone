import { useEffect } from "react";
import { useSelector } from "react-redux";
import Home from "./pages/Home";

const App = () => {
  const { mode } = useSelector((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;

    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [mode]);

  return (
    <div>
      <Home />
    </div>
  );
};

export default App;
