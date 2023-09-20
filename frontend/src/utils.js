const getConfig = (headers) => ({
  headers: {
    Authorization: `Token ${localStorage.getItem('token')}`,
    ...headers,
  },
})

export const getToken = localStorage.getItem('token')

export default getConfig
