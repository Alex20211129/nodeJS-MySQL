import express from 'express';
import dotenv from 'dotenv';
import mysql  from 'mysql2';
import morgan from 'morgan'
import productRouter from './routes/product.js';

dotenv.config()
const app = express();
app.use(morgan("dev"))

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
})

//app.use(express.json());

app.use('/api/v1/products', productRouter);

const port = process.env.PORT || 3000;

// app.use('/', (req, res) => {
//     connection.query('SELECT * FROM users', (err, rows) => {
//         if (err) throw err;
//         res.status(200).send(rows);
//     });
// })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});