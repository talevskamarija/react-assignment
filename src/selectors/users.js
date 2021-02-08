import { createSelector } from 'reselect';
import { users } from '../data/users.js'

const getUsersKeyword = (state) => state.users_keyword;
const getSortByAge = (state) => state.sortByAge;

// SORT BY AGE ASCENDING
const getUsersFilteredByAge = createSelector(
    [ getSortByAge ],
    (sortByAge) => {
        if (sortByAge)
            return users.sort((a,b) => a.age - b.age);
        else
            return users.sort((a,b) => b.age - a.age);
    }
);

// KEYWORD SEARCH
export const getUsersFiltered = createSelector(
    [getUsersFilteredByAge, getUsersKeyword],
    (users, keyword) => {
        if (keyword === '') return users;
        else
            return users && users.filter(u =>
                {
                    let kw = keyword.toLowerCase();
                    return (u.firstname + ' ' + u.lastname).toLowerCase().includes(kw);
                }
            );
    }
);