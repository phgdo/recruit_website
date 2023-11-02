const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: "Token was expired",
                status: "ERR"
            })
        }

        if (user?.role == "Admin") {
            next()
        }else{
            return res.status(404).json({
                message: "This account is not admin",
                status: "ERR"
            })
        }
    })
}

const authUserMiddleware = (req, res, next) => {
    const token = req.headers.token
    const userId = req.params.idUser
    console.log('userId',userId)
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: "Token was expired",
                status: "ERR"
            })
        }
console.log('user',user)
        if (user?.role == "Admin" || user?.id === userId) {
            next()
        } else {
            console.log('This account is not user')
            return res.status(404).json({
                message: "This account is not user",
                status: "ERR"
            })
        }
    })
}

module.exports = {
    authMiddleware, authUserMiddleware
}