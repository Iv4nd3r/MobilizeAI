import React from 'react';

function Header() {
  return (
    <header className="flex justify-between items-center p-6 bg-darkBlue">
      <h1 className="text-2xl font-bold text-lightBlue">Mobilize<span className="font-semibold">AI</span></h1>
      <div>
        <button className="px-4 py-2 bg-lightBlue text-darkBlue font-semibold rounded mr-4">Register</button>
        <button className="px-4 py-2 bg-white text-darkBlue font-semibold rounded">Sign In</button>
      </div>
    </header>
  );
}

export default Header;
