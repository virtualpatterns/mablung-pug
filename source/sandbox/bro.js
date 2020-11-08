import '@virtualpatterns/mablung-source-map-support/install'

// import { Console } from 'console'
import Browser from 'puppeteer'

(async () => {

  try {

    let browser = await Browser.launch()
    // let console = new Console({
    //   'colorMode': false,
    //   'ignoreErrors': false
    // })

    try {
    
      let page = await browser.newPage()

      page.on('console', async (message) => {

        switch (message.type().toLowerCase()) {
          case 'log':
            console.log(message.text())
            break
          case 'dir':
            console.dir(await message.args()[0].jsonValue())
            break
        }

        // console.log(`message.type = '${message.type()}'`)

        // console.log(`message.text = '${message.text()}'`)
        // console[message.type()](message.text())

        // let parameterHandle = message.args()[0]
        // let parameter = await parameterHandle.jsonValue()
        debugger

        // console.log(message.type)
        // console.dir(message.args()[0])

      })

      await page.evaluate(() => {
        console.log('Hello, world!')
        console.dir({ 'a': 1 })
        console.dir([ 1,2,3,4,5 ])
      })
      
    } finally {
      await browser.close()
    }

  } catch (error) {
    console.error(error)
  }

})()