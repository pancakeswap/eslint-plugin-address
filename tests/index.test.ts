import { RuleTester } from "eslint";
import { rules } from "../lib/index.js";

const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
});

tester.run("require-checksum", rules["require-checksum"], {
  valid: [
    "0x0000000000000000000000000000000000000000",
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    "const addr = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'",
  ],
  invalid: [
    {
      code: "const addr = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'",
      output: "const addr = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'",
      errors: ["unchecksumed address"],
    },
  ],
});
