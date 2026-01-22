import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        
        
          <p className="text-slate-300 text-sm text-center ">
          

            &copy; {currentYear} Mohamed Mydeen Version: 3.12.02
          </p>
          
        </div>
      
    </footer>
  );
};

export default Footer;
