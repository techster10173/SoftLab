import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import { Login, authStore } from './Login.jsx';
import { Home } from './Home.jsx';
import { createTheme, ThemeProvider } from '@mui/material';
import {Projects} from './Projects.jsx';
import { DataSets } from './DataSets.jsx';
import {Hardware} from './Hardware.js'
import {useState} from 'react'

const theme = createTheme({
  palette: {
    primary: {
      main: "#2d2dd2"
    },
    secondary: {
      main: "#ffa500"
    }
  }
});

function redirect(auth, component){
  return auth ? component : <Navigate to="/login" />
}


function App() {
  const [auth, setAuth] = useState(document.cookie.includes("session"));

  authStore.subscribe(() => {
    setAuth(authStore.getState().value);
  });    

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={!auth ? <Login/> : <Navigate to="/projects" />} />
          <Route path="/projects" element={redirect(auth, <Projects />)} />
          <Route path="/data" element={redirect(auth, <DataSets />)} />
          <Route path="/hardware" element={redirect(auth, <Hardware/>)} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
