# eslint-plugin-checksum

evm address lint rule

## Installation

```sh
pnpm add -D eslint-plugin-checksum eslint
```

It is also possible to install ESLint globally rather than locally.

## Configuration

Add "checksum" plugin to your config files.

```jsonc
{
  "plugins": ["checksum", ...others],
}
```

Enable or disable the rules

```jsonc
{
  "rules": {
    // default set
    "checksum/addr-type": "error",
    // or, specific use checksumed address
    "checksum/addr-type": ["error", "checksum"],
    // or, specific use lowercase address
    "checksum/addr-type": ["error", "lowercase"]
  }
}
```
