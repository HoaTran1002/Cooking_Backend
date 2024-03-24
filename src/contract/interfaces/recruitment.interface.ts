export interface IInformationPosition {
  name: string
  description: string
}
export interface IRecruitmentBlog {
  title: string
  description: string
  recruitmentWorkingLocations: [string]
}
export interface IFile {
  url: string
}
export interface ICandicateInfor {
  fisrtName: string
  lastName: string
  email: string
  positionApply: string
  startDate: string
  minSalary: string
  expectedSalary: string
  file_cv: IFile
}
