import { Brightness4, Brightness7 } from "@mui/icons-material";
import { CssBaseline, IconButton, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BookList from "./pages/BookList";
import "./styles/App.css";
import { darkTheme, lightTheme } from "./theme";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div style={{ padding: "1rem", textAlign: "right" }}>
        <IconButton onClick={toggleTheme} color="inherit">
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<BookList />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
