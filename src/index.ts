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
  "require-checksum": {
    meta: {
      docs: {
        description: "docs.description",
      },
      fixable: "code",
      messages: {
        unexpected: "'{{origin}}' is not a checksumed address",
      },
    },
    create: (context) => {
      function verifyChecksumAddress(node: Node) {
        switch (node.type) {
          case "Literal": {
            // ignore other type of value, e.g BigInt, number, RegExp
            if (typeof node.value === "string" && isAddress(node.value)) {
              console.log("literal", node.value);
              // @todo implement different verify logic according to rules
              const checksumedAddr = getAddress(node.value);
              if (checksumedAddr !== node.value) {
                context.report({
                  node,
                  message: "unchecksumed address",
                  data: {
                    origin: node.value,
                    expected: checksumedAddr,
                  },
                  fix: ruleFixer(node, checksumedAddr),
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
