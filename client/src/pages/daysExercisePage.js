import React from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import Select from '../common_components/select';

const DaysExercisePage = ({commonExercises}) => {
    let { date } = useParams();

    const clickHendler = (exercise) => {
        console.log(exercise);
    };

    return(
        <div className="container">
            <h3>Days Exercise Page</h3>

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
    }),
    dispatch => ({

    })
)(DaysExercisePage);