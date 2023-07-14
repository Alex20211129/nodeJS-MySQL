import express from 'express';
import {getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controlloers/product.js'
    
const productRouter = express.Router();

productRouter.route('/').get(getAllProducts);
productRouter.route('/:id').get(getProduct);

productRouter.route('/').post(createProduct).patch(updateProduct).delete(deleteProduct);


export default productRouter;