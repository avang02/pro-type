import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import Dashboard from '../Dashboard/Dashboard';
import GameMenu from '../../components/GameMenu/GameMenu';

export default function App() {
  const [user, setUser] = useState(getUser());


  return (
    <main className="App">
      { user ?
        <Routes>
          <Route path="/*" element={<Navigate to="/dashboard"/>}/>
          <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser}/>}/>
          <Route path="/typetest" element={<GameMenu user={user} setUser={setUser}/>} />
        </Routes>
        :
       <AuthPage setUser={setUser} />
      }
    </main>
  );
}
