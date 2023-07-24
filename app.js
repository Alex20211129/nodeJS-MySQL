import express from 'express';
import dotenv from 'dotenv';
import mysql  from 'mysql2';
import morgan from 'morgan'
import ejs from 'ejs'
import productRouter from './routes/product.js';
import axios from 'axios';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerDocument from'./swagger.js';
import swaggerUi from 'swagger-ui-express';

// const options = {
//   swaggerDefinition: {
//     // 這邊會是你的api文件網頁描述
//     info: {
//       title: 'demo API',
//       version: '1.0.0',
//       description: 'This is a fake rental data using mySQL.'
//     }
//   }
// };
// const specs = swaggerJsdoc(options);

dotenv.config()
const app = express();
app.set("view engine", "ejs")
app.use(morgan("dev"))
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1/products', productRouter);

app.get('/', async(req, res) => {
    let url = "http://127.0.0.1:8080/api/v1/products"
    try {
        const { data } = await axios.get(url) 
        res.render('index.ejs',{data})
    } catch (error) {
        console.log(error)
    }

})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});