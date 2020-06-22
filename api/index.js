import http from './request.js'
export const get = (url, params = {}) => {
	return http.get(url, { params })
}
export const post = (url, data = {}) => {
	return http.get(url, data)
}