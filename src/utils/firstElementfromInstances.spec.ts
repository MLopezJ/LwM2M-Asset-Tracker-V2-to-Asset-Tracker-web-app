import assert from 'node:assert'
import { describe, it } from 'node:test'
import type { Temperature_3303 } from 'src/schemas'
import {
	firstElementfromInstances,
	type Mutable,
} from './firstElementfromInstances.js'

void describe('firstElementfromInstances', () => {
	void it(`should pick first instance from list`, () => {
		const firstIsntance = {
			'5601': 27.18,
			'5602': 27.71,
			'5700': 27.18,
			'5701': 'Cel',
			'5518': 1675874731,
		}

		const temperature: Temperature_3303 = [
			firstIsntance,
			{
				'5601': 0,
				'5602': 0,
				'5700': 0,
				'5701': 'Cel',
				'5518': 1675874731,
			},
			{
				'5601': 0,
				'5602': 0,
				'5700': 0,
				'5701': 'Cel',
				'5518': 1675874731,
			},
		]
		//const result = firstElementfromInstances(temperature)
		const result = firstElementfromInstances(
			temperature as Mutable<Temperature_3303>,
		)
		assert.equal(result, firstIsntance)
		assert.equal(typeof firstIsntance, typeof result)
	})
})
