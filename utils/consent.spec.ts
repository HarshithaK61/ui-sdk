import { describe, expect, it } from 'vitest'
import {
  CONSENT_MAX_LENGTH,
  DEFAULT_CONSENT_MESSAGE,
  DEFAULT_MARKDOWN_CONSENT_MESSAGE,
  messageForFormat,
  UNSAFE_CONSENT_CHARACTERS,
  validateConsentMessage,
  type ConsentFormat,
} from './consent'

const formats: ConsentFormat[] = ['text', 'markdown']

describe.each(formats)('validateConsentMessage (%s)', (format) => {
  it('accepts a message of exactly the limit', () => {
    expect(validateConsentMessage('a'.repeat(2000), format)).toEqual({ ok: true, length: 2000 })
  })

  it('rejects a message one character over the limit without truncating', () => {
    expect(validateConsentMessage('a'.repeat(2001), format)).toEqual({
      ok: false,
      reason: 'CONSENT_TOO_LONG',
      length: 2001,
    })
  })

  it('rejects a right-to-left override (U+202E)', () => {
    expect(validateConsentMessage('pay \u202Eevil', format)).toMatchObject({
      ok: false,
      reason: 'CONSENT_UNSAFE_CHARACTERS',
    })
  })

  it('rejects a zero-width space (U+200B)', () => {
    expect(validateConsentMessage('ab\u200Bc', format)).toMatchObject({
      ok: false,
      reason: 'CONSENT_UNSAFE_CHARACTERS',
    })
  })

  it('accepts line breaks and tabs', () => {
    expect(validateConsentMessage('one\ntwo\r\nthree\tfour', format)).toMatchObject({ ok: true })
  })

  it('counts an emoji as one character', () => {
    expect(validateConsentMessage('😀', format)).toEqual({ ok: true, length: 1 })
  })

  it('accepts a message of 2,000 emoji although each is two UTF-16 units', () => {
    expect(validateConsentMessage('😀'.repeat(2000), format)).toMatchObject({ ok: true })
  })

  it('rejects an empty or whitespace-only message', () => {
    expect(validateConsentMessage('  \n ', format)).toEqual({
      ok: false,
      reason: 'CONSENT_EMPTY',
      length: 4,
    })
  })
})

describe('CONSENT_MAX_LENGTH', () => {
  it('is 2000', () => {
    expect(CONSENT_MAX_LENGTH).toBe(2000)
  })
})

describe('UNSAFE_CONSENT_CHARACTERS', () => {
  it.each([
    ['U+202A', '\u202A'], ['U+202E', '\u202E'], ['U+2066', '\u2066'], ['U+2069', '\u2069'],
    ['U+200E', '\u200E'], ['U+200F', '\u200F'], ['U+061C', '\u061C'],
    ['U+200B', '\u200B'], ['U+200D', '\u200D'], ['U+2060', '\u2060'], ['U+FEFF', '\uFEFF'],
    ['U+0000', '\u0000'], ['U+001F', '\u001F'], ['U+007F', '\u007F'], ['U+0080', '\u0080'], ['U+009F', '\u009F'],
  ])('matches %s', (_name, char) => {
    expect(UNSAFE_CONSENT_CHARACTERS.test(char)).toBe(true)
  })

  it.each([['LF', '\n'], ['CR', '\r'], ['TAB', '\t'], ['space', ' '], ['U+00A0', '\u00A0']])(
    'does not match %s',
    (_name, char) => {
      expect(UNSAFE_CONSENT_CHARACTERS.test(char)).toBe(false)
    },
  )
})

describe('messageForFormat', () => {
  it('swaps the untouched plain default for the markdown sample', () => {
    expect(messageForFormat(DEFAULT_CONSENT_MESSAGE, 'markdown')).toBe(DEFAULT_MARKDOWN_CONSENT_MESSAGE)
  })

  it('fills an empty message with the markdown sample', () => {
    expect(messageForFormat('  ', 'markdown')).toBe(DEFAULT_MARKDOWN_CONSENT_MESSAGE)
  })

  it('restores the plain default from the untouched markdown sample', () => {
    expect(messageForFormat(DEFAULT_MARKDOWN_CONSENT_MESSAGE, 'text')).toBe(DEFAULT_CONSENT_MESSAGE)
  })

  it('never overwrites typed text', () => {
    expect(messageForFormat('My own words', 'markdown')).toBe('My own words')
    expect(messageForFormat('My own words', 'text')).toBe('My own words')
  })

  it('leaves the plain default alone when switching to text', () => {
    expect(messageForFormat(DEFAULT_CONSENT_MESSAGE, 'text')).toBe(DEFAULT_CONSENT_MESSAGE)
  })

  it('has the exact markdown sample with no trailing spaces', () => {
    expect(DEFAULT_MARKDOWN_CONSENT_MESSAGE).toBe(
      '## Payment approval\n\nYou are approving a payment of **£25.00** to *Example Shop*.\n\n- One-off payment\n- No recurring charges\n\n> You can cancel within 14 days.',
    )
  })
})
