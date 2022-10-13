import express from "express";
import videoRoutes from "./routes/video.route.js";
import userRoutes from "./routes/user.route.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

const app = express();
app.use(express.json());
app.use("/videos", videoRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
	res.sendFile(path.dirname(__filename) + "/client.html");
});
app.listen(process.env.PORT || 8080, () => {
	console.log("Listening");
});
