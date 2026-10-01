const express = require('express');
const app = express();

app.use(express.json());

// Home Route
app.get('/', (req, res) => {
    res.json({ message: 'Selamat datang di API si5b_latihan_restful' });
});

// Data dummy
let users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
];

// GET: Mengambil semua data
app.get('/api/users', (req, res) => {
    res.json(users);
});

// GET: Mengambil data berdasarkan ID
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
});

// POST: Menambah data baru
app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name || "Unknown"
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT: Mengupdate data
app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    user.name = req.body.name || user.name;
    res.json(user);
});

// DELETE: Menghapus data
app.delete('/api/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({ message: 'User not found' });
    
    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser[0]);
});

// Vercel serverless functions require the app to be exported
module.exports = app;

// Jika dijalankan secara lokal
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
