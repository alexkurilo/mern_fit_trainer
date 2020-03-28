import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import HomePage from './pages/homePage';
import ExercisesPage from './pages/exercisesPage';
import DaysExercisePage from './pages/daysExercisePage';

export const useRoutes = () => {
    return (
        <Switch>
            <Route
                path="/"
                exact
            >
                <HomePage />
            </Route>
            <Route
                path="/exercises"
                exact
            >
                <ExercisesPage />
            </Route>
            <Route
                path="/exercises/:date"
                exact
            >
                <DaysExercisePage />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
};