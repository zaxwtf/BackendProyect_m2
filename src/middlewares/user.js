export const publicUser = (user) =>{
    return {
        id: user.id,
        email: user.email
    }
}

console.log(publicUser({id: "abc", email: "a@b.com", password: "secreta"}))