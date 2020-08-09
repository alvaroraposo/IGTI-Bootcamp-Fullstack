import express from "express";
import { promises as fs} from "fs";
import gradesRouter from "./routes/grades.js"

const { readFile, writeFile } = fs;
global.fileName = "grades.json";
const app = express();
app.use(express.json());
app.use("/grade", gradesRouter);

app.listen(3000, async () => {
    try {
        await readFile(global.fileName);
        console.log("GRADE is Running...");
    }
    catch(err){
        console.log("Could not read grades.json file");
    }
})