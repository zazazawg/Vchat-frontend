import React from "react";
import Sidebar from "./sidebar";
import MessageContainer from "./messageContainer";
import { Link } from "react-router"

const Home = () => {
  return (
    <div
      className="relative h-screen bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: 'url("/src/assets/tomato.jpg") ', backgroundSize: 'cover ' }}
    >
      <div className="absolute inset-0 bg-black/40">
        <header className="text-white p-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            <Link
              className="text-amber-100 hover:text-white transition duration-300"
              to="/"
            >
              Vchat
            </Link>
          </h1>
          <nav className="space-x-4">
            <Link to="/" className="hover:underline transition duration-300">
              Home
            </Link>
            <Link
              to="/login"
              className="  hover:underline transition duration-300"
            >
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

        {/* Reduce height of chat section by adjusting the 'h-[600px]' */}
        <section className="flex sm:flex-row flex-col bg-white/30 backdrop-blur-xs rounded-2xl gap-4 p-8 w-3xl mt-2 mx-auto overflow-hidden h-[650px]"> 
          <Sidebar />
          <span className="divider divider-horizontal"></span>
          <div className="flex-1 h-full"> {/* Make sure this takes the remaining space */}
            <MessageContainer />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
