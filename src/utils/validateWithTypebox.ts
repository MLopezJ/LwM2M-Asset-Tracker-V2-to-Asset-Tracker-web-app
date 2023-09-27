import type { TSchema } from '@sinclair/typebox'
import Ajv, { type ErrorObject } from 'ajv'

const ajv = new Ajv()
// see @https://github.com/sinclairzx81/typebox/issues/51
ajv.addKeyword('kind')
ajv.addKeyword('modifier')

export const validateWithTypebox = <T extends TSchema>(
	object: unknown,
	schema: T,
):
	| {
			errors: ErrorObject[]
	  }
	| {
			valid: unknown
	  } => {
	const v = ajv.compile(schema)
	const valid = v(object)
	if (valid !== true) {
		return {
			errors: v.errors as ErrorObject[],
		}
	}
	return { valid: object }
}
