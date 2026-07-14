const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));
  
  await page.goto('http://127.0.0.1:5180/');
  
  console.log('Navigated to page');
  
  // Fill the form
  await page.type('input[name="name"]', 'Test Name');
  await page.type('input[name="email"]', 'test@test.com');
  await page.type('input[name="subject"]', 'Test Subject');
  await page.type('textarea[name="message"]', 'This is a test message that is long enough.');
  
  console.log('Filled form');
  
  // click button
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.textContent.includes('Send Message'));
    if (btn) btn.click();
  });
  console.log('Clicked button');
  
  await new Promise(resolve => setTimeout(resolve, 3000));
  await browser.close();
})();
