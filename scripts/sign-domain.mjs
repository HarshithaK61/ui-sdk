#!/usr/bin/env node
/**
 * Writes the Verified Domain `.well-known` record for this site.
 *
 *   CCD_SIGNING_KEY=<hex ed25519 sign key> node scripts/sign-domain.mjs \
 *     --domain ui-sdk.netlify.app \
 *     --address <canonical base58 address> \
 *     [--network testnet|mainnet|<genesis hash>] [--cred 0] [--key 0]
 *
 *   # or sign with a Browser Wallet / concordium-client export instead of a raw key:
 *   node scripts/sign-domain.mjs --wallet-file ./account.export --domain … --address …
 *
 *   # --stdout prints the record instead of writing it into public/ (e.g. when
 *   # running on the server that holds the key; copy back only the JSON):
 *   node sign-domain.mjs --stdout --domain … --address … > record.json
 *
 *   # --dns prints the DNS TXT record (name and value) for the canonical
 *   # address instead of writing the file:
 *   node scripts/sign-domain.mjs --dns --domain … --address …
 *
 * The address must be the CANONICAL address of the account that anchors this
 * site's verification requests. The key never leaves this machine; do not
 * commit it. Output: public/.well-known/ccddvr/<network_ref>_<address>.json
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import {
  AccountAddress,
  buildAccountSigner,
  parseWallet,
  signMessage,
} from '@concordium/web-sdk/types'

// TODO(DNS-DOC): provisional until technical doc v0.2, must match id-app buildDnsRecordName/defaultDnsTxtValidator
const BASE32_ALPHABET = 'abcdefghijklmnopqrstuvwxyz234567'

/** RFC 4648 Base32, lowercase alphabet, no padding (same as id-app base32LowerNoPad). */
function base32LowerNoPad(bytes) {
  let out = ''
  let buffer = 0
  let bits = 0
  for (const byte of bytes) {
    buffer = (buffer << 8) | byte
    bits += 8
    while (bits >= 5) {
      out += BASE32_ALPHABET[(buffer >>> (bits - 5)) & 31]
      bits -= 5
    }
    buffer &= (1 << bits) - 1
  }
  if (bits > 0) out += BASE32_ALPHABET[(buffer << (5 - bits)) & 31]
  return out
}

const GENESIS = {
  mainnet: '9dd9ca4d19e9393877d2c44b70f89acbfc0883c2243e5eeaecc0d1cd0503f478',
  testnet: '4221332d34e1694168c2a0c0b3fd0f273809612cb13d000d5c2e00e85f50f796',
}

const { values } = parseArgs({
  options: {
    domain: { type: 'string' },
    address: { type: 'string' },
    network: { type: 'string', default: 'testnet' },
    cred: { type: 'string', default: '0' },
    key: { type: 'string', default: '0' },
    'wallet-file': { type: 'string' },
    stdout: { type: 'boolean', default: false },
    dns: { type: 'boolean', default: false },
  },
})

const fail = (msg) => {
  console.error(`sign-domain: ${msg}`)
  process.exit(1)
}

/** Same normalisation IDApp applies before verifying. */
function normaliseDomain(input) {
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(input) ? input : `https://${input}`
  return new URL(withScheme).hostname.toLowerCase().replace(/\.+$/, '')
}

if (!values.domain) fail('--domain is required')
if (!values.address) fail('--address is required')

const genesisHash = GENESIS[values.network.toLowerCase()] ?? values.network
if (!/^[0-9a-f]{64}$/i.test(genesisHash)) fail('--network must be testnet, mainnet or a genesis hash')

const domain = normaliseDomain(values.domain)
const address = AccountAddress.fromBase58(values.address)
const base58 = AccountAddress.toBase58(address)
const networkRef = genesisHash.slice(0, 32).toLowerCase()

let signer
if (values['wallet-file']) {
  let wallet
  try {
    wallet = parseWallet(readFileSync(values['wallet-file'], 'utf8'))
  } catch (error) {
    fail(`could not read wallet export: ${error.message}`)
  }
  if (wallet.value.address !== base58) {
    fail(`wallet export is for ${wallet.value.address}, not ${base58}`)
  }
  signer = buildAccountSigner(wallet)
} else {
  // Tolerate surrounding whitespace and a 0x prefix from copy/paste.
  const signKey = (process.env.CCD_SIGNING_KEY || '').trim().replace(/^0x/i, '')
  if (!signKey) fail('set CCD_SIGNING_KEY or pass --wallet-file')
  if (!/^[0-9a-fA-F]{64}$/.test(signKey)) {
    fail(`CCD_SIGNING_KEY must be 64 hex characters (got ${signKey.length} characters)`)
  }
  signer = buildAccountSigner({ [values.cred]: { [values.key]: signKey } })
}
const signatureMap = await signMessage(address, domain, signer)

const record = {
  type: 'ccddvr',
  version: 1,
  address: `ccd:${networkRef}:${base58}`,
  signature: Buffer.from(JSON.stringify(signatureMap), 'utf8').toString('base64'),
}

if (values.dns) {
  // TODO(DNS-DOC): provisional until technical doc v0.2, must match id-app buildDnsRecordName/defaultDnsTxtValidator
  const name = `_ccddvr.${base32LowerNoPad(AccountAddress.toBuffer(address))}.${networkRef}.${domain}`
  console.log(`name:  ${name}`)
  console.log('type:  TXT')
  console.log(`value: ${record.signature}`)
  if (record.signature.length > 255) {
    console.error('sign-domain: value exceeds 255 characters; split it into several quoted strings at your DNS host')
  }
  process.exit(0)
}

if (values.stdout) {
  process.stdout.write(`${JSON.stringify(record, null, 2)}\n`)
  console.error(`Signed "${domain}". Save as ${networkRef}_${base58}.json`)
  process.exit(0)
}

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
// TODO(Q1): file name pending confirmation; must match IDApp's wellKnownUrl().
const out = join(root, 'public', '.well-known', 'ccddvr', `${networkRef}_${base58}.json`)
mkdirSync(dirname(out), { recursive: true })
writeFileSync(out, `${JSON.stringify(record, null, 2)}\n`)
console.log(`Signed "${domain}" → ${out}`)
