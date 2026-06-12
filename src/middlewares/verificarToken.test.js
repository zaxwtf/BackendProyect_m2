// import verificarToken from "./verificarToken.js"
// import {it, describe, expect} from "vitest"


// describe("validarJuego", () =>{
//     it("Si se le da un token correcto y que no este expirado devolverá el id del usuario", () =>{
//         const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMjgxZTFjNGM5ZTBlOGYwYThhOTUyZSIsImlhdCI6MTc4MTAxNDA1OSwiZXhwIjoxNzgxNjE4ODU5fQ.K_plTXHM-k7i6ovh0fzL6PM-8DUQScEhsaMJhxMWfmA"
//         const req = {headers: {authorization: `Bearer ${token}`}}


//         const result = verificarToken(req)

//         expect(result).toBe(true)
//     })
// })