import dns from "node:dns/promises"
dns.setServers(["8.8.8.8","1.1.1.1"])
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectToDB from "./config/db.js"
import authRoutes from './routes/authRoutes.js'
connectToDB()
import transactionRoutes from './routes/transactionRoutes.js'


const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth',authRoutes)
app.use("/api/transactions", transactionRoutes);

app.get('/',(req,res)=>{
    res.send("Finance Dashboard UI")
})

const PORT = process.env.PORT || 5000;

app.listen(5000,()=>{
    console.log(`Server running on 5000`)
})