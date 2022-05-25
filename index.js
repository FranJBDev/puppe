const puppeteer = require('puppeteer')

(async ()=> { // Creamos una funcion anonimo autoinvoada asincrona para poder usar await
    const browser = await puppeteer.launch() // Creamos un navegador

    const page = await browser.newPage()

    await page.goto('http://www.amazon.com')

})()