import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SchemeList from './components/SchemeList';
import SchemeDetail from './components/SchemeDetail';
import Favourites from './components/Favourites';
import { fetchSchemes } from './data';
import { Scheme } from './types';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favourites, setFavourites] = useState<string[]>(() => {
    const saved = localStorage.getItem('wb_schemes_favourites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchSchemes();
        setSchemes(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch schemes:', err);
        setError('Failed to load schemes. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem('wb_schemes_favourites', JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (name: string) => {
    setFavourites(prev => 
      prev.includes(name) 
        ? prev.filter(n => n !== name) 
        : [...prev, name]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-text-muted font-bold animate-pulse">Loading schemes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center space-y-4 p-4 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold">!</span>
        </div>
        <h2 className="text-xl font-bold text-text-dark">{error}</h2>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-primary text-white rounded-xl font-bold"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-bg font-sans text-text-dark">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route 
              path="/" 
              element={
                <SchemeList 
                  category="Govt Scheme"
                  searchQuery={searchQuery}
                  schemes={schemes}
                  favourites={favourites} 
                  onToggleFavourite={toggleFavourite} 
                />
              } 
            />
            <Route 
              path="/scholarships" 
              element={
                <SchemeList 
                  category="Scholarship"
                  searchQuery={searchQuery}
                  schemes={schemes}
                  favourites={favourites} 
                  onToggleFavourite={toggleFavourite} 
                />
              } 
            />
            <Route 
              path="/scheme/:name" 
              element={<SchemeDetail schemes={schemes} />} 
            />
            <Route 
              path="/favourites" 
              element={
                <Favourites 
                  schemes={schemes}
                  favourites={favourites} 
                  onToggleFavourite={toggleFavourite} 
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
