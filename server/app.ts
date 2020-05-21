import express from 'express';
import cors from 'cors';
import sqlite from 'better-sqlite3';

const app = express();
const port = process.env.PORT || '3002';

app.use(cors());

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

app.post('/orders', (req, res) => {
    const userId = req.params.userId;
    const orders = db.prepare('SELECT * from orders WHERE userId = ?').get(userId);

    res.json(orders);
});

app.post('/processOrder', (req, res) => {
    const userId = parseInt(req.params.userId);
    const fields = JSON.parse(req.params.checkoutFields);
    const cart = JSON.parse(req.params.cart);

    // We only want to save the last 4 digits
    fields.ccNumber = fields.ccNumber.toString().substr(-4);

    const productIds = cart.reduce((ids, product) => {
        ids.push(product.id);
        return ids;
    }, []);

    const insert = db.prepare(`INSERT INTO orders (id, productIds, userId, firstName, lastName, email, address, address2, country, state, zip, paymentType, ccName, ccNumber, date) 
        VALUES(null, ${productIds.join(',')}, ${userId}, ${fields.firstName}, ${fields.lastName}, ${fields.email}, ${fields.address}, ${fields.address2}, ${fields.country}, ${fields.state}, ${fields.zip}, ${fields.paymentType}, ${fields.ccName}, ${fields.ccNumber}, ${new Date()})`)
    .run();

    res.json({ orderId: insert.lastInsertRowid, success: true });
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