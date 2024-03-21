export interface IInformationPosition {
  name: string
  description: string
}
export interface IRecruitment {
  title: string
  description: string
  recruitmentWorkingLocations: [string]
}
interface IFile {
  link: string
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
