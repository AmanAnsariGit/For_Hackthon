import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jjlrwbjklsxkfwnqcump.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqbHJ3YmprbHN4a2Z3bnFjdW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNDA5NzIsImV4cCI6MjA2MDcxNjk3Mn0.77FJzp0HpRpwERKDibOubE5bMgMe3GZkK8x7Pdq2UYs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
