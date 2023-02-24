import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from './pages/RegisterForm';
import Home from './pages/Home';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/request" />} />
        <Route path="*" element={<Navigate to="/request" />} />
        <Route path="/request" element={<Home />} />
        <Route path="/register" element={<Navigate to="/request" />} />
        <Route path="/register/*" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
