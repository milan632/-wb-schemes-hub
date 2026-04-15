import React from 'react';
import SchemeCard from './SchemeCard';
import { Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Scheme } from '../types';

interface FavouritesProps {
  schemes: Scheme[];
  favourites: string[];
  onToggleFavourite: (name: string) => void;
}

export default function Favourites({ schemes, favourites, onToggleFavourite }: FavouritesProps) {
  const favouriteSchemes = schemes.filter(s => favourites.includes(s.Scheme_Name));

  return (
    <div className="space-y-10">
      {favouriteSchemes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {favouriteSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.Scheme_Name}
                scheme={scheme}
                isFavourite={true}
                onToggleFavourite={onToggleFavourite}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center space-y-6 bg-white rounded-3xl border border-dashed border-border"
        >
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
            <Heart className="w-10 h-10 text-gray-200" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-text-dark">No Favourites Yet</h3>
            <p className="text-text-muted max-w-xs mx-auto">
              Click the star icon on any scheme card to save it here.
            </p>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Browse Schemes
          </Link>
        </motion.div>
      )}
    </div>
  );
}
