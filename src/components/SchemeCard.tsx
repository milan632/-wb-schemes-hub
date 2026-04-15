import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import { Scheme } from '../types';
import { cn, formatAmount } from '../lib/utils';
import { motion } from 'motion/react';

interface SchemeCardProps {
  scheme: Scheme;
  isFavourite: boolean;
  onToggleFavourite: (name: string) => void;
  key?: React.Key;
}

export default function SchemeCard({ scheme, isFavourite, onToggleFavourite }: SchemeCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative bg-white rounded-2xl border border-border p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
    >
      <button
        onClick={() => onToggleFavourite(scheme.Scheme_Name)}
        className={cn(
          "absolute top-5 right-5 p-1 rounded-full transition-all duration-200 z-10",
          isFavourite 
            ? "text-accent" 
            : "text-gray-300 hover:text-accent"
        )}
      >
        <Star className={cn("w-6 h-6", isFavourite && "fill-current")} />
      </button>

      <div className="flex-1">
        <div className="mb-3">
          <h3 className="text-[1.1rem] font-bold text-text-dark leading-snug pr-8 group-hover:text-primary transition-colors">
            {scheme.Scheme_Name}
          </h3>
        </div>

        {scheme.Short_Description && (
          <p className="text-sm text-text-muted mb-4 line-clamp-2 font-medium">
            {scheme.Short_Description}
          </p>
        )}

        <div className="space-y-3 mb-6">
          <div>
            <p className="text-[10px] uppercase font-bold text-text-muted tracking-wider mb-1">Eligibility</p>
            <p className="text-xs text-text-dark font-medium line-clamp-2">
              {scheme.Eligibility}
            </p>
          </div>
          
          {scheme.Benefits && (
            <div>
              <p className="text-[10px] uppercase font-bold text-text-muted tracking-wider mb-1">Benefits</p>
              <p className="text-sm font-bold text-primary">
                {formatAmount(scheme.Benefits)}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-auto">
        <Link
          to={`/scheme/${encodeURIComponent(scheme.Scheme_Name)}`}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-50 text-text-dark border border-border rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors"
        >
          View Details
        </Link>
        
        {scheme.Apply_Link ? (
          <a
            href={scheme.Apply_Link.startsWith('http') ? scheme.Apply_Link : `https://${scheme.Apply_Link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-primary text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors"
          >
            Apply Now
          </a>
        ) : (
          <button
            disabled
            className="w-full py-2.5 px-4 bg-gray-100 text-gray-400 rounded-lg font-bold text-sm cursor-not-allowed border border-border"
          >
            Link Not Available
          </button>
        )}
      </div>
    </motion.div>
  );
}
