import React from "react";
import logo from "../assets/LOGO_ERP.png";

const PersonalizedNavBar = ({ userName }) => {
  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <img
              className="block lg:hidden h-8 w-auto"
              src={logo}
              alt="Your Logo"
            />
            <img
              className="hidden lg:block h-8 w-auto"
              src={logo}
              alt="Your Logo"
            />
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <a
              href="/venta"
              className="text-white hover:bg-gray-700 hover:text-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Venta
            </a>
            <a
              href="/inventario"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Inventario
            </a>
            <a
              href="/historico"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Histórico
            </a>
          </div>
          <div className="flex items-center">
            {userName && (
              <span className="text-gray-200 mr-4">Hola, {userName}</span>
            )}
            <img
              className="h-8 w-8 rounded-full"
              src="/user-avatar.png"
              alt="User Avatar"
            />
          </div>
        </div>
      </div>
      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="/venta"
            className="text-white hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            Venta
          </a>
          <a
            href="/inventario"
            className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            Inventario
          </a>
          <a
            href="/historico"
            className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            Histórico
          </a>
        </div>
      </div>
    </nav>
  );
};

export default PersonalizedNavBar;
