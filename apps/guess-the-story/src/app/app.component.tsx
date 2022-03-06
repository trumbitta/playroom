import { FC } from 'react';

// Third parties
import { Route, Redirect } from 'react-router-dom';

// Libs
import { PageStories } from '@playroom/guess-the-story/features/stories';

export const App = () => (
  <>
    <Route exact path="/home">
      <Redirect to="/stories" />
    </Route>
    <Route path="/stories">
      <PageStories />
    </Route>
    <Route exact path="/">
      <Redirect to={'/home'} />
    </Route>
  </>
);
