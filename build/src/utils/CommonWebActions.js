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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonWebActions = void 0;
const fs_1 = __importDefault(require("fs"));
const CryptoJS = __importStar(require("crypto-js"));
const test_1 = require("@playwright/test");
const exceljs_1 = require("exceljs");
//import { Config } from '../config/config';
const EnvConfig_1 = require("c:/Apps/PLWR/playwright/config/EnvConfig");
const path_1 = __importDefault(require("path"));
const waitForElement = EnvConfig_1.EnvConfig.waitForElement;
class CommonWebActions {
    page;
    constructor(page) {
        this.page = page;
    }
    async navigateToURL(url) {
        await this.page.goto(url);
    }
    async decipherPassword() {
        const key = `SECRET`;
        return CryptoJS.AES.decrypt(EnvConfig_1.EnvConfig.password, key).toString(CryptoJS.enc.Utf8);
    }
    async waitForPageNavigation(event) {
        switch (event.toLowerCase()) {
            case `networkidle`:
                await this.page.waitForNavigation({ waitUntil: `networkidle`, timeout: waitForElement });
                break;
            case `load`:
                await this.page.waitForNavigation({ waitUntil: `load`, timeout: waitForElement });
                break;
            case `domcontentloaded`:
                await this.page.waitForNavigation({ waitUntil: `domcontentloaded`, timeout: waitForElement });
        }
    }
    async delay(time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }
    async clickElement(locator) {
        await this.page.click(locator);
    }
    async clickElementJS(locator) {
        await this.page.$eval(locator, (element) => element.click());
    }
    /*   async boundingBoxClickElement(locator: string): Promise<void> {
          await this.delay(1000);
          const elementHandle = await this.page.$(locator);
          const box = await elementHandle.boundingBox();
          await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      } */
    async enterElementText(locator, text) {
        await this.page.fill(locator, text);
    }
    async dragAndDrop(dragElementLocator, dropElementLocator) {
        await this.page.dragAndDrop(dragElementLocator, dropElementLocator);
    }
    async keyboardPress(key) {
        await this.page.keyboard.press(key);
    }
    async selectOptionFromDropdown(locator, option) {
        const selectDropDownLocator = await this.page.$(locator);
        selectDropDownLocator.type(option);
    }
    /*     async getTextFromWebElements(locator: string): Promise<string[]> {
            return this.page.$$eval(locator, elements => elements.map(item => item.textContent.trim()));
        } */
    async downloadFile(locator) {
        const [download] = await Promise.all([
            this.page.waitForEvent(`download`),
            this.page.click(locator)
        ]);
        await download.saveAs(path_1.default.join(__dirname, `../Downloads`, download.suggestedFilename()));
        return download.suggestedFilename();
    }
    async keyPress(locator, key) {
        this.page.press(locator, key);
    }
    async readDataFromExcel(fileName, sheetName, rowNum, cellNum) {
        const workbook = new exceljs_1.Workbook();
        return workbook.xlsx.readFile(`./Downloads/${fileName}`).then(function () {
            const sheet = workbook.getWorksheet(sheetName);
            return sheet.getRow(rowNum).getCell(cellNum).toString();
        });
    }
    async readValuesFromTextFile(filePath) {
        return fs_1.default.readFileSync(`${filePath}`, `utf-8`);
    }
    async writeDataIntoTextFile(filePath, data) {
        fs_1.default.writeFile(filePath, data, (error) => {
            if (error)
                throw error;
        });
    }
    async verifyElementText(locator, text) {
        const textValue = await this.page.textContent(locator);
        (0, test_1.expect)(textValue.trim()).toBe(text);
    }
    async verifyNewWindowUrlAndClick(context, newWindowLocator, urlText, clickOnNewWindowLocator) {
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            this.page.click(newWindowLocator)
        ]);
        await newPage.waitForLoadState();
        (0, test_1.expect)(newPage.url()).toContain(urlText);
        await newPage.click(clickOnNewWindowLocator);
        await newPage.close();
    }
    async verifyElementContainsText(locator, text) {
        await (0, test_1.expect)(this.page.locator(locator)).toContainText(text);
    }
    async verifyJSElementValue(locator, text) {
        const textValue = await this.page.$eval(locator, (element) => element.value);
        (0, test_1.expect)(textValue.trim()).toBe(text);
    }
    async verifyElementAttribute(locator, attribute, value) {
        const textValue = await this.page.getAttribute(locator, attribute);
        (0, test_1.expect)(textValue.trim()).toBe(value);
    }
    async verifyElementIsDisplayed(locator, errorMessage) {
        await this.page.waitForSelector(locator, { state: `visible`, timeout: waitForElement })
            .catch(() => { throw new Error(`${errorMessage}`); });
    }
    async expectToBeTrue(status, errorMessage) {
        (0, test_1.expect)(status, `${errorMessage}`).toBe(true);
    }
    async expectToBeValue(expectedValue, actualValue, errorMessage) {
        (0, test_1.expect)(expectedValue.trim(), `${errorMessage}`).toBe(actualValue);
    }
}
exports.CommonWebActions = CommonWebActions;
//# sourceMappingURL=CommonWebActions.js.map