import { type Rule } from "eslint";
import { type Node } from "estree";
import { getAddress, isAddress } from "./utils";

const ruleFixer = (node: Node, replacement: string): Rule.ReportFixer => {
  return (fixer) => {
    return fixer.replaceTextRange(
      [node.range![0] + 1, node.range![1] - 1],
      replacement
    );
  };
};

export const rules: Record<string, Rule.RuleModule> = {
  "addr-type": {
    meta: {
      docs: {
        description: "docs.description",
      },
      fixable: "code",
      messages: {
        unexpected: "'{{origin}}' is not a checksumed address",
      },
      schema: [
        {
          enum: ["checksum", "lowercase"],
        },
      ],
    },
    create: (context) => {
      const checkOption = context.options?.[0] ?? "checksum";
      function verifyChecksumAddress(node: Node) {
        switch (node.type) {
          case "Literal": {
            // ignore other type of value, e.g BigInt, number, RegExp
            if (typeof node.value === "string" && isAddress(node.value)) {
              const checkedAddr = getAddress(node.value, checkOption);
              if (checkedAddr !== node.value) {
                context.report({
                  node,
                  message: "unchecksumed address",
                  data: {
                    origin: node.value,
                    expected: checkedAddr,
                  },
                  fix: ruleFixer(node, checkedAddr),
                });
              }
            }
            return;
          }
          default:
        }
      }

      const visitor: Rule.RuleListener = {
        "Literal:exit": verifyChecksumAddress,
      };

      return visitor;
    },
  },
};
