import "./App.css";
import { PersonalizedNavBar } from "./components/PersonalizedNavbar";
import ProductView from "./components/Products/ProductView";

function App() {
  return (
    <div>
      <PersonalizedNavBar />
      <ProductView />
    </div>
  );
}

export default App;
