import React from 'react';
import logo from "../assets/LOGO_ERP.png";

const PersonalizedNavBar = ({ userName }) => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="block lg:hidden h-8 w-auto"
                src={logo} // Replace with your logo
                alt="Your Logo"
              />
              <img
                className="hidden lg:block h-8 w-auto"
                src={logo} // Replace with your logo
                alt="Your Logo"
              />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <a href="/venta" className="bg-gray-400 text-white px-3 py-2 rounded-md text-sm font-medium">VENTA</a>
                <a href="/productos" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Productos</a>
                <a href="/transacciones" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Transacciones</a>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <span className="text-white pr-4">Hola, {userName}</span>
            {/* Icono de usuario o imagen */}
            <div className="hidden sm:block">
              <img
                className="h-8 w-8 rounded-full"
                src="/user-avatar.png" // Reemplaza con la imagen del usuario
                alt="User avatar"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state. */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a href="/venta" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">Realizar venta</a>
          <a href="/productos" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Productos</a>
          <a href="/transacciones" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Transacciones</a>
        </div>
      </div>
    </nav>
  );
}

export default PersonalizedNavBar;
