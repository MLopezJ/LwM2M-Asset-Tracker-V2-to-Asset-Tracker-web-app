import { describe, it } from 'node:test'
import { Battery } from '@nordicsemiconductor/asset-tracker-cloud-docs/protocol'
import { validateWithType } from './validateWithType.js'
import assert from 'node:assert'

void describe('validateWithType', () => {
	void it(`should return error when type of object does NOT follow the schema definition`, () => {
		const schema = Battery
		const object = {
			v: 123,
			ts: null,
		} as unknown as typeof schema
		const validatedObject = validateWithType(schema)(object)
		assert.equal('errors' in validatedObject, true)
	})

	void it.only(`should return value when type of object does follow the schema definition`, () => {
		const schema = Battery
		const object = {
			v: 123,
			ts: 1675874731000,
		} as unknown as typeof schema

		const validatedObject = validateWithType(schema)(object)
		assert.equal('valid' in validatedObject, true)
	})
})
