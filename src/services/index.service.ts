import PartnerServices from './partner.service'
import CustomerBlog from './customerBlogServices.service'
import { IPartner } from '~/contract/interfaces/partner.interface'
type services = 'partner' | 'customerBlog'
class FactoryService {
  static instance<T>(service: services, payload?: T) {
    switch (service) {
      case 'partner':
        return new PartnerServices(payload as IPartner)
      case 'customerBlog':
        return new CustomerBlog(payload as CustomerBlog)
      default:
        throw new Error('not foud option services')
    }
  }
}
export default FactoryService
