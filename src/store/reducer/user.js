import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'users',
    initialState: {
        isAuth: false,
        token: '',
        data: {},
        dataBooking: {}
    },
    reducers: {
        login(state, actions) {
            return {
                ...state,
                isAuth: true,
                token: actions.payload
            }
        },
        logout(state, actions) {
            return {
                ...state,
                isAuth: false,
                token: '',
                data: {}
            }
        },
        addData(state, actions) {
            return {
                ...state,
                data: actions.payload
            }
        },
        addDataBooking(state, actions) {
            return {
                ...state,
                dataBooking: actions.payload
            }
        },
        addDataCheckout(state, actions) {
            return {
                ...state,
                dataCheckout: actions.payload
            }
        }

    }
})

export const { login, logout, addData, addDataBooking, addDataCheckout } = userSlice.actions
export default userSlice.reducer