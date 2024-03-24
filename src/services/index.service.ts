import PartnerServices from './partner.service'
import CustomerBlog from './customerBlogServices.service'
import { IPartner } from '~/contract/interfaces/partner.interface'
import { ICategoryServices, ICustomer, IServiceCustomer } from '~/contract/interfaces/customer.interface'
import CategoryServicesCustomer from './categoryServicesCustomer.service'
import ServicesCustomer from './serviceCustomer.service'
import CadicateInfor from './candicateInfor.service'
import { ICandicateInfor, IInformationPosition } from '~/contract/interfaces/recruitment.interface'
import InformationPopsitionRecruitment from './informationPositionRecruitment.service'
type services =
  | 'partner'
  | 'customerBlog'
  | 'categoryServiceCategory'
  | 'ServiceCustomer'
  | 'CandicateInfor'
  | 'InformationPopsitionRecruitment'
class FactoryService {
  static instance<T>(service: services, payload?: T) {
    switch (service) {
      case 'partner':
        return new PartnerServices(payload as IPartner)
      case 'customerBlog':
        return new CustomerBlog(payload as ICustomer)
      case 'categoryServiceCategory':
        return new CategoryServicesCustomer(payload as ICategoryServices)
      case 'ServiceCustomer':
        return new ServicesCustomer(payload as IServiceCustomer)
      case 'CandicateInfor':
        return new CadicateInfor(payload as ICandicateInfor)
      case 'InformationPopsitionRecruitment':
        return new InformationPopsitionRecruitment(payload as IInformationPosition)
      default:
        throw new Error('not foud option services')
    }
  }
}
export default FactoryService
