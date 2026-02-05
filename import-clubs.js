const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function importClubs() {
  try {
    // Read clubs data
    const clubsData = JSON.parse(fs.readFileSync('./clubs-data.json', 'utf8'));

    // Filter out placeholder/note entries
    const validClubs = clubsData.filter(club =>
      club.name &&
      !club.notes?.includes('CLUBS BEGIN') &&
      !club.notes?.includes('Already listed') &&
      !club.notes?.includes('Duplicate')
    );

    console.log(`Importing ${validClubs.length} clubs...`);

    // Insert in batches of 50 to avoid timeouts
    const batchSize = 50;
    for (let i = 0; i < validClubs.length; i += batchSize) {
      const batch = validClubs.slice(i, i + batchSize);

      const { data, error } = await supabase
        .from('clubs')
        .insert(batch);

      if (error) {
        console.error(`Error importing batch ${i / batchSize + 1}:`, error);
      } else {
        console.log(`✓ Imported batch ${i / batchSize + 1} (${batch.length} clubs)`);
      }
    }

    console.log('✓ Import complete!');

    // Verify count
    const { count } = await supabase
      .from('clubs')
      .select('*', { count: 'exact', head: true });

    console.log(`Total clubs in database: ${count}`);

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

importClubs();
