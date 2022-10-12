import "./App.css";
import CustomizedDialogs from "./components/Dialog";
import AddUser from "./components/User";
import ResponsiveAppBar from "./layouts";
import Index from "./routes";

function App() {
  return (
    <div className="App">
      <Index/>
      {/* <CustomizedDialogs title={'Add User Form'}>
        <AddUser />
      </CustomizedDialogs> */}
    </div>
  );
}

export default App;
