import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Login } from './Login.jsx';
import { Home } from './Home.jsx';
import {initInterceptor} from './firebaseAuth';
import { createTheme, ThemeProvider } from '@material-ui/core';
import {Projects} from './Projects.jsx';
import { DataSets } from './DataSets.jsx';
import {Hardware} from './Hardware.js'

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
          <Route path="/data" element={<DataSets></DataSets>} />
          <Route path="/hardware" element={<Hardware></Hardware>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
