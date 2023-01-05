import { lazy, Suspense } from 'react';
import {
  Routes, Route, BrowserRouter as Router,
} from 'react-router-dom'
import InlineSpinner from './common/components/inline_spinner';
import Layout from './layout';
import './reset.css'
import "@fontsource/roboto"
const HeroesGrid = lazy(() => import('./components/heroes').then(module => ({ default: module.HeroGrid })))
const HeroesDetail = lazy(() => import('./components/heroes').then(module => ({ default: module.HeroDetail })))

const App = () => {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<FallBack />}>

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

const FallBack = () => <div className="page-center">
  <InlineSpinner />
</div>
