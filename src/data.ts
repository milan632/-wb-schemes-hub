import Papa from 'papaparse';
import { Scheme, SCHOLARSHIP_KEYWORDS } from './types';
const SHEET_URL = "https://corsproxy.io/?https://docs.google.com/spreadsheets/d/e/2PACX-1vSq_7Zx8mEkBy5QVCwuShosPOg4KwMU_2VODaI6shRIXO5c8z_PaCmvxuNbuP-hVU8Ri2z-Uwu9gA0k/pub?output=csv";

export async function fetchSchemes(): Promise<Scheme[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(SHEET_URL, {
      download: true,
      header: true,
      skipEmptyLines: false, // User requested not to skip empty lines/columns
      complete: (results) => {
        const data = results.data as any[];
        
        const mappedData: Scheme[] = data.map((item) => {
          // Normalize keys (handle spaces or different casing if any)
          const getVal = (keys: string[]) => {
            const key = keys.find(k => item[k] !== undefined);
            return key ? String(item[key]).trim() : '';
          };

          const schemeName = getVal(['Scheme_Name', 'Scheme Name', 'Name']);
          const category = getVal(['Category', 'Type']);
          const eligibility = getVal(['Eligibility', 'Who Can Apply']);
          const department = getVal(['Department']);
          const benefits = getVal(['Benefits', 'Amount', 'Benefit']);
          
          // Category Logic:
          // Category = "Scholarship" ya "Scholarships" → "Scholarships" tab
          // Category = "Scheme" ya "Govt Scheme" ya khali hai → "Govt Schemes" tab
          const lowerCat = category.toLowerCase();
          const isScholarship = lowerCat.includes('scholarship') || 
                               SCHOLARSHIP_KEYWORDS.some(k => schemeName.toLowerCase().includes(k.toLowerCase()));

          return {
            ...item, // Keep all original columns
            Scheme_Name: schemeName,
            Category: category,
            Eligibility: eligibility,
            Benefits: benefits,
            Apply_Link: getVal(['Apply_Link', 'Apply Link', 'Link']),
            Short_Description: getVal(['Short_Description', 'Short Description', 'Description']),
            derived_category: isScholarship ? 'Scholarship' : 'Govt Scheme'
          };
        }).filter(item => item.Scheme_Name); // Filter out rows that are truly empty (no name)

        resolve(mappedData);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
}
