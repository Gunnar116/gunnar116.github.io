import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 })
await page.goto('http://localhost:5173/work/fortress-a2v', { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 800))

const data = await page.evaluate(() => {
  const imgs = Array.from(document.querySelectorAll('img')).map((i) => ({
    src: i.getAttribute('src'),
    naturalWidth: i.naturalWidth,
  })).filter((i) => i.src?.startsWith('/work/fortress'))
  const eyebrow = document.querySelector('span.eyebrow')?.textContent?.trim()
  const title = document.querySelector('h1')?.textContent?.trim()
  const confNote = Array.from(document.querySelectorAll('p, div, aside')).find((n) => /This case study reflects enterprise cybersecurity/.test(n.textContent || ''))?.tagName
  const chapterCount = document.querySelectorAll('ol > li').length
  const next = document.querySelector('a[href*="/work/kindness-ai"]')
  return {
    imgs,
    eyebrow,
    title,
    confNote,
    chapterCount,
    nextHref: next?.getAttribute('href'),
    nextText: next?.textContent?.trim(),
  }
})
console.log(JSON.stringify(data, null, 2))

// Click on Ch 01 image -> lightbox
const clicked = await page.evaluate(() => {
  const liCh1 = Array.from(document.querySelectorAll('li')).find((li) => /Asset-to-Vendor Network/.test(li.textContent || ''))
  const btn = liCh1?.querySelector('figure button, button')
  btn?.click()
  return !!btn
})
console.log('clicked-ch1=', clicked)
await new Promise((r) => setTimeout(r, 600))
const lb = await page.evaluate(() => {
  const dialog = document.querySelector('[role="dialog"]')
  if (!dialog) return null
  const img = dialog.querySelector('img')
  const figcap = dialog.querySelector('figcaption, .caption')
  return {
    src: img?.getAttribute('src'),
    hasFigcap: !!figcap,
  }
})
console.log('lightbox=', JSON.stringify(lb))

await browser.close()
