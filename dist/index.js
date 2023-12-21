"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const statusCodes = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
};
const samurais = [
    { id: 1, name: "Shimada" },
    { id: 2, name: "Yamada" },
    { id: 3, name: "Suzuki" },
];
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.post("/", (req, res) => {
    res.status(statusCodes.OK).send({
        message: "Hello! Samurai created!",
        method: req.method,
        body: req.body,
        query: req.query,
    });
});
app.get("/samurais/", (req, res) => {
    let filteredSamurais = samurais;
    if (req.query.name) {
        filteredSamurais = samurais.filter((samurai) => {
            return samurai.name.includes(req.query.name);
        });
    }
    res.status(statusCodes.OK).json(filteredSamurais);
});
app.get("/samurais/:id", (req, res) => {
    let foundSamurai = samurais.find((samurai) => {
        return samurai.id === Number(req.params.id);
    });
    if (!foundSamurai) {
        res.status(statusCodes.NOT_FOUND).json({
            message: "Samurai not found"
        });
        return;
    }
    res.status(statusCodes.OK).json(foundSamurai);
});
app.post("/samurais/", (req, res) => {
    var _a;
    if (!((_a = req.body.name) === null || _a === void 0 ? void 0 : _a.trim())) {
        res.status(statusCodes.BAD_REQUEST).json({
            message: "Error: Samurai name is required"
        });
        return;
    }
    samurais.push({
        id: samurais[samurais.length - 1].id + 1,
        name: req.body.name
    });
    res.status(statusCodes.CREATED).json({
        message: "Samurai created",
        samurai: samurais[samurais.length - 1]
    });
});
app.delete("/samurais/", (req, res) => {
    res.status(statusCodes.METHOD_NOT_ALLOWED).json({
        message: "Method not allowed"
    });
});
app.delete("/samurais/:id", (req, res) => {
    console.log(req.params);
    const foundSamuraiIndex = samurais.findIndex((samurai) => {
        return samurai.id === Number(req.params.id);
    });
    if (foundSamuraiIndex === -1) {
        res.status(404).json({
            message: "Samurai with this id not found"
        });
        return;
    }
    const deletedSamurai = samurais.splice(foundSamuraiIndex, 1);
    res.status(200).json({
        message: `Samurai ${deletedSamurai[0].name} deleted`
    });
});
app.put("/samurais/", (req, res) => {
    res.status(statusCodes.METHOD_NOT_ALLOWED).json({
        message: "Method not allowed"
    });
});
app.put("/samurais/:id", (req, res) => {
    var _a;
    const foundSamuraiIndex = samurais.findIndex((samurai) => {
        return samurai.id === Number(req.params.id);
    });
    if (foundSamuraiIndex === -1) {
        res.status(statusCodes.NOT_FOUND).json({
            message: "Samurai with this id not found"
        });
        return;
    }
    if (!((_a = req.body.name) === null || _a === void 0 ? void 0 : _a.trim())) {
        res.status(statusCodes.BAD_REQUEST).json({
            message: "Error: Samurai name is required"
        });
        return;
    }
    samurais[foundSamuraiIndex] = Object.assign(Object.assign({}, samurais[foundSamuraiIndex]), { name: req.body.name });
    res.status(statusCodes.OK).json({
        message: `Samurai ${samurais[foundSamuraiIndex].name} updated`
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
