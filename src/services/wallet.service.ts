import apiService from './api.service'

class WalletService {
  addMonitor(data: any) {
    return apiService.post('monitor/new', data)
  }
}

export default new WalletService()
