import Product from "../models/Product.js";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


class ProdControllers {

     async create(req, res) {
         try {
             const {title, catId, brandId, description, price, size, slug, productId} = req.body;
             if (!title || !catId || !brandId || !description || !price || !size || !slug || !productId) {
                 return res.status(403).json('Value of product`s field cannot be empty')
             }
             const {img1, img2, img3} = req.files
             if (!img1 || !img2 || !img3) {
                 return res.json({message: "Images cannot be empty"}).status(500);             }

             await img1.mv(path.resolve(__dirname, '..', 'static', img1.name));
             await img2.mv(path.resolve(__dirname, '..', 'static', img2.name));
             await img3.mv(path.resolve(__dirname, '..', 'static', img3.name));
             const product = await Product.create({
                 title,
                 catId,
                 brandId,
                 description,
                 price,
                 size,
                 slug,
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

    async delete(req, res) {
        try {
            await Product.findByIdAndDelete({_id: req.params.id})
            return res.status(200).json({message: "Товар удален"})
        } catch (e) {
            res.status(501).json({message: e})
        }
    }

    async getAll(req, res) {
        try {
            const qNew = req.query.new;
            const qCatId = req.query.catId;
            const qBrandId = req.query.brandId;
            const qSize = req.query.size;
            let products;
            if(qNew) {
                products = await Product.find().sort({createdAt: -1}).limit(1);
            }
            else if (qCatId) {
                products = await Product.find({catId:{$in:qCatId,},});
            }
            else if (qBrandId) {
                products = await Product.find({brandId: {$in: qBrandId}});
            }
            else if (qSize) {
                products = await Product.find({size: {$in: qSize}});
            }
            else{
                products = await Product.find();
            }
            return res.json(products).status(200)
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