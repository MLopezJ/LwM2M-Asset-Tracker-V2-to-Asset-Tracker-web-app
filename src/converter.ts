/**
 * convert LwM2M Asset Tracker v2 format into Asset Tracker Web App format
 */
export const converter = (input: unknown): any => {
	console.log(input)
	return {
		bat: {
			v: 2754,
			ts: 1563968747123,
		},
		env: {
			v: {
				temp: 23.6,
				hum: 50.5,
				atmp: 100.36,
			},
			ts: 1563968743666,
		},
		gnss: {
			v: {
				lng: 10.436642,
				lat: 63.421133,
				acc: 24.798573,
				alt: 170.528305,
				spd: 0.579327,
				hdg: 0, // ***** origin missing *****
			},
			ts: 1563968752991,
		},
		cfg: {
			loct: 60,
			act: false,
			actwt: 60,
			mvres: 60,
			mvt: 3600,
			accath: 10.5,
			accith: 5.2,
			accito: 1.7,
			nod: [],
		},
		dev: {
			v: {
				imei: '352656106111232',
				iccid: '0000000000000000000', // ***** origin missing *****
				modV: 'mfw_nrf9160_1.0.0',
				brdV: 'thingy91_nrf9160',
			},
			ts: 1563968743666,
		},
		roam: {
			v: {
				band: 3, // ***** origin missing *****
				nw: 'NB-IoT',
				rsrp: -97,
				area: 12,
				mccmnc: 24202,
				cell: 33703719,
				ip: '10.81.183.99',
				eest: 5, // ***** origin missing *****
			},
			ts: 1563968743666,
		},
	}
}
