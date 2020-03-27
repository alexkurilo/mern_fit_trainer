import React, {useState} from 'react';
import './select.css';

const Select = ({exercises, onChange}) => {
    const initial = {
        name: 'Select exercise',
    };
    const [selectedExercise, setSelectedExercise] = useState({ ...initial });

    const exercisesList = [initial, ...exercises];

    const handleChange = (event) => {
        if (+event.target.value){
            setSelectedExercise({ ...exercisesList[event.target.value] });
            onChange({ ...exercisesList[event.target.value] });
        }
    };

    const options = exercisesList.map(function(exercise, index) {
        if (selectedExercise.name === exercise.name) {
            return (
                <option
                    key={exercise._id || exercise.name}
                    selected
                    value={index}
                >
                    {exercise.name}
                </option>
            );
        } else {
            return (
                <option
                    key={exercise._id || exercise.name}
                    value={index}
                >
                    {exercise.name}
                </option>
            );
        }
    });
    return (
        <div className="custom-select">
            <div className="custom-select-value">
                {selectedExercise.name}
            </div>
            <select
                name={selectedExercise.name}
                onChange={handleChange}
            >
                {options}
            </select>
        </div >
    );
};

export default Select;