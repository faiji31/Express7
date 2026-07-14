import express, { json, type Application, type Request, type Response } from "express"
const app:Application = express()
import {Pool} from "pg"
const port = 3000



const pool = new Pool(
   {
    connectionString:"postgresql://neondb_owner:npg_sgyv0G1RMSxI@ep-proud-cake-atqt79g7-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
   }
)

const initDB=async()=>{
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(20),
      email VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(20) NOT NULL,
      age INT,
      is_active BOOLEAN DEFAULT TRUE,

      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      
      )`
     
    )
     console.log("database connected successfully!!!")
  } catch (error) {
    console.log(error)
    
  }
}
initDB()

// middleware
app.use(express.json())

app.get('/', (req:Request, res:Response) => {
  res.status(200).json({
    "message":"Express server!",
    "author":"Faiji Akbar Liam"
  })
})

app.post("/users",async(req:Request,res:Response)=>{
    const {name,email,password,age} = req.body

    try {
      const result = await pool.query(
      `INSERT INTO users(name,email,password,age) VALUES($1,$2,$3,$4)
      RETURNING *`
    ,[name,email,password,age])
    res.status(201).json({
        message:"User Created Successfully!!!",
        data:result.rows[0]
    })
      
    } catch (error:any) {
      res.status(500).json({
        message:error.message,
        error:error
      })
    }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})