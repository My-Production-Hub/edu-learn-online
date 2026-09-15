/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './tests/**/*_test.js',

  output: './output',

  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'http://localhost:3000',
      show: false,
      windowSize: '1280x900',
      waitForTimeout: 30000,
      waitForAction: 1000,
      chromium: {
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu'
        ]
      }
    }
  },

  include: {
    I: './steps_file.js'
  },

  plugins: {
    screenshotOnFail: {
      enabled: true
    },
    retryFailedStep: {
      enabled: true,
      retries: 2
    }
  },

  name: 'automation-tests'
};

