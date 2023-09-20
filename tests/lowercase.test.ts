import { RuleTester } from "eslint";
import { rules } from "../src/index.js";

const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
});

const CHECK_LOWERCASE = ["lowercase"];

const checksumedAddr = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
const lowercaseAddr = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
const errMessage = "unchecksumed address";

tester.run("addr-type-lowercase", rules["addr-type"], {
  valid: [
    // Literal
    `${lowercaseAddr}`,
    `const addr = '${lowercaseAddr}'`,
    `const addrs = ['${lowercaseAddr}', '${lowercaseAddr}']`,
    `const addrObj = { burnAddr: ${lowercaseAddr} }`,
  ].map((code) => ({
    code,
    options: CHECK_LOWERCASE,
  })),
  invalid: [
    // Literal
    {
      code: `'${checksumedAddr}'`,
      output: `'${lowercaseAddr}'`,
      errors: [errMessage],
    },
    {
      code: `const addr = '${checksumedAddr}'`,
      output: `const addr = '${lowercaseAddr}'`,
      errors: [errMessage],
    },
    {
      code: `const addrObj = { burnAddr: '${checksumedAddr}' }`,
      output: `const addrObj = { burnAddr: '${lowercaseAddr}' }`,
      errors: [errMessage],
    },
  ].map((c) => ({
    ...c,
    options: CHECK_LOWERCASE,
  })),
});
