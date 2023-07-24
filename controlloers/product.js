import pool from "../db/connectdb.js";

const getAllProducts = async (req, res) => {
    let { sort, title, area, address, type, price } = req.query;
    let query =
        "SELECT `main_id`,`main_title`,`area_name`,`main_address`,`price`,`rent_type_name` FROM `main` JOIN `area` ON `main_area` = `area_id`  JOIN `rent_type` ON`main_type` = `rent_type_id` ";
    const queryObject  = {}
    if (title) {
        queryObject.main_title = `%${title}%`
    }
    if (address) {
        queryObject.main_address = `%${address}%`
    }
    if (area) {
        let splitArea = area.split(',')
        if (splitArea.length > 1) {
            queryObject.main_area1 = splitArea[0];
            queryObject.main_area2 = splitArea[1];
        } else {
            queryObject.main_area = area
        }
    }
    if (type) {
        queryObject.main_type = type
    }
    if (price) {
        let splitPrice = price.split('_')
        queryObject.price0 = splitPrice[0]
        queryObject.price1 = splitPrice[1]
    }

    if (Object.keys(queryObject).length > 0) {
        query += "WHERE"
        let Array = []
        if (title) {
            Array.push(" `main_title` LIKE ?")
        }
        if (address) {
            Array.push(" `main_address` LIKE ?")
        }
        if (area) {
            let splitArea = area.split(',')
            if (splitArea.length > 1) {
                let i = ""
                splitArea.forEach(element => {
                    i += '?'
                });
                let areas = i.split('')
                Array.push(" `main_area` IN" + `(${areas})`)
            } else {
                Array.push(" `main_area` = ?")
            }
        }
        if (type) {
            Array.push(" `main_type` = ?")
        }
        if (price) {
            Array.push(" `price` BETWEEN ? AND ?")
        }
        let queryString = Array.map(item => item).join(" AND")
        query += queryString
    }
    
    if (sort) {
        if (sort.includes('-')) {
            sort = sort.replace('-', '')
            query += ` ORDER BY ${sort} asc`
        } else {
            query += ` ORDER BY ${sort} desc`
        }
    }
    try {
        const [result] = await pool.execute(query,Object.values(queryObject));
        if (result.length == 0) {
            return res.status(200).send("No product found");
        }
        res.status(200).send({count:result.length,result});
    } catch (error) {
        console.log(error);
        res.status(500).send(error.sqlMessage);
    }
    
};

const getProduct = async(req, res) => {
    const { id } = req.params
    try {
        const [result] = await pool.execute("SELECT `main_id`,`main_title`,`area_name`,`main_address`,`price`,`rent_type_name` FROM `main` JOIN `area` ON `main_area` = `area_id`  JOIN `rent_type` ON`main_type` = `rent_type_id` WHERE `main_id`=?", [id]);
        if (result.length == 0) {
            return res.status(200).send("No product found");
        }
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.sqlMessage);
    }
};


const createProduct = async (req, res) => {
    let insertSql = "INSERT INTO `main` (main_title,main_area,main_address,main_type,price) VALUES (?,?,?,?,?)"
    let resultSql = "SELECT `main_id`,`main_title`,`area_name`,`main_address`,`price`,`rent_type_name` FROM `main` JOIN `area` ON `main_area` = `area_id`  JOIN `rent_type` ON`main_type` = `rent_type_id` WHERE `main_id`=?"
    try {
        const [ResultSetHeader] = await pool.execute(insertSql, Object.values(req.body));
        const [result] = await pool.execute(resultSql, [ResultSetHeader.insertId]);
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.sqlMessage);
    }
};

const updateProduct = async (req, res) => {
    const { main_title, main_area, main_address, main_type, price } = req.body
    let updateoption = []
    if (main_title) {
        updateoption.push(" `main_title`=? ")
    }
    if (main_area) {
        updateoption.push(" `main_area`=? ")
    }
    if (main_address) {
        updateoption.push(" `main_address`=? ")
    }
    if (main_type) {
        updateoption.push(" `main_type`=? ")
    }
    if (price) {
        updateoption.push(" `price`=? ")
    }
    let updateSql = "UPDATE `main` SET" + updateoption.toString() + " WHERE `main_id`=?"
    let resultSql = "SELECT `main_id`,`main_title`,`area_name`,`main_address`,`price`,`rent_type_name` FROM `main` JOIN `area` ON `main_area` = `area_id`  JOIN `rent_type` ON`main_type` = `rent_type_id` WHERE `main_id`=?"
    const sqlParams = Object.values(req.body)
    sqlParams.push(req.params.id)
    try {
        const [ResultSetHeader] = await pool.execute(updateSql, sqlParams);
        if (ResultSetHeader.affectedRows == 1) {
            const [result] = await pool.execute(resultSql,[req.params.id]);
            res.staus(204).send(result);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.sqlMessage);
    }
};

const deleteProduct = async (req, res) => {
    let deleteSql = "DELETE FROM `main` WHERE `main_id`=?"
    let resultSql = "SELECT `main_id`,`main_title`,`area_name`,`main_address`,`price`,`rent_type_name` FROM `main` JOIN `area` ON `main_area` = `area_id`  JOIN `rent_type` ON`main_type` = `rent_type_id`"
    try {
        const [ResultSetHeader] = await pool.execute(deleteSql, [req.params.id]);
        if (ResultSetHeader.affectedRows == 1) {
            const [result] = await pool.execute(resultSql);
            res.staus(204).send({count:result.length,result});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.sqlMessage);
    }
};

export {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};