import axios from "axios";

const getProduct = axios.create({
    baseURL: 'https://fakestoreapi.com/products',
});

export const getAllProducts = async (config = {}, category = false) => {
    // config: { sort: String< 'desc' || 'asc' >, limit: Number }

    const filteredParams = Object
        .entries(config) // eslint-disable-next-line no-sequences
        .reduce((params, [ param, option ]) => (params[param] = option, params), ({}));
    
    const categorization = (data, target) => { return data
        .map(({ category }) => category)
        .reduce((arr, category, idx) => {
            if (category === target) arr.push(data[idx]); return arr;
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

export const getProductsToCart = async (cartList) => {
    
    const cartItemArr = (data) => data
        .filter(({ id }) => cartList[id] ? true : false);

    try {
        const { data } = await getProduct.get('', { params: { sort: 'desc' } });
        return ({ status: true, data: cartItemArr(data) });
    } 
    catch(err) { return ({ status: false, errCode: err }); }
}