import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import HomePage from './pages/homePage';
import ExercisesPage from './pages/exercisesPage';
import DaysExercisePage from './pages/daysExercisePage';

export const useRoutes = (user) => {
    return (
        <Switch>
            <Route
                path="/"
                exact
            >
                <HomePage />
            </Route>
            { user && (
                    <>
                        <Route
                            path="/exercises"
                            exact
                        >
                            <ExercisesPage />
                        </Route>
                        <Route
                            path="/exercises/:date"
                            exact
                            component={DaysExercisePage}
                        />
                    </>
                )
            }
            <Redirect to="/" />
        </Switch>
    );
};