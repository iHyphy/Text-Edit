import { openDB } from 'idb';

// Initialize the database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('JATE database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('JATE database created');
    },
  });

// Add or update content in the database
export const putDb = async (content) => {
  console.log('PUT to the database', content);
  const db = await initdb();
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({id: 1, value: content}); // Assuming a single key for simplicity
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// Retrieve all content from the database
export const getDb = async () => {
  console.log('GET from the database');
  const db = await initdb();
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1); // Assuming a single key for simplicity
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

// Call the initialize database function
initdb();
