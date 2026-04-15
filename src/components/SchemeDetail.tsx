import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Scheme } from '../types';
import { 
  ArrowLeft, 
  Share2, 
  ExternalLink, 
  Building2, 
  Calendar, 
  Users, 
  FileText, 
  IndianRupee,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';
import { formatAmount, cn } from '../lib/utils';
import { motion } from 'motion/react';

interface SchemeDetailProps {
  schemes: Scheme[];
}

export default function SchemeDetail({ schemes }: SchemeDetailProps) {
  const { name } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const scheme = schemes.find(s => s.Scheme_Name === decodeURIComponent(name || ''));

  if (!scheme) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Scheme not found</h2>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 text-blue-600 font-semibold hover:underline"
        >
          Go back home
        </button>
      </div>
    );
  }

  const handleShare = async () => {
    if (scheme.Apply_Link) {
      try {
        await navigator.clipboard.writeText(scheme.Apply_Link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy link', err);
      }
    }
  };

  const DetailSection = ({ title, content }: any) => {
    if (!content) return null;
    return (
      <div className="mb-6">
        <p className="text-[0.75rem] uppercase text-text-muted font-bold tracking-wider mb-1">{title}</p>
        <p className="text-[0.95rem] text-text-dark leading-relaxed font-medium">{content}</p>
      </div>
    );
  };

  const sanitizeUrl = (url: string) => {
    if (!url) return '';
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-2xl mx-auto bg-white rounded-[20px] shadow-lg border border-border p-8 md:p-10 relative"
    >
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-text-muted font-bold hover:text-primary transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back
      </button>

      <div className="flex justify-between items-start mb-8">
        <h1 className="text-3xl font-extrabold text-text-dark leading-tight">
          {scheme.Scheme_Name}
        </h1>
        <button
          onClick={handleShare}
          className="p-2 text-text-muted hover:text-primary transition-colors"
          title="Share link"
        >
          {copied ? <Check className="w-5 h-5 text-green-500" /> : <Share2 className="w-5 h-5" />}
        </button>
      </div>

      <div className="space-y-2">
        <DetailSection 
          title="Department" 
          content={scheme.Department} 
        />
        
        <DetailSection 
          title="State or Central" 
          content={`Type: ${scheme.State_Central} Scheme`} 
        />

        <DetailSection 
          title="Benefit" 
          content={formatAmount(scheme.Amount)}
        />

        <DetailSection 
          title="Last Date to Apply" 
          content={scheme.Last_Date} 
        />

        <DetailSection 
          title="Who Can Apply" 
          content={scheme.Eligibility} 
        />

        <DetailSection 
          title="Documents Needed" 
          content={scheme.Documents} 
        />
      </div>

      <div className="mt-10">
        {scheme.Apply_Link ? (
          <>
            <a
              href={sanitizeUrl(scheme.Apply_Link)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-primary text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-md"
            >
              Apply Now
            </a>
            <p className="mt-4 text-[10px] sm:text-xs text-text-muted text-center leading-relaxed font-medium">
              Govt website ka link update ho raha hai. Kripya 'Advanced &gt; Proceed' dabaye ya baad me try karein.
            </p>
          </>
        ) : (
          <button
            disabled
            className="w-full py-4 px-6 bg-gray-200 text-gray-400 rounded-xl font-bold text-lg cursor-not-allowed"
          >
            Link Not Available
          </button>
        )}
      </div>
    </motion.div>
  );
}
