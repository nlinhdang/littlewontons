
import './style.css';
import { AppProvider } from './AppContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SuccessPage from './SuccessPage';
import Home from './Home';

function App() {

  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
