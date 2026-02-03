import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import backgroundImage from "./assets/paperbackground.png";
import "./App.css";

function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Header />
      <main className="max-w-4xl mx-auto py-8 px-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
