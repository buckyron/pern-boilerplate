import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Home from './components/Home'
import UserList from './components/user-components/UserList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CompanyDetails } from './components/company-components/CompanyDetails';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          {/* <Route path='/users' element={<UserList />} /> */}
          <Route path="/company/*" element={<CompanyDetails />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
