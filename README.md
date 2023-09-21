# eslint-plugin-address

![npm](https://img.shields.io/npm/v/eslint-plugin-address)
![GitHub](https://img.shields.io/github/license/pancakeswap/eslint-plugin-address)
![npm](https://img.shields.io/npm/dm/eslint-plugin-address)

evm address lint rule

## Installation

```sh
pnpm add -D eslint-plugin-address eslint
```

It is also possible to install ESLint globally rather than locally.

## Configuration

Add "address" plugin to your config files.

```jsonc
{
  "plugins": ["address", ...others],
}
```

Enable or disable the rules

```jsonc
{
  "rules": {
    // default set
    "address/addr-type": "error",
    // or, specific use checksumed address
    "address/addr-type": ["error", "checksum"],
    // or, specific use lowercase address
    "address/addr-type": ["error", "lowercase"]
  }
}
```
