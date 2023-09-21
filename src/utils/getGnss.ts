import {
	GNSS,
	type GNSSData,
	validateWithType,
} from '@nordicsemiconductor/asset-tracker-cloud-docs/protocol'
import { type Location_6 } from '@nordicsemiconductor/lwm2m-types'
import { TypeError, Warning } from '../converter.js'

/**
 * Takes object id 6 (location) from 'LwM2M Asset Tracker v2' and convert into 'gnss' object from 'nRF Asset Tracker Reported'
 *
 * @see https://github.com/MLopezJ/asset-tracker-cloud-coiote-azure-converter-js/blob/saga/documents/gnss.md
 */
export const getGnss = (
	location?: Location_6,
): { result: GNSSData } | { error: Error } | { warning: Warning } => {
	if (location === undefined)
		return {
			warning: new Warning({
				name: 'warning',
				message: 'GNSS object can not be created',
				description: 'Location (6) object is undefined',
			}),
		}

	const { 0: lat, 2: alt, 6: spd, 1: lng, 3: acc, 5: time } = location

	/**
	 * hdg from GNSS object is not provided.
	 *
	 * @see https://github.com/MLopezJ/asset-tracker-lwm2m-js/blob/saga/adr/009-nrf-asset-tracker-values-not-provided.md
	 */
	const object = {
		v: {
			lng,
			lat,
			acc,
			alt,
			spd,
		},
		ts: time * 1000,
	}

	const maybeValidGnss = validateWithType(GNSS)(object)
	if ('errors' in maybeValidGnss) {
		return {
			error: new TypeError({
				message: 'error validating type',
				description: maybeValidGnss.errors,
			}),
		}
	}

	return { result: maybeValidGnss }
}
