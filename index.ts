import express, { Express, Request, Response } from "express";
import * as data from "./data.json";
var cors = require("cors");

const app: Express = express();
app.use(cors());
const port = 2400;

app.options("/pokemon/:name", cors());
app.get("/pokemon/:name", (req: Request, res: Response) => {
  let pokemonName = (req.params.name as string).toLowerCase();

  if (pokemonName) {
    data.pokemons.forEach(function (pokemon) {
      if (pokemonName == pokemon.Name.toLowerCase()) {
        res.status(200).send(JSON.stringify(pokemon));
      }
    });
  }

  res.status(404).send("The Pokemon not found");
});

app.options("/type/:type", cors());
app.get("/type/:type", (req: Request, res: Response) => {
  let pokemonType = (req.params.type as string).toLowerCase();

  if (pokemonType) {
    const tempArray: typeof data.pokemons[0][] = [];
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

app.options("/pokemons", cors());

app.get("/pokemons", (req: Request, res: Response) => {
  let pokemonOffset = req.query.offset as string;
  let pokemonLimit = req.query.limit as string;

  if (pokemonLimit && pokemonOffset) {
    res
      .status(200)
      .send(
        data.pokemons.slice(
          parseInt(pokemonOffset, 10),
          parseInt(pokemonLimit, 10)
        )
      );
  } else {
    res.status(200).send(JSON.stringify(data.pokemons));
  }



  // const tempArray: [] = []
  // data.pokemons.forEach(function (pokemon) {
  //   pokemon["Type I"].forEach(function (type) {
  //     if (pokemonType == type.toLowerCase()) {
  //       tempArray.push(pokemon)
  //     }
  //   })
});
// app.get("/pokemons", (req: Request, res: Response) => {

//   res.status(200).send(JSON.stringify(data.pokemons))

// app.get("/pokemons?limit&&offset")
// let pokemonLimit = (req.query.limit)
// let pokemonOffset = (req.query.offset)

//   // const tempArray: [] = []
//   // data.pokemons.forEach(function (pokemon) {
//   //   pokemon["Type I"].forEach(function (type) {
//   //     if (pokemonType == type.toLowerCase()) {
//   //       tempArray.push(pokemon)
//   //     }
//   //   })

//     console.log(data.pokemons.slice(2, 4));

// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
