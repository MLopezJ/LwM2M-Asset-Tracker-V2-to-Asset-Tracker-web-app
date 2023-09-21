import {
	Environment,
	type EnvironmentData,
	validateWithType,
} from '@nordicsemiconductor/asset-tracker-cloud-docs/protocol'
import {
	Humidity_3304_urn,
	Pressure_3323_urn,
	Temperature_3303_urn,
	type Humidity_3304,
	type Pressure_3323,
	type Temperature_3303,
} from '@nordicsemiconductor/lwm2m-types'
import { TypeError, UndefinedLwM2MObjectWarning } from '../converter.js'

/**
 * Check and create the 'env' object, expected by nRF Asset Tracker
 * Takes objects id 3303 (temperature), 3304 (humidity) and 3323 (pressure) from
 * 'LwM2M Asset Tracker v2' and convert into 'env' object from 'nRF Asset Tracker Reported'
 *
 * @see https://github.com/MLopezJ/asset-tracker-cloud-coiote-azure-converter-js/blob/saga/documents/environment.md
 */
export const getEnv = ({
	temperature,
	humidity,
	pressure,
}: {
	temperature: Temperature_3303 | undefined
	humidity: Humidity_3304 | undefined
	pressure: Pressure_3323 | undefined
}):
	| { result: EnvironmentData }
	| { error: Error }
	| { warning: UndefinedLwM2MObjectWarning } => {
	if (temperature === undefined)
		return {
			warning: new UndefinedLwM2MObjectWarning({
				nRFAssetTrackerReportedId: 'env',
				LwM2MObjectUrn: Temperature_3303_urn,
			}),
		}

	if (humidity === undefined)
		return {
			warning: new UndefinedLwM2MObjectWarning({
				nRFAssetTrackerReportedId: 'env',
				LwM2MObjectUrn: Humidity_3304_urn,
			}),
		}

	if (pressure === undefined)
		return {
			warning: new UndefinedLwM2MObjectWarning({
				nRFAssetTrackerReportedId: 'env',
				LwM2MObjectUrn: Pressure_3323_urn,
			}),
		}

	/**
	 * First instance selected when object is multiple instance
	 *
	 * @see https://github.com/MLopezJ/asset-tracker-lwm2m-js/blob/saga/adr/004-instance-selected-when-multiple-instance.md
	 */
	const temp = temperature?.[0]?.['5700']
	const hum = humidity?.[0]?.['5700']
	const atmp = pressure?.[0]?.['5700']

	let time =
		temperature?.[0]?.['5518'] ??
		humidity?.[0]?.['5518'] ??
		pressure?.[0]?.['5518']

	if (time !== undefined) time = time * 1000

	const object = {
		v: {
			temp,
			hum,
			atmp,
		},
		ts: time,
	}

	const maybeValidEnvironment = validateWithType(Environment)(object)
	if ('errors' in maybeValidEnvironment) {
		return {
			error: new TypeError(maybeValidEnvironment.errors),
		}
	}

	return { result: maybeValidEnvironment }
}
