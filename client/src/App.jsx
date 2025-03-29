import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import { Dashboard, JobDetails, Profile, Signin, Signup, Companies, Error } from './pages';
import { Header } from './components';

const App = () => {
  const location = useLocation()

  return (
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="*"
          element={
            <>
              <Header />
              <main className="relative flex flex-col justify-start w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard location={location}/>} />
                  <Route path="/job/:id" element={<JobDetails location={location}/>} />
                  <Route path="/profile" element={<Profile location={location}/>} />
                  <Route path="/companies" element={<Companies location={location}/>} />
                  <Route path="*" element={<Error />} />
                </Routes>
              </main>
            </>
          }
        />
      </Routes>
  );
};

export default App;