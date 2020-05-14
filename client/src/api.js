import axios from 'axios';

export const authAPI = {
    getAuthData (data) {
        return (
            async dispatch => {
                try {
                    const response = await axios.get('/api/auth', data);
                    response.data.forEach(socNet => {
                        dispatch({type: 'ADD_SOC_NET', payload: socNet.name});
                        if (socNet.type == 'oauth2') {
                            dispatch(this[socNet.name].initialization(socNet.client_id));
                        }
                    });
                } catch (e) {}
            }
        )
    },
    google: {
        initialization (clientId) {
            return (
                async () => {
                    try {
                        await window.gapi.load('auth2', () => {
                            window.gapi.auth2.init({
                                client_id : clientId,
                            });
                        });
                    } catch (e) {}
                }
            )
        },
        getUser () {
            return (
                async dispatch => {
                    try {
                        const googleUser = await window.gapi.auth2.getAuthInstance().signIn({
                            scope: 'profile email'
                        });
                        dispatch(usersAPI.getUser({
                            name: googleUser.getBasicProfile().getName(),
                            email: googleUser.getBasicProfile().getEmail(),
                            img: googleUser.getBasicProfile().getImageUrl(),
                        }));
                    } catch (e) {}
                }
            );
        }
    },
};

export const commonExercisesAPI = {
    getCommonExercises () {
        return (
            async dispatch => {
                try {
                    const response = await axios.get('/api/common_exercise');
                    dispatch({type: 'SAVE_COMMON_EXERCISES', payload: response.data});
                } catch (e) {}
            }
        );
    }
};

export const userDayPlansAPI = {
    getUserDaysPlan (userId, date) {
        return (
            async dispatch => {
                try {
                    const response = await axios.get(`/api/user_day_plan/${userId}/${date}`);
                    console.log(response);
                    dispatch({type: 'SET_USER_DAY_PLANS', payload: response.data.exercises});
                } catch (e) {}
            }
        )
    },
};

export const userDayExercisesAPI = {
    getDaysList (userId) {
        return (
            async dispatch => {
                try {
                    const response = await axios.get(`/api/user_day_exercise/${userId}`);
                    dispatch({type: 'SAVE_DATES', payload: response.data});
                } catch (e) {}
            }
        )
    },
    getUserDayExercise (userId, date) {
        return (
            async dispatch => {
                try {
                    const response = await axios.get(`/api/user_day_exercise/${userId}/${date}`);
                    dispatch({type: 'SAVE_USER_DAY_EXERCISES', payload: response.data});
                } catch (e) {}
            }
        )
    },
    getUserDayPlanExercise (arrayExercisesIds) {
        return (
            async dispatch => {
                try {
                    const response = await axios.get(`/api/user_day_exercise/${arrayExercisesIds.user_id}/${arrayExercisesIds.date}`);
                    console.log(response.data);
                    // dispatch({type: 'SAVE_USER_DAY_EXERCISES', payload: response.data});
                } catch (e) {}
            }
        )
    },
    updateUserDayExercise (exercise) {
        console.log('exercise.index =', exercise.index);
        return (
            async () => {
                try {
                    await axios.put(
                        `/api/user_day_exercise/${exercise._id}`,
                        exercise,
                        {headers: {"Content-Type": "application/json"}});
                } catch (e) {}
            }
        )
    },
    createUserDayExercise (exercise) {
        return (
            async () => {
                try {
                    await axios.post(
                        `/api/user_day_exercise`,
                        exercise,
                        {headers: {"Content-Type": "application/json"}});
                } catch (e) {}
            }
        )
    },
    deleteUserDayExercise (exerciseId) {
        return (
            async () => {
                try {
                    await axios.delete(`/api/user_day_exercise/${exerciseId}`);
                } catch (e) {}
            }
        )
    },
};

export const usersAPI = {
    getUser (userData) {
        return (
            async dispatch => {
                try {
                    const response = await axios.post(
                        '/api/user',
                        userData,
                        {headers: {"Content-Type": "application/json"}});
                    if (response.data) {
                        dispatch({type: 'SAVE_USER', payload: response.data});
                        dispatch({type: 'CHANGE_VISIBILITY_AUTH_POPUP'});
                        dispatch(userDayExercisesAPI.getDaysList(response.data._id));
                    }
                } catch (e) {}
            }
        );
    }
};



