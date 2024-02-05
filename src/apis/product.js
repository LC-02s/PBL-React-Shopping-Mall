import axios from "axios";

const getProduct = axios.create({
    baseURL: 'https://fakestoreapi.com/products',
});

export const getAllProducts = async (config = {}, category = false) => {
    // config: { sort: String< 'desc' || 'asc' >, limit: Number }
    
    let jsonData = null;

    const filteredParams = Object
        .entries(config) // eslint-disable-next-line no-sequences
        .reduce((params, [ param, option ]) => (params[param] = option, params), ({}));
    
    const categorization = (data, target) => { return data
        .map(({ category }) => category)
        .reduce((arr, category, idx) => {
            if (category === target) arr.push(data[idx]); return arr;
        }, ([])) };

    try {
        const result = await getProduct.get('', { params: filteredParams });
        const json = await result.json();
        jsonData = category ? categorization(json, category) : json;
    } 
    catch(err) { return ({ status: false, errCode: err }); }
    finally { return ({ status: true, data: jsonData }); }
}

export const getProductDataById = async (productID) => {
    let jsonData = null;
    try {
        const result = await getProduct.get(`/${productID}`);
        const json = await result.json();
        jsonData = json;
    } 
    catch(err) { return ({ status: false, errCode: err }); }
    finally { return ({ status: true, data: jsonData }); }
}

export const getAllCategories = async () => {
    let jsonData = null;
    try {
        const result = await getProduct.get('/categories');
        const json = await result.json();
        jsonData = json;
    } 
    catch(err) { return ({ status: false, errCode: err }); }
    finally { return ({ status: true, data: jsonData }); }
}