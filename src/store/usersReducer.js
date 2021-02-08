export const SET_USERS_KEYWORD = 'SET_USERS_KEYWORD';
export const SET_SORT_BY_AGE = 'SET_SORT_BY_AGE';


const initialState = {
    users_keyword: '',
    sortByAge: false
};

export default function usersReducer(state = initialState, { type, payload }) {
    switch (type) {
        case SET_USERS_KEYWORD: {
            return {
                ...state,
                users_keyword: payload
            }
        }

        case SET_SORT_BY_AGE: {
            debugger
            return {
                ...state,
                sortByAge: !state.sortByAge
            }
        }

        default:
            return state;
    }
}
