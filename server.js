import express from "express";
import cors from 'cors'
import morgan from "morgan";
import Connection from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import path from 'path'
const app = express()
const port = process.env.PORT || 3000;
app.use(cors())
app.use(morgan('dev'))
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
Connection()
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)
app.use(express.static("./client/build"))

app.use('*',(req,res)=>{
    res.sendFile(path.resolve("./client/build/index.html"))
})

app.listen(port, () => { console.log(`server is running on port ${port}`); })