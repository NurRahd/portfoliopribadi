const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./sqlite.db');

console.log('--- Struktur Tabel contact_messages ---');
db.all("PRAGMA table_info(contact_messages);", [], (err, rows) => {
  if (err) throw err;
  rows.forEach(row => {
    console.log(`${row.cid}: ${row.name} (${row.type})${row.notnull ? ' NOT NULL' : ''}${row.pk ? ' PRIMARY KEY' : ''}`);
  });

  console.log('\n--- Isi Tabel contact_messages ---');
  db.all("SELECT * FROM contact_messages;", [], (err, rows) => {
    if (err) throw err;
    if (rows.length === 0) {
      console.log('(Tabel kosong)');
    } else {
      rows.forEach(row => {
        console.log(row);
      });
    }
    db.close();
  });
});

// Script untuk mengosongkan field photoUrl di tabel profile
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('sqlite.db');
db.run('UPDATE profile SET photoUrl = NULL', function(err) {
  if (err) {
    return console.error('Gagal mengosongkan photoUrl:', err.message);
  }
  console.log('Field photoUrl di tabel profile berhasil dikosongkan!');
  db.close();
}); 