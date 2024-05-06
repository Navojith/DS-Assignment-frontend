import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/Routes';
import Navbar from './components/NavBar/Navbar';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="w-dvw min-h-dvh">
          <Navbar />
          <AppRoutes />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
