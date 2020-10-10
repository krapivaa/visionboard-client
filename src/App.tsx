
import React, { useState } from 'react';
import './App.css';
import Auth from './auth/Auth';
// import  Login from './auth/Login';
// import BoardHome from './boardDisplay/boardHome';

  function App() {
    const [token, setToken] = useState("");
    return (
      <div className="image1">
        <h1>Vision Board App</h1>
        <Auth setToken={setToken}/>
         {/* <BoardHome  /> */}
      </div>
    );
  }

export default App;
