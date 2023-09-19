import { type Rule } from "eslint";
import { type VariableDeclarator, type Node } from "estree";
import { isAddress, getAddress } from "viem";

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
        unexpected: "'{{origin}}' is not a checksummed address",
      },
    },
    create: (context) => {
      function verifyChecksumAddress(node: VariableDeclarator) {
        if (
          node.init?.type === "Literal" &&
          typeof node.init.value === "string"
        ) {
          if (
            isAddress(node.init.value) &&
            getAddress(node.init.value) !== node.init.value
          ) {
            context.report({
              node,
              message: `unchecksumed address`,
              data: {
                raw: node.init.value,
                correct: getAddress(node.init.value),
              },
              fix: ruleFixer(node.init, getAddress(node.init.value)),
            });
          }
        }
      }

      const visitor: Rule.RuleListener = {
        "VariableDeclarator:exit": verifyChecksumAddress,
      };

      return visitor;
    },
  },
};
