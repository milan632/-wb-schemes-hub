import React, { useState, useMemo } from 'react';
import { Search, FilterX, ChevronLeft, ChevronRight } from 'lucide-react';
import { Scheme } from '../types';
import SchemeCard from './SchemeCard';
import { motion, AnimatePresence } from 'motion/react';

interface SchemeListProps {
  category: 'Govt Scheme' | 'Scholarship';
  searchQuery: string;
  schemes: Scheme[];
  favourites: string[];
  onToggleFavourite: (name: string) => void;
}

const ITEMS_PER_PAGE = 100; // User requested all 100 cards at once, but I'll keep pagination logic just in case, set to 100.

export default function SchemeList({ category, searchQuery, schemes, favourites, onToggleFavourite }: SchemeListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredSchemes = useMemo(() => {
    return schemes.filter(scheme => {
      const matchesTab = scheme.derived_category === category;
      
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        scheme.Scheme_Name.toLowerCase().includes(searchLower) ||
        (scheme.Eligibility || '').toLowerCase().includes(searchLower) ||
        (scheme.Benefits || '').toLowerCase().includes(searchLower);
        
      return matchesTab && matchesSearch;
    });
  }, [category, searchQuery, schemes]);

  const totalPages = Math.ceil(filteredSchemes.length / ITEMS_PER_PAGE);
  const paginatedSchemes = filteredSchemes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-10">
      {/* Results Grid */}
      <div className="min-h-[400px]">
        {paginatedSchemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {paginatedSchemes.map((scheme) => (
                <SchemeCard
                  key={scheme.Scheme_Name}
                  scheme={scheme}
                  isFavourite={favourites.includes(scheme.Scheme_Name)}
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
              <FilterX className="w-10 h-10 text-gray-200" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-text-dark">No Results Found</h3>
              <p className="text-text-muted max-w-xs mx-auto">
                Is category me abhi scheme add nahi hai. Dusre tab me dekhein ya search query check karein.
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="p-2 rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-bold text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="p-2 rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
