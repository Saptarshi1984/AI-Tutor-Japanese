import OpenAI from "openai";
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config';

export const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

const supabaseUrl = 'https://fgpspuulkvzysttbrugj.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)