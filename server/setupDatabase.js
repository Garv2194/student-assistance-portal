// server/setupDatabase.js
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './digital_assistant.db',
  },
  useNullAsDefault: true,
});

async function setup() {
  console.log('Starting database setup...');
  try {
    // Drop table if it exists to start fresh
    await knex.schema.dropTableIfExists('ebooks');
    console.log('Existing "ebooks" table dropped.');

    // Create the ebooks table
    await knex.schema.createTable('ebooks', (table) => {
      
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('author').notNullable();
      table.string('cover').notNullable();
      table.text('content');
      table.string('file_url');
      table.integer('semester').notNullable();
    });
    console.log('"ebooks" table created.');
    
    
const ebooks = [
  { 
    id: 1, 
    title: 'Introduction to Algorithms', 
    author: 'Cormen, Leiserson', 
    cover: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcToAXX4g_bh0qKHEw2zeL61gb15PaF0nhQei1UeOfjfyo4_5lK0OVii-nlE6RkdkWnMzvMLtb2dn0LNkrAESLKWSHd1Sl9vq-Avksb_EUuq-102T-bps_GF',
    //content: 'Chapter 1: The Role of Algorithms in Computing... An algorithm is any well-defined computational procedure that takes some value, or set of values, as input and produces some value, or set of values, as output.' ,
    file_url: '/ebooks/Intro_to_algorithms.pdf',
    semester: 3
  },
  { 
    id: 2, 
    title: 'Python', 
    author: 'Aubrey Lawson', 
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk3sfIt6uf-b5csBfUdwyN86bTgO2xwStqlg&s',
    //content: 'Chapter 1: Clean Code... There are two parts to learning craftsmanship: knowledge and work. You must learn the principles, patterns, and practices. You must also grind that knowledge into your fingers, eyes, and gut by practicing.' ,
    file_url: '/ebooks/Python.pdf',
    semester: 3
  },
  { 
    id: 3, 
    title: 'Database Management Systems', 
    author: 'Elmasri & Navathe', 
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4-IeYQWFpNiHDeQ8V_KgnoN6Un4byvP4i3w&s',
    //content: 'Chapter 1: Databases and Database Users... A database is a collection of related data. By data, we mean known facts that can be recorded and that have implicit meaning.' ,
    file_url: '/ebooks/DBMS.pdf',
    semester: 3
  },
  { 
    id: 4, 
    title: 'Computer Networks', 
    author: 'James F. Kurose', 
    cover: 'https://m.media-amazon.com/images/I/5139UsCTBeL._AC_UF1000,1000_QL80_.jpg',
    //content: 'Chapter 1: Introduction... The main goal of a computer network is to enable resource sharing among multiple computers. This includes sharing hardware devices like printers and storage, as well as sharing information.' ,
    file_url: '/ebooks/Computer_Networks.pdf',
    semester: 7
  },
  
  { 
    id: 5, // <-- Make sure the ID is unique
    title: 'Operating System', 
    author: 'Silberschatz, Galvin, Gagne', 
    cover: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=300', // Find a cover image URL
    //content: 'Chapter 1: Introduction... An operating system is a program that manages a computer’s hardware.',
    file_url: '/ebooks/operating_system.pdf', // <-- Must match your PDF filename
    semester: 5
  }, 

  { 
    id: 6, 
    title: 'Data Structures and Algorithm', 
    author: 'Cormen, Leiserson', 
    cover: 'https://m.media-amazon.com/images/I/71kBRLo8ZtL._AC_UF1000,1000_QL80_.jpg',
    //content: 'Chapter 1: The Role of Algorithms in Computing... An algorithm is any well-defined computational procedure that takes some value, or set of values, as input and produces some value, or set of values, as output.' ,
    file_url: '/ebooks/Dsa.pdf',
    semester: 5
  },
  {
  id: 7, 
    title: 'Formal Language and Automata Theory', 
    author: 'Peter Linz', 
    cover: 'https://m.media-amazon.com/images/I/816J67jnBCL._AC_UF1000,1000_QL80_.jpg',
    //content: 'Chapter 1: The Role of Algorithms in Computing... An algorithm is any well-defined computational procedure that takes some value, or set of values, as input and produces some value, or set of values, as output.' ,
    file_url: '/ebooks/Flat.pdf',
    semester: 5
  },
  {
  id: 8, 
    title: 'Discrete Mathematics', 
    author: 'Oscar Levin', 
    cover: 'https://m.media-amazon.com/images/I/716hbj45eOL._AC_UF1000,1000_QL80_.jpg',
    //content: 'Chapter 1: The Role of Algorithms in Computing... An algorithm is any well-defined computational procedure that takes some value, or set of values, as input and produces some value, or set of values, as output.' ,
    file_url: '/ebooks/Discrete Mathematics 3.pdf',
    semester: 3
  },
  {
  id: 9, 
    title: 'Design and Analysis of Alogrithm', 
    author: 'S. Sridhar', 
    cover: 'https://www.drssridhar.com/wp-content/uploads/2021/03/daa.jpg',
    //content: 'Chapter 1: The Role of Algorithms in Computing... An algorithm is any well-defined computational procedure that takes some value, or set of values, as input and produces some value, or set of values, as output.' ,
    file_url: '/ebooks/Design and Analysis of Alogrithm.pdf',
    semester: 3
  },
  { 
    id: 10, 
    title: 'Artificial Intelligence', 
    author: 'David L. Poole', 
    cover: 'https://www.acsebooks.com/database/images/using-artificial-intelligence-pdf-ebook-main-9266-9266.jpg',
    //content: 'Chapter 1: Databases and Database Users... A database is a collection of related data. By data, we mean known facts that can be recorded and that have implicit meaning.' ,
    file_url: '/ebooks/AI.pdf',
    semester: 5
  },
  { 
    id: 11, 
    title: 'Unix Network Programming Volume 1', 
    author: 'Shlok Gupta', 
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB8Y9jku3VyYPb_579Nl0z-dOZCTbcAWD6dQ&s',
    //content: 'Chapter 1: Databases and Database Users... A database is a collection of related data. By data, we mean known facts that can be recorded and that have implicit meaning.' ,
    file_url: '/ebooks/Unix Network Programming Volume 1.pdf',
    semester: 5
  },
  
];
    
    await knex('ebooks').insert(ebooks);
    console.log('E-books data has been seeded.');

   // This is destructive
await knex.schema.dropTableIfExists('feedback');
await knex.schema.createTable('feedback', (table) => {
  table.increments('id').primary();
  table.string('subject').notNullable();
  table.text('comments').notNullable();
  table.timestamp('created_at').defaultTo(knex.fn.now());
});
console.log('"feedback" table created.');


/*

// This is non-destructive
const feedbackExists = await knex.schema.hasTable('feedback');
if (!feedbackExists) {
  await knex.schema.createTable('feedback', (table) => {
    table.increments('id').primary();
    table.string('subject').notNullable();
    table.text('comments').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
  console.log('"feedback" table created.');
}

*/

  await knex.schema.dropTableIfExists('registrations');
    console.log('Existing "registrations" table dropped.');

    await knex.schema.createTable('registrations', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('event_name').notNullable();
      table.timestamp('registered_at').defaultTo(knex.fn.now());
    });
    console.log('"registrations" table created.');


    //Academic Notices

    await knex.schema.dropTableIfExists('academic_notices');
console.log('Existing "academic_notices" table dropped.');

await knex.schema.createTable('academic_notices', (table) => {
  table.increments('id').primary();
  table.string('title').notNullable();
  table.date('date').notNullable(); // Use date type for easier sorting later if needed
  table.text('description');
  table.boolean('isNew').defaultTo(false);
  table.string('file_url').nullable(); // Link to the PDF, nullable means it's optional
});
console.log('"academic_notices" table created.');

// Seed the table with initial notices
const initialNotices = [
  { 
    id: 1, 
    title: 'Quiz II Examination Schedule Released', 
    date: '2025-09-28', // Use YYYY-MM-DD format
    description: 'The Quiz II examination schedule for all departments has been released. Check your respective timetables.', 
    isNew: true,
    file_url: '/notices/2025_Quiz2.pdf' // Example link - use your actual filename or null
  },
  { 
    id: 2, 
    title: 'PBL Circular',
    date: '2025-09-22', 
    description: 'Subject: Mentor Initiated Presentation-I for Project-Based Learning (PBL)', 
    isNew: false,
    file_url: '/notices/PBL_5th_Student notice.pdf'
  },
  { 
    id: 3, 
    title: 'End semester Examination coming soon', 
    date: '2025-11-15', 
    description: 'The End semester Examination will start in November', 
    isNew: true,
    file_url: '/notices/ml_workshop_details.pdf' 
   },
   {
     id: 4,
     title: 'Sessional II Examination Schedule Released',
     date: '2025-10-25',
     description: 'The Sessional II examination schedule for all departments has been released. Check your respective timetables.',
     isNew: true,
     file_url: '/notices/2025_Sessional2.pdf'
   },
   {
     id: 5,
     title: 'Quiz I Examination Schedule Released',
     date: '2025-08-22',
     description: 'The Quiz I examination schedule for all departments has been released. Check your respective timetables.',
     isNew: false,
     file_url: '/notices/2025_Quiz1.pdf'
   },
   {
     id: 6,
     title: 'Sessional I Examination Schedule Released',
     date: '2025-09-10',
     description: 'The Sessional I examination schedule for all departments has been released. Check your respective timetables.',
     isNew: false,
     file_url: '/notices/2025_Sessional1.pdf'
   }
];

await knex('academic_notices').insert(initialNotices);
console.log('Academic notices seeded.');
    
  } catch (error) {
    console.error('Error setting up the database:', error);
  } finally {
    await knex.destroy();
    console.log('Database connection closed. Setup complete.');
  }
}

setup();