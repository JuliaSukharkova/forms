import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://mwzifljhucrvtxhypunr.supabase.co'
export const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13emlmbGpodWNydnR4aHlwdW5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxOTE5NjgsImV4cCI6MjA2Mzc2Nzk2OH0.-j4ukBnxVPQiRxN2j-MGRvzWjBkiIa7lNuGpbKWVJJE'
          
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false, 
    },
  })
