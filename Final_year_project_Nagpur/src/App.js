import "./App.css";
import SensorFarm from "./components/SensorFarm";
import { Routes, Route } from "react-router-dom";
import LoginTest from "./components/LoginTest";
import Bidding from "./components/Bidding";
import Portfolio from "./components/Portfolio";
import Setup from "./components/Setup";
import SensorSetup from "./components/SensorSetup";
import SensorStart from "./components/SensorStart";
import DeployContract from "./components/DeployContract";
import AuthSignup from "./components/AuthSignup";
import AuthLogin from "./components/AuthLogin";
import BidderSetup from "./components/BidderSetup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthSignup />} />
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/bidderSetup" element={<BidderSetup />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/bidding" element={<Bidding />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/sensorsetup" element={<SensorSetup />} />
        <Route path="/getSensorDetails" element={<SensorStart />} />
        <Route path="/deploy" element={<DeployContract />} />
      </Routes>
    </div>
  );
}

export default App;
