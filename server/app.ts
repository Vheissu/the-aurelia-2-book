import express from 'express';
import sqlite from 'better-sqlite3';

const app = express();
const port = process.env.PORT || '3002';

const db = sqlite('catstore.db');

app.get('/', (req, res) => {
    res.status(200).send('The server is working');
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

app.get('/products', (req, res) => {
    const row = db.prepare('SELECT * from products').all();

    res.json(row);
});

app.get('/product/:id', (req, res) => {
    const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);

    res.json(row);
});

app.get('/orders', (req, res) => {
    const userId = req.params.userId;
    const orders = db.prepare('SELECT * from orders WHERE userId = ?').get(userId);

    res.json(orders);
});

app.post('/user', (req, res) => {
    const username = req.params.username;
    const password = req.params.password;

    const user = db.prepare('SELECT * from users WHERE username = ? AND password = ?').get(username, password);

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(401).send(null);
    }
});