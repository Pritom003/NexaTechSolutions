// GET
const res = await fetch('http://localhost:5000/api/banner');

// POST
await fetch('http://localhost:5000/api/banner', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newBanner),
});

// PUT
await fetch(`http://localhost:5000/api/banner/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(updatedBanner),
});

// DELETE
await fetch(`http://localhost:5000/api/banner/${id}`, {
  method: 'DELETE',
});
