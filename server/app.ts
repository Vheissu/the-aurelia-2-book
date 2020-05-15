import express from 'express';

const app = express();
const port = process.env.PORT || '3002';

app.get('/', (req, res) => {
    res.status(200).send('The server is working');
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});