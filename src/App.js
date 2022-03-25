import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { Home } from './features/view/Home';
import { Header } from './features/components/Header';

function App() {
  const history = createBrowserHistory();
  return (
    <div>
      <Router basename={'/'} history={history} >
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
          <div className="Header">
            <Header title={'Today\'s Weather'} />
          </div>
          <div className="Body flex-grow-1" style={{ flexBasis: 1 }}>
            <Routes>
              <Route path="/" index element={<Home />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
