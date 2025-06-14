import { RouterProvider } from '@tanstack/react-router';
import { TravelProvider } from './context/TravelContext';
import { router } from './router';
import './App.css';

function App() {
  return (
    <TravelProvider>
      <RouterProvider router={router} />
    </TravelProvider>
  );
}

export default App;
