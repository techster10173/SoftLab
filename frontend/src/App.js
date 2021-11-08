import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Login } from './Login.jsx';
import { Home } from './Home.jsx';
import {initInterceptor} from './firebaseAuth';
import { createTheme, ThemeProvider } from '@material-ui/core';
import {Projects} from './Projects.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: "#00008b"
    },
    secondary: {
      main: "#ffa500"
    }
  }
});

function App() {
  initInterceptor();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/projects" element={<Projects></Projects>} />
          {/* <Route path="/hardwaresets" element={<HardwareSets></HardwareSets>} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
