import { lazy } from 'react';
import {
  Routes, Route, BrowserRouter as Router,
} from 'react-router-dom'
import './reset.css'
const HeroesGrid = lazy(() => import('./components/heroes').then(module => ({ default: module.HeroGrid })))
const HeroesDetail = lazy(() => import('./components/heroes').then(module => ({ default: module.HeroDetail })))


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path=':id'
            element={<HeroesDetail />
            }
          />
          <Route
          path='*'
            element={<HeroesGrid />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
