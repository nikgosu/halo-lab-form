import {todoActions} from "../store/todo.slice/todo.slice";
import {bindActionCreators} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

const actions = {
  ...todoActions
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}