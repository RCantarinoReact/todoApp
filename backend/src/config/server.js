const porta = 3003

const bodyParse = require('body-parser')
const express = require('express')
const server = express()

//mids - implementação padrao intercept filter pattern do chain of responsibility
// é uma pipeline de operações
server.use(bodyParse.urlencoded({ extended: true }))
server.use(bodyParse.json())

server.listen(porta, function () {
    console.log(`Backend rodando na porta ${porta}`)
})

module.exports = server