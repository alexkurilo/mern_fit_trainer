import * as axios from 'axios';

export const authAPI = {
    getAuthData (data) {
        return (
            dispatch => {
                return (
                    axios.get('/api/auth', data)
                        .then( response => {
                            response.data.forEach(item => {
                                dispatch(this[item.name][item.type].initialization(item.client_id));
                            });
                        })
                );
            }
        )
    },
    google: {
        oauth2: {
            initialization (clientId) {
                return (
                    dispatch => {
                        return (
                            window.gapi.load('auth2', () => {
                                window.gapi.auth2.init({
                                    client_id : clientId,
                                });
                            })
                        );
                    }
                )
            },
            getUser () {
                return (
                    dispatch => {
                        return (
                            window.gapi.auth2.getAuthInstance().signIn({
                                scope: 'profile email'
                            })
                                .then((googleUser) => {
                                    const userData = {
                                        name: googleUser.getBasicProfile().getName(),
                                        email: googleUser.getBasicProfile().getEmail(),
                                        img: googleUser.getBasicProfile().getImageUrl(),
                                    };

                                    dispatch(usersAPI.getUser(userData));
                                })
                        )
                    }
                );
            }
        }
    }
};

export const commonExercisesAPI = {
    getCommonExercises () {
        return (
            dispatch => {
                return (
                    axios.get('/api/common_exercise')
                        .then( response => {
                            const payload = response.data;
                            dispatch({type: 'SAVE_COMMON_EXERCISES', payload})
                        })
                )
            }
        );
    }
};

export const userDayExercisesAPI = {
    getDaysList (userId) {
        return (
            dispatch => {
                return (
                    axios.get(`/api/user_day_exercise/${userId}`)
                        .then( response => {
                            dispatch({type: 'SAVE_DATES', payload: response.data});
                        })
                )
            }
        )
    }
};

export const usersAPI = {
    getUser (userData) {
        return (
            dispatch => {
                return (
                    axios.post(
                        '/api/user',
                        userData,
                        {
                            headers: {"Content-Type": "application/json"},
                        })
                        .then(response => {
                            if (response.data) {
                                dispatch({type: 'SAVE_USER', payload: response.data});
                                dispatch({type: 'CHANGE_VISIBILITY_AUTH_POPUP'});
                                dispatch(userDayExercisesAPI.getDaysList(response.data._id));
                            }
                        })
                )
            }
        );
    }
};



