import { toChecksumAddress } from "@ethereumjs/util";

type Address = `0x${string}`;
const addressRegex = /^0x[a-fA-F0-9]{40}$/;

export function isAddress(address: string): address is Address {
  return addressRegex.test(address);
}

export function getAddress(
  address: string,
  type: "checksum" | "lowercase" = "checksum"
) {
  if (type === "checksum") return toChecksumAddress(address);
  if (type === "lowercase") return address.toLowerCase();

  return address;
}
