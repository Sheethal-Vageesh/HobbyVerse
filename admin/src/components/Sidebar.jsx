import { AdminContext } from '../context/AdminContext';
import React, { useContext } from 'react'

const navItems = [
  { id: 'home', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'skills', label: 'Skills', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
   { id: 'users', label: 'users', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
   { id: 'events', label: 'Events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
 ];

function Sidebar ({isOpen, onClose, activeSection, setActiveSection })
 {

  const {logout}=useContext(AdminContext);

  return (
    <div
    className={`fixed z-10 top-0 left-0 h-full w-64 bg-blue-600 text-white transform transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}
  >
     <div className="flex flex-col h-full">
    <button
      onClick={() => window.location.href = '/'} // Redirect to home page
      className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 mb-6 transition-colors duration-300"
    >
      HobbyVerse
    </button>
    <nav className="flex-grow">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            setActiveSection(item.id);
            if (window.innerWidth < 768) onClose();
            if (item.id === 'home') window.location.href = '/'; // Redirect to home page
          }}
          className={`w-full text-left py-3 px-6 hover:bg-blue-700 transition-colors duration-300 flex items-center ${
            activeSection === item.id ? 'bg-blue-700' : ''
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
          </svg>
          {item.label}
        </button>
      ))}
    </nav>
    <button
      onClick={logout}
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 transition-colors duration-300"
    >
      Logout
    </button>
  </div>
  </div>
  )
}

export default Sidebar


