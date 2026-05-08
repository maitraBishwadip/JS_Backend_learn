import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config(
    {
        path: "./.env"
    }
);

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });

    app.on("error", (error) => {
        console.error("Server error:", error);
    });
})

.catch((error) => {
    console.error("Database connection failed:", error);
});