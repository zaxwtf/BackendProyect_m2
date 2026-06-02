const {body} = require('express-validator')


function validate(req, res, next){
    console.log("entrada validate")
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({errores: errors.array()})
    }
    next()
    console.log("salida validate")
}


module.exports = {
    validate
}