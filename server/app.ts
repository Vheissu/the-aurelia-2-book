import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { all, get, run } from './db';

type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
};

type User = {
    id: number;
    username: string;
};

type Order = {
    id: number;
    cart: string;
    quantity?: string | number;
};

type CartItem = {
    id: number;
    title?: string;
    price: number;
    quantity: number;
};

type CheckoutFields = {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    address2: string;
    country: string;
    state: string;
    zip: string;
    paymentType: string;
    ccName: string;
    ccNumber: string;
};

type AsyncRouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const app = express();
const port = process.env.PORT || '3002';

const asyncHandler = (handler: AsyncRouteHandler) => (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    void handler(req, res, next).catch(next);
};

const toPositiveInteger = (value: unknown): number | null => {
    const parsed = typeof value === 'number' ? value : Number(value);

    return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
};

const toNonNegativeNumber = (value: unknown): number | null => {
    const parsed = typeof value === 'number' ? value : Number(value);

    return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
};

const asText = (value: unknown): string => {
    return typeof value === 'string' ? value.trim() : '';
};

const requireText = (body: Record<string, unknown>, field: string): string | null => {
    const value = asText(body[field]);

    return value.length > 0 ? value : null;
};

const parseCart = (value: unknown): CartItem[] | null => {
    if (!Array.isArray(value) || value.length === 0) {
        return null;
    }

    const cart = value.map((item): CartItem | null => {
        if (!item || typeof item !== 'object') {
            return null;
        }

        const record = item as Record<string, unknown>;
        const id = toPositiveInteger(record.id);
        const price = toNonNegativeNumber(record.price);
        const quantity = toPositiveInteger(record.quantity);

        if (id === null || price === null || quantity === null) {
            return null;
        }

        return {
            id,
            title: asText(record.title),
            price,
            quantity,
        };
    });

    return cart.every((item): item is CartItem => item !== null) ? cart : null;
};

const parseCheckoutFields = (value: unknown): CheckoutFields | null => {
    if (!value || typeof value !== 'object') {
        return null;
    }

    const body = value as Record<string, unknown>;
    const firstName = requireText(body, 'firstName');
    const lastName = requireText(body, 'lastName');
    const email = requireText(body, 'email');
    const address = requireText(body, 'address');
    const country = requireText(body, 'country');
    const state = requireText(body, 'state');
    const zip = requireText(body, 'zip');
    const paymentType = requireText(body, 'paymentType');
    const ccName = requireText(body, 'ccName');
    const ccNumber = requireText(body, 'ccNumber');

    if (
        firstName === null ||
        lastName === null ||
        email === null ||
        address === null ||
        country === null ||
        state === null ||
        zip === null ||
        paymentType === null ||
        ccName === null ||
        ccNumber === null
    ) {
        return null;
    }

    return {
        firstName,
        lastName,
        email,
        address,
        address2: asText(body.address2),
        country,
        state,
        zip,
        paymentType,
        ccName,
        ccNumber: ccNumber.slice(-4),
    };
};

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('The server is working');
});

app.get('/products', asyncHandler(async (req, res) => {
    const rows = await all<Product>('SELECT * FROM products ORDER BY id');

    res.json(rows);
}));

app.get('/product/:id', asyncHandler(async (req, res) => {
    const productId = toPositiveInteger(req.params.id);

    if (productId === null) {
        res.status(400).json({ message: 'Product ID must be a positive integer' });
        return;
    }

    const row = await get<Product>('SELECT * FROM products WHERE id = ?', [productId]);

    if (!row) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }

    res.json(row);
}));

app.put('/product/:id', asyncHandler(async (req, res) => {
    const productId = toPositiveInteger(req.params.id);
    const title = requireText(req.body, 'title');
    const description = requireText(req.body, 'description');
    const price = toNonNegativeNumber(req.body.price);

    if (productId === null) {
        res.status(400).json({ message: 'Product ID must be a positive integer' });
        return;
    }

    if (!title || !description || price === null) {
        res.status(400).json({ message: 'Title, description, and a non-negative price are required' });
        return;
    }

    const result = await run(
        'UPDATE products SET title = ?, price = ?, description = ? WHERE id = ?',
        [title, price, description, productId],
    );

    if (result.changes === 0) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }

    res.json({ success: true });
}));

app.post('/search', asyncHandler(async (req, res) => {
    const query = asText(req.body.query);

    if (query.length < 2) {
        res.status(400).json({ message: 'Search query must be at least two characters' });
        return;
    }

    const rows = await all<Product>(
        'SELECT * FROM products WHERE title LIKE ? ORDER BY title',
        [`%${query}%`],
    );

    res.json(rows);
}));

app.post('/orders', asyncHandler(async (req, res) => {
    const userId = toPositiveInteger(req.body.userId);

    if (userId === null) {
        res.status(400).json({ message: 'User ID must be a positive integer' });
        return;
    }

    const rows = await all<Order>('SELECT * FROM orders WHERE userId = ? ORDER BY id DESC', [userId]);

    res.json(rows);
}));

app.post('/order', asyncHandler(async (req, res) => {
    const userId = toPositiveInteger(req.body.userId);
    const orderId = toPositiveInteger(req.body.orderId);

    if (userId === null || orderId === null) {
        res.status(400).json({ message: 'User ID and order ID must be positive integers' });
        return;
    }

    const row = await get<Order>('SELECT * FROM orders WHERE userId = ? AND id = ?', [userId, orderId]);

    if (!row) {
        res.status(404).json({ message: 'Order not found' });
        return;
    }

    res.json(row);
}));

app.post('/register', asyncHandler(async (req, res) => {
    const username = requireText(req.body, 'username');
    const password = requireText(req.body, 'password');

    if (!username || !password) {
        res.status(400).json({ message: 'Username and password are required' });
        return;
    }

    const userExists = await get<User>('SELECT id, username FROM users WHERE username = ?', [username]);

    if (userExists) {
        res.status(409).json({ success: false, message: 'User already registered' });
        return;
    }

    const insert = await run(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, password],
    );

    res.status(201).json({ id: insert.lastID, username, success: true });
}));

app.post('/processOrder', asyncHandler(async (req, res) => {
    const userId = toPositiveInteger(req.body.userId);
    const fields = parseCheckoutFields(req.body.checkoutFields);
    const cart = parseCart(req.body.cart);

    if (userId === null || fields === null || cart === null) {
        res.status(400).json({ message: 'Valid user, checkout fields, and cart are required' });
        return;
    }

    const total = cart.reduce((runningTotal, product) => {
        return runningTotal + product.quantity * product.price;
    }, 0).toFixed(2);

    const insert = await run(
        `INSERT INTO orders (
            cart,
            total,
            userId,
            firstName,
            lastName,
            email,
            address,
            address2,
            country,
            state,
            zip,
            paymentType,
            ccName,
            ccNumber,
            date
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            JSON.stringify(cart),
            total,
            userId,
            fields.firstName,
            fields.lastName,
            fields.email,
            fields.address,
            fields.address2,
            fields.country,
            fields.state,
            fields.zip,
            fields.paymentType,
            fields.ccName,
            fields.ccNumber,
            new Date().toISOString(),
        ],
    );

    res.status(201).json({ orderId: insert.lastID, success: true });
}));

app.post('/user', asyncHandler(async (req, res) => {
    const username = requireText(req.body, 'username');
    const password = requireText(req.body, 'password');

    if (!username || !password) {
        res.status(400).json({ message: 'Username and password are required' });
        return;
    }

    const user = await get<User>(
        'SELECT id, username FROM users WHERE username = ? AND password = ?',
        [username, password],
    );

    if (!user) {
        res.status(401).json(null);
        return;
    }

    res.json(user);
}));

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
});

const start = async () => {
    await run('CREATE UNIQUE INDEX IF NOT EXISTS users_username_unique ON users (username)');

    app.listen(port, () => {
        console.log(`Listening to requests on http://localhost:${port}`);
    });
};

void start();
