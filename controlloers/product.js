import pool from "../db/connectdb.js";

// const getAllProducts = async(req, res) => {
//     try {
//         const [results]= await pool.execute("SELECT * FROM `main`")
//         res.send(results);
//     } catch (error) {
//         console.log(error);
//         res.send(error.sqlMessage);
//     }
// }

const getAllProducts = async (req, res) => {
    let { sort,title, area, address, type, price } = req.query;
    let queryObject = {}
    let query =
        "SELECT `main_id`,`main_title`,`area_name`,`main_address`,`price`,`rent_type_name` FROM `main` JOIN `area` ON `main_area` = `area_id`  JOIN `rent_type` ON`main_type` = `rent_type_id` "
    if (title) {
        queryObject.main_title = `main_title LIKE '%${title}%'`
    }
    if (area) {
        let splitArea = area.split(',')
        if (splitArea.length > 1) {
            queryObject.main_area = `main_area IN (${splitArea.map(item=>`'${item}'`).join(',')})`
        } else {
            queryObject.main_area = `main_area = '${area}'`
        }
    }
    if (address) {
        queryObject.main_address = `main_address LIKE '%${address}%'`
    }
    if (type) {
        let splitType = type.split(',')
        if (splitType.length > 1) {
            queryObject.main_type = `main_type IN (${splitType.map(item => `'${item}'`).join(',')})`;
        } else {
            queryObject.main_type = `main_type = ${type}`;
        }
    }
    if (price) {
        let splitPrice = price.split('_')
        queryObject.price = `price BETWEEN ${splitPrice[0]} AND ${splitPrice[1]}`
    }
   
    if(Object.keys(queryObject).length > 0){
        query += "WHERE "
        query += Object.keys(queryObject).map(key => `${queryObject[key]}`).join(" AND ")
    }
    if (sort) {
        if (sort.includes('-')) {
            sort = sort.replace('-', '')
            query += ` ORDER BY ${sort} asc`
        } else {
            query += ` ORDER BY ${sort} desc`
        }
    }
    console.log(query);
    
    try {
        const [result] = await pool.execute(query);
        if (result.length == 0) {
            return res.send("No product found");
        }
        res.send({count:result.length,result});
    } catch (error) {
        console.log(error);
        res.send(error.sqlMessage);
    }
};

const getProduct = async(req, res) => {
    const { id } = req.params
    try {
        const [result] = await pool.execute("SELECT * FROM `main` WHERE `main_id`=?", [id]);
        if (result.length == 0) {
            return res.send("No product found");
        }
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send(error.sqlMessage);
    }
};


const createProduct = (req, res) => {
    res.send("create product");
};

const updateProduct = (req, res) => {
    res.send("update product");
};

const deleteProduct = (req, res) => {
    res.send("delete product");
};

export {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};