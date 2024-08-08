import axios from "axios"

export const fetchInitialData = (userId: number) => {
  return axios.get(`http://127.0.0.1:8002/test/user_entry_check/${userId}`)
}

export const postData = (userId: number, coins: number, energy: number) => {
  return axios.post(`http://127.0.0.1:8002/test/user_exit/${userId}`, {
    "coins": coins,
    "energy": energy
  })
}

export const createSocket = (userId: number, path: string) => {
  const socket = new WebSocket(`ws://127.0.0.1:8002/ws/${path}/${userId}/`)
  return socket
}
