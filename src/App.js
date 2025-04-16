import './style.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContent from './AppContent';
import PopupBanner from './PopupBanner';

function App() {
  return (
    <Router>
      <AppContent />
       
    </Router>
  );
}

export default App;
