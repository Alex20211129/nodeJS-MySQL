import express from 'express';
import {getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controlloers/product.js'
    
const productRouter = express.Router();

productRouter.route('/').get(getAllProducts).post(createProduct);
productRouter.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct);



export default productRouter;