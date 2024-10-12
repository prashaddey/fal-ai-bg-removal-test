import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2024 BG Remover Pro. All rights reserved.</p>
          <div className="flex items-center mt-4 md:mt-0">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-150 ease-in-out">
              <Github className="w-6 h-6" />
            </a>
            <span className="ml-4 text-sm">Built with React & Vite</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;