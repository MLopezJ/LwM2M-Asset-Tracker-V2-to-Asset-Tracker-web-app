import { describe, it } from 'node:test'
import { Battery } from '@nordicsemiconductor/asset-tracker-cloud-docs/protocol'
import { validateWithTypebox } from './validateWithTypebox.js'
import assert from 'node:assert'

void describe('validateWithTypebox', () => {
	void it(`should return error when type of object does NOT follow the schema definition`, () => {
		const schema = Battery
		const object = {
			v: 123,
			ts: null,
		} as unknown as typeof schema
		const validatedObject = validateWithTypebox(object, schema)
		assert.equal('errors' in validatedObject, true)
	})

	void it(`should return value when type of object does follow the schema definition`, () => {
		const schema = Battery
		const object = {
			v: 123,
			ts: 1675874731000,
		} as unknown as typeof schema

		const validatedObject = validateWithTypebox(object, schema)
		assert.equal('valid' in validatedObject, true)
	})
})
