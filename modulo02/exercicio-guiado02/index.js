import express from "express";
import carrosRouter from "./carrosRouter.js";
import errorRouter from "./errorRouter.js";
import logRouter from "./logRouter.js";
import estaticosRouter from "./estaticosRouter.js";

const app = express();

//avisa ao express que vamos utilizar JSON.
//use: executado sempre. mesmo quando não encontra a rota.
// pode ter (req, res, next) => {}
app.use(express.json());
app.use(express.static("public"));
app.use("/images", express.static("public"));

app.use("/carros", carrosRouter);
app.use("/error", errorRouter);
app.use("/log", logRouter); //log: biblioteca Winston
app.use("/estaticos", estaticosRouter);

app.use((err, req, res, next) => {
    console.log("Error 1");
//    res.status(500).send("Ocorreu um erro");
    next(err);
});
app.use((err, req, res, next) => {
    console.log("Error 2");
    res.status(500).send("Ocorreu um erro 2");
});

app.get("/", (req, res) => {
    res.send("Hello World GET!");
});

app.post("/", (req, res) => {
    const a = 1;
    const b = 3;
    const resultado = a + b;
    res.send("Hello World POST! " + resultado);
});


// Letra imediatamente anterior ao ? é opcional
app.get("/teste?", (_req, res) => {
    res.send("/teste?");
});

// Letra imediatamente anterior ao + pode ser repetida indefinidamente
app.get("/buzz+", (_req, res) => {
    res.send("/buzz+");
});

// Asterisco pode ser substituido por 'qualquer coisa'
app.get("/one*Blue", (req, res) => {
    res.send(req.path);
});

// O que está entre parêntesis é opcional
// se trocarmos ? por +: é válido repetir 'ing' indefinidamente.
app.post("/test(ing)?", (req, res) => {
    console.log(req.body);
    res.send(req.path);
});

// Passando parâmetros via get. Parâmetros obrigatórios.
// acrescentar ? se quiser que sejam opcionais
app.get("/testParam/:id/:a", (req, res) => {
    res.send(req.params.id + " " + req.params.a);
});

// Expressões  (não se usa aspas)
// Vários caracteres antes de Red
app.get(/.*Red$/, (req, res) => {
    res.send(req.path);
});

//parâmetros via query
app.get("/testQuery", (req, res) => {
    res.send(req.query);
});

//next
app.get("/testMultipleHandlers", (req, res, next) => {
    console.log("Callback 1");
    next();
}, (req, res) => {
    console.log("Callback 2");
    res.end();
});

//next com array
const callback1 = (req, res, next) => {
    console.log("Callback 1");
    next();
}

const callback2 = (req, res, next) => {
    console.log("Callback 2");
    next();
}

const callback3 = (req, res) => {
    console.log("Callback 3");
    res.end();
}

app.get("/testMultipleHandlersArray", [callback1, callback2, callback3]);

app.all("/testAll", (req, res) => {
    res.send(req.method);
});

//route
app.route("/testRoute")
    .get((req, res) => {
        res.send("/testRoute GET");
    })
    .post((req, res) => {
        res.send("/testRoute POST");
    })

app.listen(3000, () => {    
    console.log("API Started!");
})