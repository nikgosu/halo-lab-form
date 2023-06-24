export interface City {
  id: string
  name: string
}

export interface Speciality {
  id: string
  name: string
  params?: SpecialityParams
}

export interface SpecialityParams {
  minAge?: number
  maxAge?: number
  gender?: string
}

export interface Doctor {
  id: string
  name: string
  surname: string
  specialityId: string
  isPediatrician: boolean
  cityId: string
}

export interface TodosState {
  cities: City[]
  specialities: Speciality[]
  doctors: Doctor[]
}
