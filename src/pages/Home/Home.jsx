import React from "react";
import Sidebar from "./sidebar";
import MessageContainer from "./messageContainer";
import { Link } from "react-router"; // Changed to 'react-router-dom' as 'react-router' is deprecated

const Home = () => {
  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/src/assets/tomato.jpg")' }}
    >
      <div className="absolute inset-0 bg-black/40">
        <header className="text-white p-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            <Link className="text-amber-100 hover:text-white transition duration-300" to="/">
              Vchat
            </Link>
          </h1>
          <nav className="space-x-4">
            <Link to="/" className="hover:text-amber-100 transition duration-300">
              Home
            </Link>
            <Link to="/login" className="hover:text-amber-100 transition duration-300">
              Login
            </Link>
          </nav>
        </header>

        <main className="text-center py-10">
          <h2 className="text-3xl font-semibold text-amber-100 mb-2">
            The Vchat
          </h2>
          <h6 className="text-2xl font-light text-white">
            Chat with your friends, securely.
          </h6>
        </main>

        <section className="flex sm:flex-row sm:h-[600px] h- bg-white/30 backdrop-blur-xs rounded-2xl gap-4 p-8 container mt-2 mx-auto overflow-hidden">
          <Sidebar />
          <span className="divider divider-horizontal"></span>
          <MessageContainer />
        </section>
      </div>
    </div>
  );
};

export default Home;
