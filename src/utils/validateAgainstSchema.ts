import { TypeError } from '../converter.js'
import type { Static, TSchema } from '@sinclair/typebox'
import { validateWithTypebox } from './validateWithTypebox.js'

export const validateAgainstSchema = <T extends TSchema>(
	object: Record<string, unknown>,
	schema: T,
): { result: Static<typeof schema> } | { error: TypeError } => {
	const validatedObject = validateWithTypebox(object, schema)
	if ('errors' in validatedObject) {
		return {
			error: new TypeError(validatedObject.errors),
		}
	}

	return { result: validatedObject.valid }
}
