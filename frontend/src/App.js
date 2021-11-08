import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Login } from './Login.jsx';
import { Home } from './Home.jsx';
import {initInterceptor} from './firebaseAuth';
import { Projects } from './Projects.jsx';


function App() {
  initInterceptor();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/projects" element={<Projects></Projects>} />
        {/* <Route path="/hardwaresets" element={<HardwareSets></HardwareSets>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
