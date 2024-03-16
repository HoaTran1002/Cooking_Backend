import { IImage } from './course.interface'

export type TypeRoles = 'ADMIN' | 'STUDENT'
export type TypePermission = 'ALL' | 'EDIT' | 'READ' | 'DELETE' | 'CREATE'
export interface IProfile {
  fullName?: string
  birthday?: string
  address?: string
  gmail?: string
  phoneNumber?: string
  gender?: string
  avatar?: IImage
}

export interface IAccount extends IProfile {
  userName?: string
  password: string
  role?: TypeRoles
  Permission?: TypePermission
}
