import { RuleTester } from "eslint";
import { rules } from "../src/index";

const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
});

const checksumedAddr = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
const unchecksumedAddr = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
const errMessage = "unchecksumed address";

tester.run("addr-type-checksum", rules["addr-type"], {
  valid: [
    // Literal
    `${checksumedAddr}`,
    `const addr = '${checksumedAddr}'`,
    `const addrs = ['${checksumedAddr}', '${checksumedAddr}']`,
    `const addrObj = { burnAddr: ${checksumedAddr} }`,
  ],
  invalid: [
    // Literal
    {
      code: `'${unchecksumedAddr}'`,
      output: `'${checksumedAddr}'`,
      errors: [errMessage],
    },
    {
      code: `const addr = '${unchecksumedAddr}'`,
      output: `const addr = '${checksumedAddr}'`,
      errors: [errMessage],
    },
    {
      code: `const addrObj = { burnAddr: '${unchecksumedAddr}' }`,
      output: `const addrObj = { burnAddr: '${checksumedAddr}' }`,
      errors: [errMessage],
    },
  ],
});
