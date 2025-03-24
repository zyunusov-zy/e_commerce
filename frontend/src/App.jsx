import { ThemeProvider } from './context/ThemeContext';
// import ModeToggle from './components/common/ModeToggle';
import MainLayout from './components/common/MainLayout';
import HomePage from './pages/home/Home';
function App() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
}

export default App;