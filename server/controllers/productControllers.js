import Product from "../models/Product.js";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



class ProdControllers {

     async create(req, res) {
         try {
             const {title, category, brand, description, price, size, productId} = req.body;
             if (!title || !category || !brand || !description || !price || !productId) {
                 return res.status(403).json('Value of product`s field cannot be empty')
             }
             const {img1, img2, img3} = req.files
             if (!img1) {
                 return res.json({message: "Images cannot be empty"}).status(500);
             }

             await img1.mv(path.resolve(__dirname, '..', 'static', img1.name));
             await img2.mv(path.resolve(__dirname, '..', 'static', img2.name));
             await img3.mv(path.resolve(__dirname, '..', 'static', img3.name));
             const product = await Product.create({
                 title:title.toLowerCase(),
                 category,
                 brand,
                 description,
                 price,
                 size,
                 slug:title.toLowerCase().replace(/ /g, '-'),
                 img1:img1.name,
                 img2:img2.name,
                 img3:img3.name,
                 productId
             });
             return res.json({product}).status(200);
         }
         catch (e) {
             res.status(500).json({msg: e.msg})
         }
     }

    async update(req, res) {
        try {
            const updateProd = await Product.findByIdAndUpdate(
                req.params.id,
                {$set: req.body}, {new: true}
            );
            const {...data} = updateProd._doc;
            res.json({...data}).status(200);
        } catch (e) {
            res.status(501).json('Не выполнено')
        }
    }

    async updateSold(req, res) {
        try {
            const {sold} = req.body;
            const updateProd = await Product.findByIdAndUpdate(
                req.params.id,
                {$set: req.body}, {sold}
            );
            const {...data} = updateProd._doc;
            res.json({...data}).status(200);
        } catch (e) {
            res.status(501).json('Не выполнено')
        }
    }

    async delete(req, res) {
        try {
            const product = await Product.findByIdAndDelete({_id: req.params.id})
            fs.unlinkSync(path.resolve(__dirname, '..', 'static', product.img1));
            fs.unlinkSync(path.resolve(__dirname, '..', 'static', product.img2));
            fs.unlinkSync(path.resolve(__dirname, '..', 'static', product.img3));
            return res.status(200).json({message: "Товар удален"})
        } catch (e) {
            res.status(501).json({message: e})
        }
    }


    async getAll(req, res) {
        try {
            const PAGE_SIZE = 12
            const page = req.query.page * 1 || 1;
            //http://localhost:5000/api/products?page=3
            const pageSize = req.query.pageSize || PAGE_SIZE
             // http://localhost:5000/api/products?pageSize=16
            const qNew = req.query.new;
            const qCatId = req.query.category;
            //http://localhost:5000/api/products?category=skies
            const qBrandId = req.query.brand;
            //http://localhost:5000/api/products?brand=salomon
            const qSize = req.query.size;
            //http://localhost:5000/api/products?size=192
            const qSearch = req.query.search;
            //http://localhost:5000/api/products?search=atomic
            const qPriceOne = req.query.priceone;
            const qPriceTwo = req.query.pricetwo;
            //http://localhost:5000/api/products?priceone=10000&pricetwo=20000
            let products;
            if(qNew) {
                products = await Product.find().sort({createdAt: -1}).limit(1);
            }
            else if (qCatId) {
                products = await Product.find({category:{$in:qCatId,},});
                const countProducts = await Product.countDocuments({category:{$in:qCatId,},});
                return res.json({products, countProducts, page, pages: Math.ceil(countProducts / pageSize)}).status(200)
            }
            else if (qBrandId) {
                products = await Product.find({brand: {$in: qBrandId}});
                const countProducts = await Product.countDocuments({brand: {$in: qBrandId}});
                return res.json({products, countProducts, page, pages: Math.ceil(countProducts / pageSize)}).status(200)
            }
            else if (qSize) {
                products = await Product.find({size: {$in: qSize}});
                const countProducts = await Product.countDocuments({size: {$in: qSize}});
                return res.json({products, countProducts, page, pages: Math.ceil(countProducts / pageSize)}).status(200)
            }
            else if (qPriceOne) {
                products = await Product.find({price: {$gte: qPriceOne, $lte: qPriceTwo}});
                return res.json({products}).status(200)
            }
            else if (qSearch) {
                products = await Product.find({title: {$regex: qSearch}});
                const countProducts = await Product.countDocuments({title: {$regex: qSearch}});
                return res.json({products, countProducts, page, pages: Math.ceil(countProducts / pageSize)}).status(200)
            }
            else {
                products = await Product.find().skip(pageSize*(page-1)).limit(pageSize);
                const countProducts = await Product.countDocuments();
                return res.json({products, countProducts, page, pages: Math.ceil(countProducts / pageSize)}).status(200)
            }

        } catch (e) {
           res.status(501).json('Не выполнено')
        }
    }
    async getOne(req, res) {
        try {
            const product = await Product.findOne({slug: req.params.slug});
            product ? res.send(product)
                : res.status(404).json({message: "product not found"})

        } catch (e) {
            res.status(501).json('Не выполнено')
        }
    }

}

export default new ProdControllers();