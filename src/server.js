const express = require('express')// estou pegando o pacote express dentro da pasta node_modules com isso posso acessar o objeto express e suas funcionalidades usando o [.]
const ejs = require('ejs')// estou pegando o pacote ejs dentro da pasta node_modules com isso posso acessar o objeto ejs e suas funcionalidades usando o [.]
const path = require('path')// estou pegando o pacote path dentro da pasta node_modules obs:[ é um pacote que faz parte das dependêcias da pasta node_modules] com isso posso acessar o objeto path e suas funcionalidades usando o [.]
const app = express()


const passengers = [
{
  name:"Joyce",
  flightNumber: 7859,
  time: "18h00",
},
{
  name:"Brock",
  flightNumber: 7859,
  time: "18h00",
},
{
  name:"Eve",
  flightNumber: 7859,
  time: "18h00",
},

]

app.get('/', (request, response) =>{

  const filePath = path.join(__dirname, "print.ejs")//path.join [juntar o caminho]
  ejs.renderFile(filePath, {})

  return response.send(passengers)
})

app.listen(3000)

// passengers.forEach(passengers =>{ // forEach === para cada
//   console.log(passengers.flightNumber)
// })