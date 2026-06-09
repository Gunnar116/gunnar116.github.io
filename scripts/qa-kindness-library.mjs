import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 })
await page.goto('http://localhost:5173/work/kindness-ai', { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 1500))

// Ch 01 embed structure
const ch1 = await page.evaluate(() => {
  const li = Array.from(document.querySelectorAll('li')).find((el) => /Product Design Infrastructure/.test(el.textContent || ''))
  if (!li) return null
  const iframe = li.querySelector('iframe')
  const badge = li.querySelector('.text-\\[11px\\].uppercase')?.textContent?.trim()
  const openLink = li.querySelector('a[target="_blank"]')
  return {
    hasIframe: !!iframe,
    iframeSrc: iframe?.getAttribute('src'),
    badge,
    openHref: openLink?.getAttribute('href'),
    openText: openLink?.textContent?.trim(),
  }
})
console.log('ch1:', JSON.stringify(ch1, null, 2))

// Drill into the library iframe
const ifr = await page.$('iframe[src*="kindness-design-library"]')
if (ifr) {
  const frame = await ifr.contentFrame()
  if (frame) {
    await frame.waitForSelector('.fan-swatch', { timeout: 5000 })
    const cnt = await frame.$$eval('.fan-swatch', els => els.length)
    console.log('library swatch count:', cnt, '(expected: 44)')
    const tip6 = await frame.$$eval('.fam.kindigo .fan-swatch', els => els[6].getAttribute('data-tip'))
    console.log('kindigo-600 tip:', JSON.stringify(tip6))

    // Test mode toggle
    await frame.click('.mode-toggle button[data-mode="dark"]')
    await new Promise((r) => setTimeout(r, 400))
    const dark600 = await frame.$$eval('.fam.kindigo .fan-swatch', els => els[6].style.background)
    console.log('kindigo-600 after dark toggle:', dark600, '(expected rgb(109, 130, 226))')

    await frame.click('.mode-toggle button[data-mode="light"]')
    await new Promise((r) => setTimeout(r, 400))
    const light600 = await frame.$$eval('.fam.kindigo .fan-swatch', els => els[6].style.background)
    console.log('kindigo-600 after light toggle:', light600, '(expected rgb(72, 99, 219))')
  }
}

// Confirm Ch 02-04 image visuals + lightbox still work
const otherCh = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('li'))
    .filter((li) => /Inbox Workflow|Message Threading|AI-Assisted/.test(li.textContent || ''))
    .map((li) => {
      const t = li.querySelector('h3')?.textContent?.trim()
      const img = li.querySelector('figure img')
      return { title: t, src: img?.getAttribute('src') }
    })
})
console.log('other-ch:', JSON.stringify(otherCh, null, 2))

await browser.close()
