import express from "express"
import cors from "cors"
import path from "path"
import { ENV } from "./lib/env.js"
import { connectDB } from "./lib/db.js"
import {serve} from "inngest/express"
import { inngest, functions } from "./lib/inngest.js"
import { clerkMiddleware } from '@clerk/express'
import { protectRoute } from "./middlewares/protectRoute.js"
import chatRoutes from "./routes/chatRoutes.js"
import sessionRoutes from "./routes/sessionRoutes.js"

const app = express()

const __dirname = path.resolve();

app.use(express.json());
const normalize = (s) => (s || '').toString().trim().replace(/\/+$/, '');

const allowedOrigins = (
  (process.env.ALLOWED_ORIGINS || process.env.CLIENT_URL || '')
    .split(',')
    .map(normalize)
    .filter(Boolean)
);

const corsOptions = {
  origin: (requestOrigin, callback) => {
    if (!requestOrigin) return callback(null, true);

    const normalizedRequestOrigin = normalize(requestOrigin);
    if (allowedOrigins.includes('*')) return callback(null, true);

    if (allowedOrigins.includes(normalizedRequestOrigin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${requestOrigin}`), false);
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(clerkMiddleware())

app.use("/api/inngest",serve({client:inngest , functions}))
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);


app.get("/video-calls", (req,res)=>{
    res.status(200).json({
        msg: "Video call endpoints"
    })
})

if(ENV.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}

const startServer = async()=>{
    try {
        await connectDB()
        app.listen(ENV.PORT,()=>{
            console.log("server is running on port:",ENV.PORT);
        });
    } catch (error) {
        console.error("Error starting the server",error)
    }
}

startServer();