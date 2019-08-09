const porta = 3003

const bodyParse = require('body-parser')
const express = require('express')
const server = express()
const Cors = require('./cors')

//mids - implementação padrao intercept filter pattern do chain of responsibility
// é uma pipeline de operações
server.use(bodyParse.urlencoded({ extended: true }))
server.use(bodyParse.json())
server.use(Cors)

server.listen(porta, function () {
    console.log(`Backend rodando na porta ${porta}`)
})

module.exports = server