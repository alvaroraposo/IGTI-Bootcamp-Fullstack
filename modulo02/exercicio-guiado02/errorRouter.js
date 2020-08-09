import express from "express";

const router = express.Router();

router.use((err, req, res, next) => {
    console.log("Error 1");
    res.status(500).send("Ocorreu um erro");
});

router.get("/", (req, res) => {
    throw new Error("Error message test");
});

router.post("/", async (req, res, next) => {
    try {
        throw new Error("Error message async");
    }
    catch (err) {
        next(err); // vai para o tratamento de erro padrão.
    }    
});

export default router;