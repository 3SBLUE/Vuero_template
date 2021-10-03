import axios, { AxiosInstance } from 'axios'
import { API_URL } from './config'

const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

/* eslint-disable */
class ApiService {
  query(resource: any, data: any): Promise<any> {
    return apiClient.get(API_URL + resource, data)
  }

  get(resource: any, id: any): Promise<any> {
    return apiClient.get(API_URL + `/${resource}/${id}`)
  }

  post(resource: any, data: any): Promise<any> {
    return apiClient.post(API_URL + `/${resource}`, data)
  }

  put(resource: any, id: any, data: any): Promise<any> {
    return apiClient.put(API_URL + `/${resource}/${id}`, data)
  }

  delete(resource: any, id: any): Promise<any> {
    return apiClient.delete(API_URL + `/${resource}/${id}`)
  }
}

export default new ApiService()
