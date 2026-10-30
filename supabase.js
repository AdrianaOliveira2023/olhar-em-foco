const SUPABASE_URL = "https://fythbyyyphfruetkxrri.supabase.co";

const SUPABASE_KEY = "sb_publishable_obZTDrisH-YuifhpWyrFvA_n0Gt08aa";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Supabase inicializado!");