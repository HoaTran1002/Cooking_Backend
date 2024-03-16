import PartnerServices from './partner.service'
type services = 'partner'
class FactoryService {
  static instance(service: services, payload?: any) {
    switch (service) {
      case 'partner':
        return new PartnerServices(payload ? payload : {})
      default:
        break
    }
  }
}
export default FactoryService
