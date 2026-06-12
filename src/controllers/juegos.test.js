// import * as juegosController from "./juegos.controller.js"
// import {describe, it, expect} from "vitest"

// describe("crearJuego", () => {
//     it("que la funcion cree el juego al darle nombre, precio, genero y si esta completado", ()=>{
//         const req = {body: {nombre: "Final Fantasy", precio: 45, genero: "rpg", completado: false}} 


//         const result = juegosController.crearJuego(req)


//         expect(result).toEqual(result)
//     });

//     it("que la funcion devuelva un error al faltarle uno de los campos", ()=>{
//         const req = {body: {nombre: "Final Fantasy", precio: 45, genero: "rpg"}} 


//         const result = juegosController.crearJuego(req)


//         expect(() => juegosController.crearJuego(req)).toThrow()
//     });
// })