import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import MemberForm from './components/MemberForm'
import MemberList from './components/MemberList'
import About from './components/About'

function App() {
  return (
    <>
      <div className = "container">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <div>
            <div className="container center">
              <MemberForm />
            </div>
            <MemberList />
          </div>
        } />
        <Route path="/about" element={<About />} />
      </Routes>
      </div>
    </>
  );
}

export default App;
