import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sqlite from 'better-sqlite3';

const app = express();
const port = process.env.PORT || '3002';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

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
    const userId = req.body.userId;
    const orders = db.prepare('SELECT * from orders WHERE userId = ?').get(userId);

    res.json(orders);
});

app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = db.prepare('SELECT username FROM users WHERE username = ?').get(username);

    if (!userExists) {
        const insert = db.prepare(`INSERT INTO users (username, password) VALUES('${username}', '${password}')`).run();

        if (insert) {
            res.json({ username, success: true });
        }
    } else {
        res.json({ success: false, message: 'User already registered' });
    }
});

app.post('/processOrder', (req, res) => {
    const userId = parseInt(req.body.userId);
    const fields: any = req.body.checkoutFields;
    const cart: any = req.body.cart;

    // We only want to save the last 4 digits
    fields.ccNumber = fields.ccNumber.toString().substr(-4);

    const productIds = cart.reduce((ids, product) => {
        ids.push(product.id);
        return ids;
    }, []);

    const insert = db.prepare(`INSERT INTO orders (productIds, userId, firstName, lastName, email, address, address2, country, state, zip, paymentType, ccName, ccNumber, date) 
        VALUES('${productIds.join(',')}', '${userId}', '${fields.firstName}', '${fields.lastName}', '${fields.email}', '${fields.address}', '${fields.address2}', '${fields.country}', '${fields.state}', '${fields.zip}', '${fields.paymentType}', '${fields.ccName}', '${fields.ccNumber}', '${new Date()}')`)
    .run();

    res.json({ orderId: insert.lastInsertRowid, success: true });
});

app.post('/user', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = db.prepare('SELECT username FROM users WHERE username = ? AND password = ?').get(username, password);

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(401).send(null);
    }
});