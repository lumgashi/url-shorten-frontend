import "./App.css";

import { Route, Routes } from "react-router-dom";

import SingleUrlShortener from "./SingleUrlShortener";
import List from "./List";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/short-url/:id" element={<SingleUrlShortener />} />
    </Routes>
  );
};

export default App;
