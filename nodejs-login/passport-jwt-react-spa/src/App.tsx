import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { useAppSelector } from './hooks';
import AuthRoute from './pages/guard/AuthRoute';

function App() {
  const { token } = useAppSelector(state => state.auth);

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <AuthRoute
                authenticated={token !== ''}
                redirectTo="/signin"
                element={<Index />}
              />}
            />
            <Route path="/signin" element={
              <AuthRoute
                authenticated={token === ''}
                redirectTo="/"
                element={<SignIn />}
              />}
            />
            <Route path="/signup" element={
              <AuthRoute
                authenticated={token === ''}
                redirectTo="/"
                element={<SignUp />}
              />}
            />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
