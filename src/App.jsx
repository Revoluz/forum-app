import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPreloadProcess } from './states/isPreload/action';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CreateThreadPage from './pages/CreateThreadPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LeaderboardPage from './pages/LeaderboardPage';
import DetailThreadPage from './pages/DetailThreadPage';
import Loading from './components/Loading';
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
//       </Routes
//     </div>
//   );
// }

function App() {
  const dispatch = useDispatch();
  // nilai `isPreload` dan `authUser` diambil dari store. Saat preload selesai, `isPreload` akan false, dan `authUser` akan berisi data user jika login berhasil, atau null jika tidak ada token/invalid token.
  const { isPreload = false, authUser = null } = useSelector(
    (states) => states
  );
  useEffect(() => {
    // saat app pertama kali dijalankan, kita jalankan preload process untuk cek token dan ambil data user (jika token valid). Saat preload selesai, `isPreload` akan false, dan app bisa lanjut render.
    dispatch(asyncPreloadProcess());
  }, [dispatch]);
  if (isPreload) {
    return null;
  }
  if (authUser === null) {
    return (
      <>
        <div className="bg-background-light dark:bg-background-dark font-display text-text-main dark:text-slate-100 min-h-screen antialiased flex">
          <Sidebar />
          <div className="flex-1 min-w-0 bg-background-light dark:bg-background-dark">
            <Navbar />
            <Loading />
            <Routes>
              {/* /* berfungsi sebagai route default jika tidak ada route yang cocok */}
              <Route path="/*" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="bg-background-light dark:bg-background-dark font-display text-text-main dark:text-slate-100 min-h-screen antialiased flex">
        <Sidebar />
        <div className="flex-1 min-w-0 bg-background-light dark:bg-background-dark">
          <Navbar />
          <Loading />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateThreadPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/threads/:id" element={<DetailThreadPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
export default App;
