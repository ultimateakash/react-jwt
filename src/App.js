import './App.css';
import AppRouter from './app.router';
import { Toaster } from 'react-hot-toast';
import NavBarComponent from './components/nav-bar.component';

function App() {
  return (
    <div className="container">
      <NavBarComponent />
      <AppRouter />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
