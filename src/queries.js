const checkEmail = 'SELECT s FROM customers s WHERE s.email = $1';
const registerUser = 'INSERT INTO customers (first_name, last_name, username, password, email) VALUES ($1, $2, $3, $4, $5);'
const getUser = 'SELECT * FROM customers WHERE username = $1';
const selectById = 'SELECT * FROM customers WHERE id = $1';
const addGoogleUser = 'INSERT INTO customers (firs)'
const selectByJoinId = 'SELECT (id, first_name, last_name, email) FROM customers UNION SELECT (id, first_name, last_name, email) FROM google_user WHERE id=$1;';

const getAddresses = 'SELECT * FROM address';
const getAddress = 'SELECT * FROM address WHERE customer_id = $1';
const updateAddress = 'UPDATE address SET zipcode=$2, country=$3, city=$4, street_name=$5, street_number=$6, mobile_number=$7 WHERE customer_id=$1';
const addAddress = 'INSERT INTO address( customer_id, zipcode, country , city ,street_name , street_number, mobile_number) VALUES ($1, $2, $3, $4, $5, $6, $7);'

const getAllProducts ='SELECT * FROM products';
const getProduct = 'SELECT * FROM products WHERE id = $1';
const addProduct = 'INSERT INTO  products (item_name, description, image_url, price) VALUES ($1, $2, $3, $4);';
const getProductByName = 'SELECT * FROM products WHERE item_name = $1;';
const updateProduct = 'UPDATE products SET item_name=$2, description=$3, image_url=$4, price=$5 WHERE id=$1;';
const deleteProduct = 'DELETE FROM products WHERE id=$1;';
const getPrice = 'SELECT price FROM products WHERE id=$1;';

const addItemToCart = 'INSERT INTO cart (customer_id, product_id, size, quantity, sub_total) VALUES ($1, $2, $3, $4, $5);';
const selectCustomer = 'SELECT * FROM cart WHERE customer_id = $1;';
const getTotal = 'SELECT SUM(sub_total) as total_price FROM cart WHERE customer_id = $1;';
const addOrder = 'INSERT INTO orders (customer_id, customer_address, total_price) VALUES ($1, $2, $3) RETURNING id;'
const addOrderDetails = 'INSERT INTO order_details (order_id, product_size, product_quantity, product_id) VALUES ($1, $2, $3, $4);';
const deleteCustomersCart = 'DELETE FROM cart WHERE customer_id = $1;';
const findCart = 'SELECT id, product_id FROM cart WHERE id = $1;';
const deleteCart = 'DELETE FROM cart WHERE id = $1;';
const updateQuantity = 'UPDATE cart SET quantity = $1, sub_total = $2  WHERE id = $3;';


const getCustomersOrders = 'SELECT * FROM orders WHERE customer_id = $1;';
const getSpecificOrder = 'SELECT * FROM orders WHERE customer_id = $1 AND id = $2;';

module.exports={
    checkEmail,
    registerUser,
    getUser,
    selectById,
    getAddresses,
    getAddress,
    updateAddress,
    getAllProducts,
    getProduct,
    addProduct,
    getProductByName,
    updateProduct,
    deleteProduct,
    getPrice,
    addItemToCart,
    selectCustomer,
    getTotal,
    addOrder,
    addOrderDetails,
    deleteCustomersCart,
    findCart,
    deleteCart,
    updateQuantity,
    getCustomersOrders,
    getSpecificOrder,
    addAddress,
    addGoogleUser,
    selectByJoinId
}