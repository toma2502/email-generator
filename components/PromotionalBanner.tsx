
import React from 'react';
import { Rocket, ArrowRight } from 'lucide-react';

const PromotionalBanner: React.FC = () => {
  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 lg:px-8">
        <a 
          href="https://simplexdigital.agency/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block my-4 group"
          aria-label="Saznajte više o našim uslugama izrade web stranica i digitalnog marketinga"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-xl shadow-lg transition-all transform group-hover:scale-[1.02] group-hover:shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Rocket size={40} className="text-white opacity-80 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-bold text-lg">
                    Trebate profesionalnu web stranicu ili digitalni marketing?
                  </h4>
                  <p className="text-white text-sm opacity-90 mt-1">
                    Izrađujemo zapanjujuće web stranice i vodimo ciljane oglasne kampanje na Googleu i društvenim mrežama.
                  </p>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 flex-shrink-0">
                <span className="bg-white/20 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors group-hover:bg-white/30">
                  Saznajte više <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </div>
        </a>
    </div>
  );
};

export default PromotionalBanner;
