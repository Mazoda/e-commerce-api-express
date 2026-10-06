import app from "./app.js";


const PORT= process.env.PORT ||8080;

const server=app.listen(PORT,()=>{
    console.log("Server is running on Port: ",PORT)
});