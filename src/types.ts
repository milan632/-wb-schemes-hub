export interface Scheme {
  Scheme_Name: string;
  Category?: string;
  Short_Description?: string;
  Eligibility: string;
  Benefits?: string;
  Apply_Link: string;
  Type?: string;
  Amount?: string;
  Documents?: string;
  Last_Date?: string;
  Department?: string;
  State_Central?: string;
  derived_category: 'Scholarship' | 'Govt Scheme';
}

export const SCHOLARSHIP_KEYWORDS = [
  'scholarship', 'chatravriti', 'fellowship', 'stipend', 'merit', 
  'student', 'education', 'school', 'college', 'university', 
  'svmc', 'oasis', 'kanyashree', 'aikyashree', 'medhavriti', 
  'shiksha', 'vidya', 'sikshashree', 'pre-matric', 'post-matric', 
  'pre matric', 'post matric'
];
