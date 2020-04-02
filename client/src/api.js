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
                async dispatch => {
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
    }
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



