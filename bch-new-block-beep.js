/*
  A simple node.js JavaScript program that beeps any time a new BCH block is mined.
*/

const BCHJS = require('@psf/bch-js')

async function beepOnNewBlock() {
  try {
    const bchjs = new BCHJS()

    let currentBlock = await bchjs.Blockchain.getBlockCount()
    console.log('Current block: ', currentBlock)

    setInterval(async function() {
      const now = new Date()
      console.log(`${now.toLocaleString()} Checking for new block...`)

      const blockNow = await bchjs.Blockchain.getBlockCount()

      if(blockNow !== currentBlock) {
        console.log(`New block found: ${blockNow}`)

        // Make beep sound.
        console.log('\u0007')

        currentBlock = blockNow
      }
    }, 60000)
  } catch(err) {
    console.error('Error while running beepOnNewBlock(): ', err)
  }
}
beepOnNewBlock()
