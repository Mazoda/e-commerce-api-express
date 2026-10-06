
import { Router,Request, Response } from "express"
import { pool } from "../../config/db.js";

const healthRouter=Router();

healthRouter.get("/",async(req:Request,res:Response)=>{
    const startTime = Date.now();
    try {
        const result= await pool.query('SELECT NOW() as server_time');
        const latencyMs= Date.now()- startTime;

        res.status(200).json({
            status:"healthy",
            timestamp: new Date().toISOString(),
            uptimeSeconds: Math.floor(process.uptime()),
            database:{
                status:"up",
                latencyMs,
                serverTime:result.rows[0].server_time,
                totalConnections: pool.totalCount,
                idleConnections: pool.idleCount,
                waitingClients: pool.waitingCount,
            }
        })

    } catch (error) {
        console.error('Health check database query failed:', error);
        res.status(500).json({
            status:"unhealthy",
            timestamp: new Date().toISOString(),
            database:{
                status:"down",
                error:error instanceof Error?error.message:"Somthing went wrong with database!"
            }
        })
    }
})

export default healthRouter;