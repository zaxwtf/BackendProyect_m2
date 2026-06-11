import { publicUser } from "./user.js";
import { describe, it, expect} from "vitest"

describe("publicUser", () =>{
    it("devuelve solo id y email sin la contraseña", () =>{
        const user = {id: "abc", email: "a@b.com", password: "secreta"}

        const result = (publicUser(user))

        expect(result).toEqual({id: "abc", email: "a@b.com"})
    })
})