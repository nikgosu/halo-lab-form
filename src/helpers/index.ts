import { SpecialityParams } from '../models'

export const checkIsAdultSpeciality = (isAdult: boolean, params: SpecialityParams | undefined) => {
  return (params?.minAge ?? 19) > 18 && (params?.maxAge ?? 19) >= 18 && isAdult
}

export const checkIsChildrenSpeciality = (isAdult: boolean, params: SpecialityParams | undefined) => {
  return (params?.minAge ?? 0) <= 18 && (params?.maxAge ?? 0) <= 18 && !isAdult
}

export const checkIsGenderEqual = (params: SpecialityParams | undefined, sex: string) => {
  return (params?.gender === sex || !params?.gender || !sex)
}
