import {
	Battery,
	type BatteryData,
} from '@nordicsemiconductor/asset-tracker-cloud-docs/protocol'
import { Device_3_urn, type Device_3 } from '../schemas/index.js'
import { validateAgainstSchema } from './validateAgainstSchema.js'
import type { ValidationError } from './ValidationError.js'
import { UndefinedLwM2MObjectWarning } from './UndefinedLwM2MObjectWarning.js'

/**
 * Defines the result type of 'getBat' method, which will be one of the following options
 * - result: contains the validated bat object.
 * - error: contains an object indicating the object has not the expected format.
 * - warning: contains an object indicating that the LwM2M object for bat is undefined.
 */
type GetBatResult =
	| { result: BatteryData }
	| { error: ValidationError }
	| { warning: UndefinedLwM2MObjectWarning }

/**
 * Takes object id 3 (device) from 'LwM2M Asset Tracker v2' and convert into 'bat' object from 'nRF Asset Tracker Reported'
 * @see {@link ../../documents/battery.md}
 */
export const getBat = (device?: Device_3): GetBatResult => {
	if (device === undefined)
		return {
			warning: new UndefinedLwM2MObjectWarning({
				nRFAssetTrackerReportedId: 'bat',
				LwM2MObjectUrn: Device_3_urn,
			}),
		}

	/**
	 * First element selected when resource is multiple instance
	 */
	const defaultResource = 0
	const object = {
		v: device['7']?.[defaultResource],
		ts: getTime(device),
	}

	return validateAgainstSchema(object, Battery)
}

/**
 * The resource selected to report the timestamp value is 13.
 * Value is in seconds and it is multiplied to transform to milliseconds.
 * @see {@link ../../documents/battery.md}
 */
export const getTime = (device: Device_3): number | undefined =>
	device['13'] !== undefined ? device['13'] * 1000 : undefined
