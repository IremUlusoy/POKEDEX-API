"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data = __importStar(require("./data.json"));
const app = (0, express_1.default)();
const port = 2400;
app.get("/pokemon/:name", (req, res) => {
    let pokemonName = req.params.name.toLowerCase();
    if (pokemonName) {
        data.pokemons.forEach(function (pokemon) {
            if (pokemonName == pokemon.Name.toLowerCase()) {
                res.status(200).send(JSON.stringify(pokemon));
            }
        });
    }
    res.status(404).send("The Pokemon not found");
});
app.get("/type/:type", (req, res) => {
    let pokemonType = req.params.type.toLowerCase();
    if (pokemonType) {
        const tempArray = [];
        data.pokemons.forEach(function (pokemon) {
            pokemon["Type I"].forEach(function (type) {
                if (pokemonType == type.toLowerCase()) {
                    tempArray.push(pokemon);
                }
            });
            if (pokemon["Type II"]) {
                pokemon["Type II"].forEach(function (type) {
                    if (pokemonType == type.toLowerCase()) {
                        tempArray.push(pokemon);
                    }
                });
            }
        });
        res.status(200).send(JSON.stringify(tempArray));
    }
    res.status(404).send("The type not found");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
