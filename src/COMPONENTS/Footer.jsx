// src/components/Footer.jsx

import { Link } from 'react-router-dom';
import { Calculator, Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main four columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-2 rounded-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CreditScore</span>
            </div>
            <p className="text-sm text-slate-400">
              Fair, transparent, and instant credit scoring powered by advanced algorithms.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-400 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-teal-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-teal-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm hover:text-teal-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm hover:text-teal-400 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm hover:text-teal-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm hover:text-teal-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-sm hover:text-teal-400 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-sm hover:text-teal-400 transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-teal-400" />
                <a href="mailto:support@creditscore.com" className="hover:text-teal-400 transition-colors">
                  support@creditscore.com
                </a>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-teal-400" />
                <a href="tel:+911234567890" className="hover:text-teal-400 transition-colors">
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-start space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-teal-400 mt-1" />
                <span>
                  123 Tech Street,
                  <br />
                  Bangalore, India 560001
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with team info, social icons + copyright */}
        <div className="border-t border-slate-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Left: Social & Privacy Links */}
            {/* <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <a
                href="/privacy"
                className="text-sm text-slate-400 hover:text-teal-400 transition-colors"
              >
                Privacy
              </a>
              <a
                href="/terms"
                className="text-sm text-slate-400 hover:text-teal-400 transition-colors"
              >
                Terms
              </a>
              <a
                href="/contact"
                className="text-sm text-slate-400 hover:text-teal-400 transition-colors"
              >
                Contact
              </a>
            </div> */}

            {/* Center: Copyright */}
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} CreditScore. All rights reserved.
            </p>

            {/* Right: Team Members Info */}
            <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 text-sm text-slate-400">
              <span>Built with love by <span className='animate-pulse' >❤️</span>Team Members:</span>
              <span className="font-semibold">Jivesh - 2204921540072</span>
              <span className="font-semibold">Prashant Dagar - 2204921540110</span>
              <span className="font-semibold">Saksham Kumar - 2204921540137</span>
                          </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
