import React from 'react';
import { Image } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Image className="w-8 h-8 text-white mr-2" />
          <h1 className="text-white text-xl font-bold">BG Remover Pro</h1>
        </div>
        <div className="text-white font-medium">
          Powered by fal.ai
        </div>
      </div>
    </nav>
  );
};

export default Navbar;