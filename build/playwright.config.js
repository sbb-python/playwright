"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const ENV = process.env.ENV;
console.log(ENV);
if (!ENV || ![`SIT`, `UAT`, `MS`].includes(ENV)) {
    console.log(`Please provide a correct environment value like "npx cross-env ENV=SIT OR UAT"`);
    process.exit();
}
const config = {
    testDir: './tests',
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    expect: {
        /**
         * Maximum time expect() should wait for the condition to be met.
         * For example in `await expect(locator).toHaveText();`
         */
        timeout: 5000
    },
    //Global Setup to run before all tests
    // globalSetup: `./global-setup`,
    //Global Teardown to run after all tests
    //globalTeardown: `./global-teardown`,
    //sets timeout for each test case
    timeout: 120000,
    //Reporters
    reporter: 'html',
    //reporter: [[`./CustomReporterConfig.ts`], [`experimental-allure-playwright`], [`html`, { outputFolder: 'html-report', open: 'never' }]],
    use: {
        actionTimeout: 0,
        trace: 'on-first-retry',
    },
    /* Configure projects for major browsers */
    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: {
                headless: false,
                channel: `chrome`,
                ...test_1.devices['Desktop Chrome'],
                //baseURL: EnvConfig[process.env.ENV],
            },
        },
    ]
};
/*
 projects: [
  {
    name: `Chrome`,
    use: {
      // Configure the browser to use.
      browserName: `chromium`,

      //Chrome Browser Config
      channel: `chrome`,

      //Picks Base Url based on User input
      baseURL: Config[process.env.ENV],

      //Browser Mode
      headless: true,

      //Browser height and width
      viewport: { width: 1500, height: 730 },
      ignoreHTTPSErrors: true,

      //Enable File Downloads in Chrome
      acceptDownloads: true,

      //Artifacts
      screenshot: `only-on-failure`,
      video: `retain-on-failure`,
      trace: `retain-on-failure`,

      //Slows down execution by ms
      launchOptions: {
        slowMo: 0
      }
    },
  },
  {
    name: `Chromium`,
    use: {
      browserName: `chromium`,
      baseURL: Config[process.env.ENV],
      headless: true,
      viewport: { width: 1500, height: 730 },
      ignoreHTTPSErrors: true,
      acceptDownloads: true,
      screenshot: `only-on-failure`,
      video: `retain-on-failure`,
      trace: `retain-on-failure`,
      launchOptions: {
        slowMo: 0
      }
    },
  },

    {
    name: `Edge`,
    use: {
      browserName: `chromium`,
      channel: `msedge`,
      baseURL: Config[process.env.ENV],
      headless: false,
      viewport: { width: 1500, height: 730 },
      ignoreHTTPSErrors: true,
      acceptDownloads: true,
      screenshot: `only-on-failure`,
      video: `retain-on-failure`,
      trace: `retain-on-failure`,
      launchOptions: {
        slowMo: 0
      }
    },
  },
      {
    name: `Device`,
    use: {
      ...devices[`Pixel 4a (5G)`],
      browserName: `chromium`,
      channel: `chrome`,
      baseURL: Config[process.env.ENV],
      headless: true,
      ignoreHTTPSErrors: true,
      acceptDownloads: true,
      screenshot: `only-on-failure`,
      video: `retain-on-failure`,
      trace: `retain-on-failure`,
      launchOptions: {
        slowMo: 0
      }
    },
  },
  {
    name: `DB`
  },
  {
    name: `API`,
    use: {
      baseURL: Config[process.env.ENV]
    }
  }
],
*/
exports.default = config;
//# sourceMappingURL=playwright.config.js.map