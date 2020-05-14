import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';

import {
    userDayExercisesAPI,
} from '../api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlusCircle,
    faArrowAltCircleUp,
    faArrowAltCircleDown,
    faEdit,
    faTrash,
} from '@fortawesome/free-solid-svg-icons'

import ExercisePopup from '../components/exercisePopup';

const DaysExercisePage = ({user, popup, userDayExercises, onDeleteExercise, onCreateExercise, onUpdateExercise, onGetUserDayExercises, onChangeVisibilityExercisePopup}) => {
    let { date } = useParams();
    const [exercise, setExercise] = useState({});
    useEffect(() => {
        !userDayExercises.length && onGetUserDayExercises(user._id ,date);
    });

    const adHandler = () => {
        setExercise({
            index: userDayExercises.length,
            name: '',
            type: '',
            quantity: 1,
        });
        onChangeVisibilityExercisePopup();
        onGetUserDayExercises(user._id, date);
    };

    const upHandler = index => {
        if (index) {
            const prevExersise = { ...userDayExercises[index - 1], index: index };
            const nextExersise = { ... userDayExercises[index], index: index - 1 };
            onUpdateExercise(prevExersise);
            onUpdateExercise(nextExersise);
            onGetUserDayExercises(user._id, date);
        }
    };

    const downHandler = index => {
        if (index < userDayExercises.length - 1) {
            const prevExersise = { ...userDayExercises[index], index: index + 1 };
            const nextExersise = { ...userDayExercises[index + 1], index: index };
            onUpdateExercise(prevExersise);
            onUpdateExercise(nextExersise);
            onGetUserDayExercises(user._id, date);
        }
    };

    const editHandler = exercise => {
        setExercise({
            _id: exercise._id || null,
            index: exercise.index,
            name: exercise.name,
            type: exercise.type,
            quantity: exercise.quantity,
        });
        onChangeVisibilityExercisePopup();
        onGetUserDayExercises(user._id, date);
    };

    const deleteHandler = (exerciseId) => {
        let isNext = false;
        [...userDayExercises].forEach((item) => {
            let exersise = { ... userDayExercises[item.index], index: item.index - 1 };
            isNext && onUpdateExercise(exersise);
            exerciseId == item._id && (isNext = !isNext);
        });
        onDeleteExercise(exerciseId);
        onGetUserDayExercises(user._id, date);
    };

    const submitHandler = exercise => {
        exercise._id
            ? onUpdateExercise(exercise)
            : onCreateExercise(exercise);
        onChangeVisibilityExercisePopup();
        onGetUserDayExercises(user._id, date);
    };

    return(
        <div className="container">
            <h3>Days Exercise Page</h3>
            <div className='collection'>
                <table className='striped responsive-table'>
                    <thead>
                        <tr>
                            <th>
                                index
                            </th>
                            <th width="40%">
                                exercise name
                            </th>
                            <th width="20%" className='center'>
                                exercise type
                            </th>
                            <th width="20%" className='center'>
                                exercise quantity
                            </th>
                            <th colSpan="4" className='th-right'>
                                <FontAwesomeIcon
                                    icon={faPlusCircle}
                                    onClick={adHandler}
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        userDayExercises.map((exercise, index) => {
                            return (
                                <tr
                                    className={'collection-item'}
                                    key={exercise._id}
                                >
                                    <td className=''>
                                        {exercise.index}
                                    </td>
                                    <td className=''>
                                        {exercise.name}
                                    </td>
                                    <td className='center'>
                                        {exercise.type}
                                    </td>
                                    <td className='center'>
                                        {exercise.quantity}
                                    </td>
                                    <td className='center'
                                        onClick={() => upHandler(exercise.index)}
                                    >
                                        <FontAwesomeIcon icon={faArrowAltCircleUp} />
                                    </td>
                                    <td className='center'
                                        onClick={() => downHandler(exercise.index)}
                                    >
                                        <FontAwesomeIcon icon={faArrowAltCircleDown} />
                                    </td>
                                    <td className='center'
                                        onClick={() => editHandler(exercise)}
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </td>
                                    <td className='center'
                                        onClick={() => deleteHandler(exercise._id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
            {
                popup.exercisePopup && (
                    <ExercisePopup
                        date={date}
                        userId={user._id}
                        exercise={exercise}
                        submitHandler={submitHandler}
                    />
                )
            }
        </div>
    );
};

export default connect(
    state => ({
        user: state.user,
        popup: state.popup,
        commonExercises: state.commonExercises,
        userDayExercises: state.userDayExercises,
    }),
    dispatch => ({
        onDeleteExercise: exercise => {
            dispatch ( userDayExercisesAPI.deleteUserDayExercise(exercise));
        },
        onCreateExercise: exercise => {
            dispatch ( userDayExercisesAPI.createUserDayExercise(exercise));
        },
        onUpdateExercise: exercise => {
            dispatch ( userDayExercisesAPI.updateUserDayExercise(exercise));
        },
        onGetUserDayExercises: (userId, date) => {
            dispatch(userDayExercisesAPI.getUserDayExercise(userId, date));
        },
        onChangeVisibilityExercisePopup: () => {
            dispatch ({type: 'CHANGE_VISIBILITY_EXERCISE_POPUP'})
        },
    })
)(DaysExercisePage);