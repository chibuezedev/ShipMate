import { Routes, Route } from "react-router-dom";

import Signin from "./pages/Signin/signin";
import Signup from "./pages/Signup/signup";
import Order from "./pages/Order/order";
import Dashboard from "./pages/Dashboard/dashboard";
import History from "./pages/History/history";
import Tracking from "./pages/Tracking/tracking";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";

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
        <Route exact path='/chat' element={<Chat />} />
        <Route exact path='/profile' element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
