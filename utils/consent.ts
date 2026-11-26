export type ConsentFormat = 'text' | 'markdown'

export type ConsentRejection = 'CONSENT_TOO_LONG' | 'CONSENT_UNSAFE_CHARACTERS' | 'CONSENT_EMPTY'

/** `length` is the Unicode code-point count, so a page can show a counter. */
export type ConsentValidation =
  | { ok: true; length: number }
  | { ok: false; reason: ConsentRejection; length: number }

// Provisional: 2,000 limit pending Andy's confirmation; hidden-character block pending client confirmation
export const CONSENT_MAX_LENGTH = 2000

// Bidi controls, zero-width characters, C0 controls (except \n, \r, \t), DEL and C1 controls.
// No `g` flag, so `.test()` carries no state between calls.
export const UNSAFE_CONSENT_CHARACTERS =
  /[‪-‮⁦-⁩‎‏؜​-‍⁠﻿\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/

/**
 * Pure check of a consent message. Rejects, never truncates. The format does
 * not change the rules today; it is part of the signature so the ID App guard
 * and this one stay in step.
 */
export function validateConsentMessage(message: string, _format: ConsentFormat): ConsentValidation {
  const length = [...message].length
  if (message.trim() === '') return { ok: false, reason: 'CONSENT_EMPTY', length }
  if (length > CONSENT_MAX_LENGTH) return { ok: false, reason: 'CONSENT_TOO_LONG', length }
  if (UNSAFE_CONSENT_CHARACTERS.test(message)) return { ok: false, reason: 'CONSENT_UNSAFE_CHARACTERS', length }
  return { ok: true, length }
}

export const DEFAULT_CONSENT_MESSAGE =
  'I confirm with my Concordium ID App that I approve this request from 3P Account Wallet Demo.'

export const DEFAULT_MARKDOWN_CONSENT_MESSAGE = [
  '## Payment approval',
  '',
  'You are approving a payment of **£25.00** to *Example Shop*.',
  '',
  '- One-off payment',
  '- No recurring charges',
  '',
  '> You can cancel within 14 days.',
].join('\n')

/**
 * The message to show after the format changes. Only an empty message or the
 * untouched sample of the other format is swapped; typed text is kept.
 */
export function messageForFormat(message: string, format: ConsentFormat): string {
  const untouchedSample = format === 'markdown' ? DEFAULT_CONSENT_MESSAGE : DEFAULT_MARKDOWN_CONSENT_MESSAGE
  const sampleForFormat = format === 'markdown' ? DEFAULT_MARKDOWN_CONSENT_MESSAGE : DEFAULT_CONSENT_MESSAGE
  return message.trim() === '' || message === untouchedSample ? sampleForFormat : message
}
