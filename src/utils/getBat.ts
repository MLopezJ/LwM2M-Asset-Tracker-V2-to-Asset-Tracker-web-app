import {
	Battery,
	type BatteryData,
	validateWithType,
} from '@nordicsemiconductor/asset-tracker-cloud-docs/protocol'
import { type Device_3 } from '@nordicsemiconductor/lwm2m-types'
import { TypeError, Warning } from '../converter.js'

/**
 * Takes object id 3 (device) from 'LwM2M Asset Tracker v2' and convert into 'bat' object from 'nRF Asset Tracker Reported'
 *
 * @see https://github.com/MLopezJ/asset-tracker-cloud-coiote-azure-converter-js/blob/saga/documents/battery.md
 */
export const getBat = (
	device?: Device_3,
): { result: BatteryData } | { error: Error } | { warning: Warning } => {
	if (device === undefined)
		return {
			warning: new Warning({
				reportedId: 'bat',
				LwM2M: 'Device (3)',
			}),
		}

	/**
	 * First element of resource selected
	 *
	 * @see https://github.com/MLopezJ/asset-tracker-lwm2m-js/blob/saga/adr/005-element-selected-when-multiple-resource.md
	 */
	const value = device['7']?.[0]
	const time = device['13'] !== undefined ? device['13'] * 1000 : undefined

	const object = {
		v: value,
		ts: time,
	}

	const maybeValidBat = validateWithType(Battery)(object)
	if ('errors' in maybeValidBat) {
		return {
			error: new TypeError(maybeValidBat.errors),
		}
	}

	return { result: maybeValidBat }
}
