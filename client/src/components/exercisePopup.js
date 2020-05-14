import React, { Component }  from 'react';
import {connect} from "react-redux";
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'

import './exercisePopup.css';
import {userDayExercisesAPI} from "../api";

class ExercisePopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.exercise._id,
            user_id: this.props.userId,
            date: this.props.date,
            name: this.props.exercise.name,
            type: this.props.exercise.type,
            quantity: this.props.exercise.quantity,
            index: this.props.exercise.index,
        }
    }

    componentDidMount(){
        M.AutoInit();
    }

    submitHandler = event => {
        event.preventDefault();
        this.props.submitHandler(this.state);
    };

    cancelHandler = () => {
        this.props.onChangeVisibilityExercisePopup();
    };

    changeHandler = event => {
        event.persist();
        this.setState(prevState => ({
            ...prevState, ...{[event.target.name]: event.target.value}
        }));
    };

    render() {
        return (
            <div className={'window '}>
                <form
                    className={'form '}
                    onSubmit={this.submitHandler}
                >
                    <div className={'form_row'}>
                        <div className="input-field width_60">
                            <input
                                placeholder=""
                                id="exercise_name"
                                type="text"
                                className="validate"
                                name='name'
                                defaultValue={this.state.name }
                                onChange={this.changeHandler}
                                autoFocus={true}
                            />
                            <label
                                htmlFor="exercise_name"
                                className="active"
                            >
                                Exercise name
                            </label>
                        </div>
                        <div className="input-field width_25">
                            <select
                                name='type'
                                onChange={this.changeHandler}
                            >
                                <option
                                    value={this.state.type}
                                    disabled
                                    selected
                                >
                                    {this.state.type}
                                </option>
                                {
                                    this.props.commonExercises.map(exercise => {
                                        return <option value={exercise.type}>{exercise.type}</option>
                                        }
                                    )
                                }
                            </select>
                            <label>Type</label>
                        </div>
                        <div className="input-field width_10">
                            <input
                                id="quantity"
                                type="text"
                                pattern="[0-9]*"
                                className="validate"
                                name='quantity'
                                defaultValue={this.state.quantity}
                                onChange={this.changeHandler}
                            />
                            <label
                                htmlFor="quantity"
                                className="active"
                            >
                                Quantity
                            </label>
                        </div>
                    </div>
                    <div className={'form_row'}>
                        <button
                            className="btn waves-effect waves-light grey form_btn"
                            onClick={this.cancelHandler}
                            type='button'
                        >
                            Cancel
                        </button>
                        <button
                            className="btn waves-effect waves-light brown form_btn"
                            type="submit"
                        >
                            {this.props.userDayExercises.length == this.state.index ? 'Add exercise' : 'Change exercise'}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
};

export default connect(
    state => ({
        popup: state.popup,
        commonExercises: state.commonExercises,
        userDayExercises: state.userDayExercises,
    }),
    dispatch => ({
        onChangeVisibilityExercisePopup: () => {
            dispatch ({type: 'CHANGE_VISIBILITY_EXERCISE_POPUP'})
        },
        onUpdateExercise: exercise => {
            dispatch ( userDayExercisesAPI.updateUserDayExercise(exercise));
        },
        onCreateExercise: exercise => {
            dispatch ( userDayExercisesAPI.createUserDayExercise(exercise));
        },
    })
)(ExercisePopup);