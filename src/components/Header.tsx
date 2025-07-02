import React, { useState } from "react";
import { Package, Menu, X } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { key: "dashboard", label: "Dashboard" },
  { key: "donations", label: "Donations" },
  { key: "needs", label: "Urgent Needs" },
  { key: "volunteers", label: "Volunteers" },
];

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleTabClick = (tabKey: string) => {
    setActiveTab(tabKey);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-600" />
            <h1 className="ml-3 text-xl sm:text-2xl font-bold text-gray-900">
              <span className="hidden sm:inline">FoodShare NGO</span>
              <span className="sm:hidden">FoodShare</span>
            </h1>
          </div>

          <nav className="hidden md:flex space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.key
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => handleTabClick(tab.key)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    activeTab === tab.key
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
