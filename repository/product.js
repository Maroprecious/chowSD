const { products } = require("../db/dbMongo/config/db_buildSchema");
const { Product, validateProduct } = require('../model/product')

const createProduct = async (payload) => {
  try {
    const checkProductExist = await getProduct({
      product_name: payload.product_name,
    });
    if (checkProductExist) {
      return { product: checkProductExist, message: "Product already exist" };
    }
    const { error } = validateProduct(payload);
    console.log('errr', error)
    if (error) throw Error(error.details[0].message)
    return await Product.create(payload);
  } catch (error) {
    console.log({ error });
  }
};



const updateProduct = async (filter, payload) => {
  try {
    return await products.findOneAndUpdate(filter, payload, { new: true });
  } catch (error) {
    console.log({ error });
  }
};

const getAllProducts = async (page, filter) => {
  try {
    let getPaginate = await paginate(page, filter);
    const allProducts = await products
      .find(filter || {})
      .limit(getPaginate.limit)
      .skip(getPaginate.skip);
    return {
      products: allProducts,
      count: getPaginate.docCount,
    };
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      messsage: error.message || "Get all products operation failed",
      code: error.code || 500,
    };
  }
};

const getProduct = async (filter) => {
  try {
    return await Product.findOne(filter);
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      messsage: error.message || "Get all products operation failed",
      code: error.code || 500,
    };
  }
};

const deleteProduct = async (id) => {
  try {
    const deleteProduct = await products.deleteOne({ _id: id });
    if (deleteProduct) {
      return { message: "Product sucessfully removed" };
    }
  } catch (error) {
    console.log({ error });
    throw {
      error: error,
      messsage: error.message || "Get all products operation failed",
      code: error.code || 500,
    };
  }
};

const getStoreProducts = async (page, storeId) => {
  try {
    let getPaginate = await paginate(page, filter);
    const storeProducts = await products
      .find(
        {
          _id: { $in: storeId },
        } || {}
      )
      .limit(getPaginate.limit)
      .skip(getPaginate.skip);
    return {
      data: storeProducts,
    };
  } catch (error) {
    throw {
      error: error,
      messsage: error.message || "Get store products operation failed",
      code: 500,
    };
  }
};

const paginate = async (page, filter) => {
  const limit = parseInt(filter.limit) || 10;
  let skip = parseInt(page) === 1 ? 0 : limit * page;
  delete filter.limit;
  const docCount = await products.countDocuments(filter);
  if (docCount < skip) {
    skip = (page - 1) * limit;
  }
  return { skip, limit, docCount };
};

module.exports = {
  getAllProducts,
  getStoreProducts,
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
};
