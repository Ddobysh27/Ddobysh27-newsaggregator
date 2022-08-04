import { Dispatch } from "@reduxjs/toolkit"
import api from "../../api"
import { ILoginRequest } from "../../api/auth/types"
import { loginStart, loginSucess, loginFailure, logoutSuccess } from "./authReducer"
import { history } from '../../utils/history'

export const loginUser =
  (data: ILoginRequest) =>
    async (dispatch: Dispatch<any>): Promise<void> => {
      try {
        dispatch(loginStart())

        const res = await api.auth.login(data)

        dispatch(loginSucess(res.data.accessToken))

        history.push('/newsboard')
      } catch (e: any) {
        console.error(e)
        alert(e.response.data)
        dispatch(loginFailure(e.message))
      }
    }

export const logoutUser =
  () =>
    async (dispatch: Dispatch): Promise<void> => {
      try {
        await api.auth.logout()

        dispatch(logoutSuccess())

        history.push('/')
      } catch (e) {
        console.error(e)
      }
    }
