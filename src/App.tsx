import { lazy, Suspense } from 'react';
import {
  Routes, Route, BrowserRouter as Router,
} from 'react-router-dom'
import Layout from './layout';
import './reset.css'
const HeroesGrid = lazy(() => import('./components/heroes').then(module => ({ default: module.HeroGrid })))
const HeroesDetail = lazy(() => import('./components/heroes').then(module => ({ default: module.HeroDetail })))


const App = () => {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={() => (<div></div>)}>

          <Routes>
            <Route path='*' element={<Layout />}>

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
            </Route>
          </Routes>
        </Suspense>

      </Router>
    </div>
  );
}

export default App;
