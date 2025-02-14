import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://woncqwpykmpabylrhzcw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvbmNxd3B5a21wYWJ5bHJoemN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1NTM3NjYsImV4cCI6MjA1NTEyOTc2Nn0.3SzQqBxBADQQvz376890008cSX_ACYcHJ8rlBCFcY24";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);