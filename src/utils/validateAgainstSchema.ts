import { TypeError } from '../converter.js'
import type { Static, TSchema } from '@sinclair/typebox'
import { validateWithType } from './validateWithType.js'

export const validateAgainstSchema = <T extends TSchema>(
	object: Record<string, unknown>,
	schema: T,
): { result: Static<typeof schema> } | { error: TypeError } => {
	const validatedObject = validateWithType(object, schema)
	if ('errors' in validatedObject) {
		return {
			error: new TypeError(validatedObject.errors),
		}
	}

	return { result: validatedObject.valid }
}
