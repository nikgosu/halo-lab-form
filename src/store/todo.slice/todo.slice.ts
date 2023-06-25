import { City, Doctor, Speciality, SpecialityParams, TodosState } from '../../models';
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

export const initialState: TodosState = {
  cities: [],
  specialities: [],
  doctors: [],
  filteredSpecialities: [],
  filteredDoctors: []
}

interface FilteredSpecialityPayload {
  birthdayDate: Date
  sex: string
}

const checkIsAdult = (birthdayDate: Date, maxAge: number) => {
  const today = new Date()
  let age = today.getFullYear() - birthdayDate.getFullYear()
  const m = today.getMonth() - birthdayDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthdayDate.getDate())) {
    age--
  }
  return age >= maxAge
}

const checkIsAdultSpeciality = (isAdult: boolean, params: SpecialityParams | undefined) => {
  return (params?.minAge ?? 19) > 18 && (params?.maxAge ?? 19) >= 18 && isAdult
}

const checkIsChildrenSpeciality = (isAdult: boolean, params: SpecialityParams | undefined) => {
  return (params?.minAge ?? 0) <= 18 && (params?.maxAge ?? 0) <= 18 && !isAdult
}

const checkIsGenderEqual = (params: SpecialityParams | undefined, sex: string) => {
  return (params?.gender === sex || !params?.gender || !sex)
}

export const TodoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setCities(state, action: PayloadAction<City[]>) {
      state.cities = action.payload
    },
    setSpecialities(state, action: PayloadAction<Speciality[]>) {
      state.specialities = action.payload
      state.filteredSpecialities = action.payload
    },
    setDoctors(state, action: PayloadAction<Doctor[]>) {
      state.doctors = action.payload
    },
    setFilteredSpecialities(state, action: PayloadAction<FilteredSpecialityPayload>) {
      const isAdult = checkIsAdult(action.payload.birthdayDate, 18)
      const filteredSpecialities: Speciality[] = []
      current(state.specialities).forEach(speciality => {
        if (checkIsChildrenSpeciality(isAdult, speciality.params) && checkIsGenderEqual(speciality.params, action.payload.sex)) {
          filteredSpecialities.push(speciality)
        }
        if (checkIsAdultSpeciality(isAdult, speciality.params) && checkIsGenderEqual(speciality.params, action.payload.sex)) {
          filteredSpecialities.push(speciality)
        }
      })
      state.filteredSpecialities = filteredSpecialities
    },
    setFilteredDoctors(state, action: PayloadAction<Doctor[]>) {
      state.filteredDoctors = action.payload
    }
  }
})

export const todoActions = TodoSlice.actions
export const todoReducer = TodoSlice.reducer
