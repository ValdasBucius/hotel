import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://zdmumewnoadrufptujzq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbXVtZXdub2FkcnVmcHR1anpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU2NTU0NDcsImV4cCI6MjAyMTIzMTQ0N30.GM-2ggMsl51cGF7Rn2HSABokluVAXFZ4KmMiHqk7CQ8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
