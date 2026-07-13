import express, { json, type Application, type Request, type Response } from "express"
const app:Application = express()
const port = 3000

// middleware
app.use(express.json())

app.get('/', (req:Request, res:Response) => {
  res.status(200).json({
    "message":"Express server!",
    "author":"Faiji Akbar Liam"
  })
})

app.post("/users",async(req:Request,res:Response)=>{
    const body = req.body
    res.status(200).json({
        message:"created",
        data:body
    })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})