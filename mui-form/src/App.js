import { useState } from "react";
import "./App.css";
import CustomizedDialogs from "./components/Dialog";
import AddUser from "./components/User";
import ResponsiveAppBar from "./layouts";
import Index from "./routes";
import { useLocation } from "react-router-dom";

function App() {
  // const [auth, setAuth] = useState(false);
  // const location = useLocation();
  return (
    <div className="App">
      <Index />
      {/* <CustomizedDialogs title={'Add User Form'}>
        <AddUser />
      </CustomizedDialogs> */}
    </div>
  );
}

export default App;
