import axios from "axios";

export const getProduct = axios.create({
    baseURL: 'https://fakestoreapi.com/products',
});


export const getAllProducts = async (config = {}, category = false) => {
    // config: { sort: String< 'desc' || 'asc' >, limit: Number }
    
    const filteredParams = Object
        .entries(config) // eslint-disable-next-line no-sequences
        .reduce((params, [ param, option ]) => (params[param] = option, params), ({}));
    
    const categorization = (data, targetCategory) => { return data
        .map(({ category }) => category)
        .reduce((arr, category, idx) => {
            if (category === targetCategory) arr.push(data[idx]); return arr;
        }, ([])) };

    try {
        let { data } = await getProduct.get('', { params: filteredParams });
        data = category ? categorization(data, category) : data;

        return ({ status: true, data });
    } 
    catch(err) { return ({ status: false, errCode: err }); }
}

export const getProductDataById = async (productID) => {
    try {
        const { data } = await getProduct.get(`/${productID}`);
        return ({ status: true, data });
    } 
    catch(err) { return ({ status: false, errCode: err }); }
}

export const getAllCategories = async () => {
    try {
        const { data } = await getProduct.get('/categories');
        return ({ status: true, data });
    } 
    catch(err) { return ({ status: false, errCode: err }); }
}

export const cartItemFilter = (data, cartItems) => data
    .filter(({ id }) => cartItems[id] ? true : false)
    .sort((a, b) => cartItems[a.id].index - cartItems[b.id].index)
    .map(({ id, image, price, title }) => ({ id, image, price, title, length: cartItems[id].length }));

export const sortCartItem = (cartItems) => Object
    .entries(cartItems)
    .sort((a, b) => a[1].index - b[1].index)
    .reduce((obj, [ id, { length } ], idx) => {
        obj[id] = { index: idx, length };
        return obj;
    }, {});

export const calcTotalPrice = (data) => data
    .reduce((total, { price, length }) => (total += (price * length)), 0).toFixed(2);

export const getProductsToCart = async (cartItems) => {
    try {
        const { data } = await getProduct.get('', { params: { sort: 'desc' } });
        const products = cartItemFilter(data, cartItems);

        return ({ 
            status: true, 
            data: { products, totalPrice: calcTotalPrice(products) } 
        });
    } 
    catch(err) { return ({ status: false, errCode: err }); }
}