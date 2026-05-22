import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-luxuryNavy text-white font-inter border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Column 1: Branding */}
        <div className="space-y-4">
          <h3 className="font-playfair text-2xl font-bold tracking-wide text-luxuryGold">
            PRIME REALITY
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed font-light">
            An elite, peer-to-peer luxury real estate platform. Discover exceptional properties and connect directly with sellers globally, powered by advanced AI features.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-4">
          <h4 className="font-playfair text-lg font-semibold text-luxuryGold tracking-wider">
            QUICK LINKS
          </h4>
          <ul className="space-y-2 text-sm text-gray-400 font-light">
            <li><a href="#properties" className="hover:text-luxuryGold transition duration-300">Browse Properties</a></li>
            <li><a href="#about" className="hover:text-luxuryGold transition duration-300">About Us</a></li>
            <li><a href="#testimonials" className="hover:text-luxuryGold transition duration-300">Client Reviews</a></li>
            <li><a href="#contact" className="hover:text-luxuryGold transition duration-300">Contact Support</a></li>
          </ul>
        </div>

        {/* Column 3: Portals (Seller & Admin) */}
        <div className="space-y-4">
          <h4 className="font-playfair text-lg font-semibold text-luxuryGold tracking-wider">
            PORTALS
          </h4>
          <ul className="space-y-2 text-sm text-gray-400 font-light">
            <li><a href="#seller-dashboard" className="hover:text-luxuryGold transition duration-300">Seller Dashboard</a></li>
            <li><a href="#admin-panel" className="hover:text-luxuryGold transition duration-300">Admin Control Panel</a></li>
            <li><a href="#ai-insights" className="hover:text-luxuryGold transition duration-300">AI Price Prediction</a></li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="space-y-4">
          <h4 className="font-playfair text-lg font-semibold text-luxuryGold tracking-wider">
            CONTACT INFO
          </h4>
          <ul className="space-y-2 text-sm text-gray-400 font-light">
            <li className="flex items-center space-x-2">
              <span>📍</span>
              <span>123 Luxury Boulevard, Karachi, PK</span>
            </li>
            <li className="flex items-center space-x-2">
              <span>📞</span>
              <span>+92 21 111-PRIME</span>
            </li>
            <li className="flex items-center space-x-2">
              <span>✉️</span>
              <span>support@primerealty.com</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-gray-800 bg-[#071324] py-4 text-center text-xs text-gray-500 tracking-widest font-light">
        <p>&copy; {new Date().getFullYear()} PRIME REALITY. ALL RIGHTS RESERVED. DESIGNED BY SALEHA BAIG.</p>
      </div>
    </footer>
  );
};

export default Footer;