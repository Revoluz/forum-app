import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CreateThreadPage from './pages/CreateThreadPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LeaderboardPage from './pages/LeaderboardPage';
import DetailThreadPage from './pages/DetailThreadPage';
import './App.css';
import './index.css';
// function App() {
//   return (
//     <div className="bg-background-light dark:bg-background-dark font-display text-text-main dark:text-slate-100 min-h-screen antialiased flex">
//       <Sidebar />
//       <Routes>
//         <main className="flex-1 min-w-0 bg-background-light dark:bg-background-dark">
//           <p>Welcome to the Home Page</p>
//           <Navbar />
//           <Route path="/" element={<HomePage />} />
//         </main>
//       </Routes>
//     </div>
//   );
// }

function App() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-main dark:text-slate-100 min-h-screen antialiased flex">
      <Sidebar />
      <div className="flex-1 min-w-0 bg-background-light dark:bg-background-dark">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateThreadPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/thread/:id" element={<DetailThreadPage />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
