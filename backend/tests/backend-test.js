// backend/tests/backend-test.js
import assert from 'assert';
import { myFunction } from '../src/myModule.js'; // ajuste le chemin selon ton projet

// Exemple simple de test
try {
  const result = myFunction(2, 3);
  assert.strictEqual(result, 5);
  console.log('Test passé ✅');
} catch (error) {
  console.error('Test échoué ❌', error);
}
