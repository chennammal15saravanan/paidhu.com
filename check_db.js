import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://szgqtggokqqaoomryljr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6Z3F0Z2dva3FxYW9vbXJ5bGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMTY2OTYsImV4cCI6MjA5Mzc5MjY5Nn0.fNfv_GPi_q22QUmJvxchJXUNIOSBSH7nhCpVxpkJLlQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testFetch() {
  console.log("Querying Product table...");
  const { data, error } = await supabase
    .from('Product')
    .select('*');

  if (error) {
    console.error("Query Error:", error);
  } else {
    console.log("Success! Fetched products count:", data ? data.length : 0);
    console.log("Fetched products:", JSON.stringify(data, null, 2));
  }
}

testFetch();
