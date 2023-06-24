import { City, Doctor, Speciality, TodosState } from '../../models';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const initialState: TodosState = {
  cities: [],
  specialities: [],
  doctors: []
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
    },
    setDoctors(state, action: PayloadAction<Doctor[]>) {
      state.doctors = action.payload
    }
  }
})

export const todoActions = TodoSlice.actions
export const todoReducer = TodoSlice.reducer
