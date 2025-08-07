"use server"
import urlJoin from 'url-join'
const BASE_URL = `${process.env.AUTH_URL}/login`;

export const getToken = async (tokenKey: string) => {
	const fullUrl = urlJoin(
		process.env.AUTH_URL as string,
		`Auth/qms/${tokenKey}`,
	)

	const res = await fetch(fullUrl, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
		},
	})

	return res
}
