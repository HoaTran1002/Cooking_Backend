interface IInformationPosition {
  name: string
  description: string
}
export interface IRecruitment {
  description: string
  informationList: [IInformationPosition]
  recruitmentWorkingLocations: [string]
}
