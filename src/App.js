import logo from "./logo.svg";
import "./App.css";
import { HomePage } from "./pages/home/home_page";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AboutPage } from "./pages/about/about_page";
import { NavBar } from "./component/nav_Bar";
import { ModelPage } from "./pages/model/model_page";
function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" exact={true} element={<HomePage />} />
          <Route path="/about" exact={true} element={<AboutPage />} />
          <Route path="/model" exact={true} element={<ModelPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
