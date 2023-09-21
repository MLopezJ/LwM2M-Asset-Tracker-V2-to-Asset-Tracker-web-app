import {
	Battery,
	type BatteryData,
	validateWithType,
} from '@nordicsemiconductor/asset-tracker-cloud-docs/protocol'
import { Device_3_urn, type Device_3 } from '../schemas/index.js'
import { TypeError, UndefinedLwM2MObjectWarning } from '../converter.js'
import type { Static, TSchema } from '@sinclair/typebox'

/**
 * Takes object id 3 (device) from 'LwM2M Asset Tracker v2' and convert into 'bat' object from 'nRF Asset Tracker Reported'
 *
 * @see https://github.com/MLopezJ/asset-tracker-cloud-coiote-azure-converter-js/blob/saga/documents/battery.md
 */
export const getBat = (
	device?: Device_3,
):
	| { result: BatteryData }
	| { error: TypeError }
	| { warning: UndefinedLwM2MObjectWarning } => {
	if (device === undefined)
		return {
			warning: new UndefinedLwM2MObjectWarning({
				nRFAssetTrackerReportedId: 'bat',
				LwM2MObjectUrn: Device_3_urn,
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

	return checkResult(Battery, object)
}

/**
 * Work in progress
 * 
 * Make a result checker
 */
export const checkResult = <T extends TSchema>(
	schema: T,
	object: Record<string, unknown>,
): { result: Static<typeof schema> } | { error: TypeError } => {
	const maybeValidBat = validateWithType(schema)(object)
	if ('errors' in maybeValidBat) {
		return {
			error: new TypeError(maybeValidBat.errors),
		}
	}

	return { result: maybeValidBat }
}
