import { City, Doctor, Sex, Speciality, TodosState } from '../../models';
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { checkIsAdultSpeciality, checkIsChildrenSpeciality, checkIsGenderEqual } from '../../helpers'

export const initialState: TodosState = {
  cities: [],
  specialities: [],
  doctors: [],
  filteredSpecialities: [],
  filteredDoctors: []
}

interface FilteredSpecialityPayload {
  birthdayDate: Date
  sex: Sex
}

interface FilteredDoctorsPayload {
  birthdayDate: Date
  sex: Sex
  city: City
  speciality: Speciality
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
      state.filteredDoctors = action.payload
    },
    setFilteredSpecialities(state, action: PayloadAction<FilteredSpecialityPayload>) {
      const isAdult = checkIsAdult(action.payload.birthdayDate, 18)

      // Inside specialities response Urologist doesn't have gender key, so I decided to left him

      state.filteredSpecialities = current(state.specialities).filter(speciality =>
        checkIsChildrenSpeciality(isAdult, speciality.params) && checkIsGenderEqual(speciality.params, action.payload.sex.name) ||
        checkIsAdultSpeciality(isAdult, speciality.params) && checkIsGenderEqual(speciality.params, action.payload.sex.name)
      )
    },
    setFilteredDoctors(state, action: PayloadAction<FilteredDoctorsPayload>) {

      const isAdult = checkIsAdult(action.payload.birthdayDate, 18)

      const currentCity = current(state.cities).find(city => city.id === action.payload.city.id)
      const currentSpeciality = current(state.specialities).find(speciality => speciality.id === action.payload.speciality.id)

      state.filteredDoctors = current(state.doctors).filter(doctor => {
        const isCityId = (currentCity?.id ? doctor.cityId === currentCity?.id : true)
        const isSpecialityId = (currentSpeciality ? doctor.specialityId === currentSpeciality.id : true)

        return doctor.isPediatrician && !isAdult && isCityId && isSpecialityId || !doctor.isPediatrician && isAdult && isCityId && isSpecialityId
      })
    }
  }
})

export const todoActions = TodoSlice.actions
export const todoReducer = TodoSlice.reducer
