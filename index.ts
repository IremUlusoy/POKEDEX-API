import express, { Express, Request, Response } from "express"
import * as data from "./data.json"

const app: Express = express()
const port = 2400

app.get("/pokemon/:name", (req: Request, res: Response) => {
  let pokemonName = (req.params.name as string).toLowerCase()
  
  if (pokemonName) {
    data.pokemons.forEach(function (pokemon) {
      if (pokemonName == pokemon.Name.toLowerCase()) {
        res.status(200).send(JSON.stringify(pokemon))
      }
    })
  }

  res.status(404).send("The Pokemon not found")
})

app.get("/type/:type", (req: Request, res: Response) => {
    let pokemonType = (req.params.type as string).toLowerCase()
  
    if (pokemonType) {
      const tempArray: typeof data.pokemons[0][] = []
      data.pokemons.forEach(function (pokemon) {
        pokemon["Type I"].forEach(function (type) {
          if (pokemonType == type.toLowerCase()) {
            tempArray.push(pokemon)
          }
        })
  
        if (pokemon["Type II"]) {
          pokemon["Type II"].forEach(function (type) {
            if (pokemonType == type.toLowerCase()) {
              tempArray.push(pokemon)
            }
          })
        }
      })
      res.status(200).send(JSON.stringify(tempArray))
    }
  
    res.status(404).send("The type not found")
  })
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})