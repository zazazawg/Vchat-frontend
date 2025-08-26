import React from 'react';
import { Outlet, Link } from 'react-router';
import { Toaster } from 'react-hot-toast';
const RootLayout = () => {
  return (
    <div className="min-h-screen justify-between flex  mx-auto flex-col">

      {/* Main Content (nested routes will render here) */}
      <main className="flex-1 ">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className=" text-center p-4">
        <p>&copy; {new Date().getFullYear()} <span className="text-red-400">Vchat</span></p>
      </footer>
      <Toaster />
    </div>
  );
};

export default RootLayout;
