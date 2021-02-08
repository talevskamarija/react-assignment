import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getUsersFiltered } from "../../selectors/users";
import {Transition} from 'react-transition-group';

function Users (props) {
    const users = props.users;
    const [expandId, setExpandId] = useState(null);


    const handleChange = (value) => {
        if(value.length >= 3) {
            props.dispatch({type: 'SET_USERS_KEYWORD', payload: value});
        } else {
            props.dispatch({type: 'SET_USERS_KEYWORD', payload: ''});
        }
    }

    const handleSort = () => {
        props.dispatch({type: 'SET_SORT_BY_AGE'});
    }

    const handleExpand = (id) => {
        if(expandId !== id) {
            setExpandId(id);
        } else {
            setExpandId(null);
        }
    }

return (
    <div className="codeflair-assignment">
        <section className="user-filter">
            <label htmlFor="input-field">Filter Users by Name</label>
            <input type="text" onChange={(event) => handleChange(event.target.value)}/>
            <button onClick={() => handleSort()} className="filter-button">Sort by Age</button>
        </section>
        <div className="user-list">
            {
                users && users.length > 0 &&
                <div>Results: {users.length}</div>

            }
            <ul>
                    {
                        (users && users.length > 0) ? (users.map((user, index) => {
                            return <li key={index}>
                            <article className="user" onClick={() => handleExpand(user.id)}>
                                <button className="user__trigger">
                                    <div className="user__image">
                                        <img src={user.img} alt={'user-img'}/>
                                    </div>
                                    <div className="user__info">
                                        <h2>{user.firstname} {user.lastname}</h2>
                                        <p className="user__age">{user.age}</p>
                                    </div>
                                </button>
                                <Transition
                                    in={expandId === user.id}
                                    timeout={300}
                                    className={'user__extra-info'}
                                    unmountOnExit
                                    exit={false}
                                >
                                    <div>
                                        <h3>Contact details:</h3>
                                        <p>Email: {user.email}</p>
                                        <p>Phone: {user.phone}</p>
                                    </div>
                                </Transition>
                            </article>
                            </li> })) :
                            <li>
                                <span className="user-filter__no-users-found">results are empty</span>
                            </li>
                    }
            </ul>
        </div>
    </div>
)
}

const mapStateToProps = state => ({
    users: getUsersFiltered(state.usersReducer),
    usersReducer: state.usersReducer,
});

export default connect(mapStateToProps)(Users);