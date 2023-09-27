import { validateWithType } from '@nordicsemiconductor/asset-tracker-cloud-docs/protocol'
import { TypeError } from '../converter.js'
import type { Static, TSchema } from '@sinclair/typebox'

export const validateAgainstSchema = <T extends TSchema>(
	object: Record<string, unknown>,
	schema: T,
): { result: Static<typeof schema> } | { error: TypeError } => {
	const validatedObject = validateWithType(schema)(object)
	if ('errors' in validatedObject) {
		return {
			error: new TypeError(validatedObject.errors),
		}
	}

	return { result: validatedObject }
}
