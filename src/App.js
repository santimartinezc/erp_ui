import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import "./App.css";
import PersonalizedNavBar from "./components/PersonalizedNavbar";
import ProductView from "./components/Products/ProductView";
import ReactDOM from "react-dom/client";

import TransactionView from "./components/Transaction/TransactionView";
import HistoryView from "./components/History/HistoryView";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <PersonalizedNavBar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<ProductView />} />
            <Route path="/productos" element={<ProductView />} />
            <Route path="/historico" element={<HistoryView />} />
            <Route path="/venta" element={<TransactionView />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
export default App;
