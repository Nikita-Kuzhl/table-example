import express from "express";
import ViteExpress from "vite-express";
import {getUser} from "./routes/user.ts";

const app = express();

app.get("/api/user/", (req, res) => {
    getUser(req,res);
});

ViteExpress.listen(app, 3000, () =>
    console.log("Server is listening on port 3000..."),
);
