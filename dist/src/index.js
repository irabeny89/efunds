"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("../config"));
const app = (0, express_1.default)();
app.disable("x-powered-by");
// headers middleware
app.all("/", (_, res, next) => {
    res.setHeader("Origin", "*"), next();
});
// index route
app.get("/", (_, res) => {
    res.status(200).send("api ok");
});
app.post("/api/register", () => __awaiter(void 0, void 0, void 0, function* () { }));
app.listen(config_1.default.port, () => console.log("Server started on port", config_1.default.port));
