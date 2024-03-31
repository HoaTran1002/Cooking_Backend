import { Express } from 'express'
import tourRoutes from '~/routes/tour.route'
import newsRoutes from '~/routes/news.route'
import productRoutes from '~/routes/product.route'
import partnerRoutes from '~/routes/partner.route'
import informationPositionRecruitmentRoutes from '~/routes/InformationPositionRecruitment.route'
import categoryServicesCustomerRoutes from '~/routes/categoryServicesCustomer.route'
import { errorHandeler, notFound } from '~/middlewares/error.middlewear'
import informationBusiness from '~/routes/informationBusiness.route'
import termAndConditionRoutes from '~/routes/termAndCondition.route'
import servicesCustomerRoute from '~/routes/servicesCustomer.route'
import recruitmentBlogRoutes from '~/routes/recruitmentBlog.route'
import partnerProductRoutes from '~/routes/partnerProduct.route'
import candicateInforRoutes from '~/routes/candicateInfor.route'
import customerBlogRoutes from '~/routes/customerBlog.route'
import pageManageRoutes from '~/routes/pageManage.route'
import categoryRoutes from '~/routes/category.route'
import policyRoutes from '~/routes/policy.route'
import courseRoutes from '~/routes/course.route'
import chefRoutes from '~/routes/chef.route'
import authRoutes from '~/routes/auth.route'
import faqRoutes from '~/routes/faq.route'
// import accountRoutes from '~/routes/account.route'
// import upload from '~/routes/uploadToS3.route'
const useRoutes = (app: Express) => {
  app.use('/api/v1/informationPositionRecruitment', informationPositionRecruitmentRoutes)
  app.use('/api/v1/categoryServicesCustomer', categoryServicesCustomerRoutes)
  app.use('/api/v1/informationBusiness', informationBusiness)
  app.use('/api/v1/termAndCondition', termAndConditionRoutes)
  app.use('/api/v1/servicesCustomer', servicesCustomerRoute)
  app.use('/api/v1/recruitmentBlog', recruitmentBlogRoutes)
  app.use('/api/v1/candicateInfor', candicateInforRoutes)
  app.use('/api/v1/partnerProduct', partnerProductRoutes)
  app.use('/api/v1/customerBlog', customerBlogRoutes)
  app.use('/api/v1/pageManage', pageManageRoutes)
  app.use('/api/v1/category', categoryRoutes)
  app.use('/api/v1/product', productRoutes)
  app.use('/api/v1/partner', partnerRoutes)
  app.use('/api/v1/policy', policyRoutes)
  app.use('/api/v1/course', courseRoutes)
  app.use('/api/v1/auth', authRoutes)
  app.use('/api/v1/tour', tourRoutes)
  app.use('/api/v1/news', newsRoutes)
  app.use('/api/v1/chef', chefRoutes)
  app.use('/api/v1/faq', faqRoutes)
  // app.use('/api/v1/account', accountRoutes)
  // app.use('/api/v1/upload', upload)
  app.use(errorHandeler)
  app.use(notFound)
}
export default useRoutes
