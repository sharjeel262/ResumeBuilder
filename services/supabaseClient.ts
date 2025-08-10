import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rsivqzrxpbofrigpliyz.supabase.co'; // TODO: Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzaXZxenJ4cGJvZnJpZ3BsaXl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MTE0NjIsImV4cCI6MjA2Nzk4NzQ2Mn0.C5V2lSon6F239J6zizyAPRXTbv2v-auu7nrD0ZpIbKM'
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY); 