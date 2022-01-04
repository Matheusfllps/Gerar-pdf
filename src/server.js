const express = require('express')// estou pegando o pacote express dentro da pasta node_modules com isso posso acessar o objeto express e suas funcionalidades usando o [.]
const ejs = require('ejs')// estou pegando o pacote ejs dentro da pasta node_modules com isso posso acessar o objeto ejs e suas funcionalidades usando o [.]
const path = require('path')// estou pegando o pacote path dentro da pasta node_modules obs:[ é um pacote que faz parte das dependêcias da pasta node_modules] com isso posso acessar o objeto path e suas funcionalidades usando o [.]
const puppeteer = require('puppeteer')
const { request } = require('http')
const { response } = require('express')
// const pdf = require('html-pdf')
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

app.get('/pdf', async(request, response) =>{

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('http://localhost:3000/', {
    waitUntil: 'networkidle0'
  })
  const pdf = await page.pdf({
    printBackground: true,
    format: "letter",
    margin:{
      top:"20px",
      bottom:"40px",
      left:"20px",
      right: "20px"
    }
  })

  await browser.close()

  response.contentType("application/pdf")

  

  return response.send(pdf)
})


app.get('/', (request, response) =>{

  const filePath = path.join(__dirname, "print.ejs")//path.join [juntar o caminho]
  ejs.renderFile(filePath, {passengers}, (err, html) =>{
    if(err){
      return response.send('Erro na leitura do arqivo')
    }
    // const options = {
    //   height: "11.25in",
    //   width: "8.5in",
    //   header:{
    //     height: "20mm" 
    //   },
    //   footer:{
    //     height: "20mm"
    //   }
    
    // // criar pdf
    // pdf.create(html, options).toFile("report.pdf", (err, data) => {
    //   if(err){
    //     return response.send("Erro ao gerar o PDF")
    //   }
      //enviar para o navegador
      return response.send(html)
    })
  })



//   return response.send(passengers)
// })//isso é o primeiro entendimento de callback que nada mais é uma função que tem como parametro outra função retornado alguma coisa

app.listen(3000)

// passengers.forEach(passengers =>{ // forEach === para cada
//   console.log(passengers.flightNumber)

