import puppeteer from 'puppeteer'
import { captureErrors } from '../../helpers/puppeteer'
import { statSync } from 'fs'
import { join } from 'path'

const local = process.env.LOCAL === 'true'
const baseURL = local
  ? 'http://localhost:3000'
  : 'https://platform-xdn-integration-tests-razzle.layer0.link'

describe('deployment', () => {
  let browser, errors, page

  beforeAll(async () => {
    browser = await puppeteer.launch()
  })

  beforeEach(async () => {
    const context = await browser.createIncognitoBrowserContext()
    page = await context.newPage()
    errors = await captureErrors(page)
  })

  afterEach(() => {
    expect(errors).toEqual([])
  })

  afterAll(async () => {
    await browser.close()
  })

  it('should render the homepage', async () => {
    const response = await page.goto(baseURL)
    expect(response.status()).toBe(200)
    expect(await page.evaluate(() => document.querySelector('h2').textContent)).toBe(
      'Welcome to Razzle'
    )
  })

  it('should support public assets', async () => {
    const response = await page.goto([baseURL, 'test.html'].join('/'))
    expect(response.status()).toBe(200)
    expect(await page.evaluate(() => document.querySelector('h1').textContent)).toBe('Hello World!')
  })

  it('should produce a router bundle less than 200KB in size', () => {
    const { size } = statSync(join(__dirname, '..', '.layer0', 'lambda', 'routes.js'))
    expect(size).toBeLessThan(200000)
  })
})
