import { ThemeProvider } from './context/ThemeContext';
// import ModeToggle from './components/common/ModeToggle';
import Header from './components/common/Header';

function App() {
  return (
    <ThemeProvider>
      <Header />
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* <ModeToggle /> */}
        <h1>Hello World</h1>
      </div>
    </ThemeProvider>
  );
}

export default App;