import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './styles/App.css'
import BookList from './pages/BookList'

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<BookList />} />
      </Routes>
    </Router>
  )
}

export default App
