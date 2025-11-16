import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type DietPlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_days: number;
  calories_per_day: number;
  image_url: string;
  category: string;
  features: string[];
  created_at: string;
};

export type HealthArticle = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  image_url: string;
  category: string;
  reading_time_minutes: number;
  published_at: string;
  created_at: string;
};

export type Order = {
  id: string;
  user_id?: string;
  diet_plan_id: string;
  customer_email: string;
  customer_name: string;
  total_amount: number;
  status: string;
  created_at: string;
};
