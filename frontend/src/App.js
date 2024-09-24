import { Routes, Route } from "react-router-dom";

import Signin from "./pages/Signin/signin";
import Signup from "./pages/Signup/signup";
import Order from "./pages/Order/order";
import Dashboard from "./pages/Dashboard/dashboard";
import History from "./pages/History/history";
import Tracking from "./pages/Tracking/tracking";

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Signin />} />        
        <Route exact path='/signup' element={<Signup />} />        
        <Route exact path='/order' element={<Order />} />        
        <Route exact path='/dashboard' element={<Dashboard />} />        
        <Route exact path='/history' element={<History />} /> 
        <Route exact path='/tracking' element={<Tracking />} />
      </Routes>
    </>
  );
}

export default App;
