import React from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import Select from '../common_components/select';

const DaysExercisePage = ({commonExercises, userDayExercises}) => {
    let { date } = useParams();

    const clickHendler = (exercise) => {
        console.log(exercise);
    };

    return(
        <div className="container">
            <h3>Days Exercise Page</h3>
            <div className='collection'>
                <ol>
                    {
                        userDayExercises.map((exercise, index) => {
                            return (
                                <div
                                    className={'collection-item'}
                                    key={exercise._id}
                                >
                                    <li>
                                        {exercise.name} {exercise.type} {exercise.quantity}
                                        <i className="fa fa-arrow-circle-o-up fa-lg" aria-hidden="true"></i>
                                        <i className="fa fa-arrow-circle-down fa-lg" aria-hidden="true"></i>
                                    </li>
                                </div>
                            );
                        })
                    }
                </ol>
            </div>

            <Select
                exercises={commonExercises}
                onChange={clickHendler}
            />
        </div>
    );
};


export default connect(
    state => ({
        user: state.user,
        commonExercises: state.commonExercises,
        userDayExercises: state.userDayExercises,
    }),
    dispatch => ({

    })
)(DaysExercisePage);