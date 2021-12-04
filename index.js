import express from 'express'
import mongoose from 'mongoose'
import { Router } from 'express'

import ProductController from './controller/ProductController.js'
import verifyIfProductExists from './middleware/ProductMiddleware.js'

mongoose.connect("mongodb://localhost:27017/product", { useNewUrlParser: true, useUnifiedTopology: true });

const app = express()
const router = Router()

app.use(express.json())
app.use("/",router);

router.get('/', ProductController.index)
router.post('/create', ProductController.create)
router.put('/update/:id',verifyIfProductExists, ProductController.update)
router.delete('/delete/:id', verifyIfProductExists, ProductController.delete)
router.get('/convertcsv', ProductController.convertCSV)


export default app