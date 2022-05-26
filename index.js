const puppeteer = require('puppeteer'); // No olvidar el ; aqui o lanza error

(async () => { // Creamos una funcion anonimo autoinvoada asincrona para poder usar await
    const browser = await puppeteer.launch() // Creamos un navegador, si agregamos { headless: false } se abre chromium para ver los pasos
    const page = await browser.newPage() // creamos una pagina

    await page.goto('http://www.amazon.com') // abrimos la url
    await page.screenshot({ path: 'amazon1.jpg' }) // Tomamos screenshot

    await page.type('#twotabsearchtextbox', 'libros de javascript') // Escribimos en el buscador
    await page.click('#nav-search-submit-button') // Damos click en el boton de busqueda
    await page.waitForSelector('.s-widget-container') // Esperamos a que aparezca el elemento html con los resultados

    await page.screenshot({ path: 'amazon2.jpg' }) // Y tomamos captura para corroborar
    // await page.waitFor(3000) //  Le decimos que espere 3 segundos para ver el chromium

    const enlaces = await page.evaluate(() => { // Evaluamos los resultados de la pagina
        const elements = document.querySelectorAll('.a-link-normal')

        const links = []

        for (let element of elements){
            links.push(element.href)
        }
        return links
    })

    console.log('# de enlaces', enlaces.length, enlaces)

    await browser.close()
})()