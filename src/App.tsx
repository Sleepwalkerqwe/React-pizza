import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';
import { FullPizza } from './pages/FullPizza.tsx';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';

import './scss/app.scss';

// components/PizzaForm.js
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
