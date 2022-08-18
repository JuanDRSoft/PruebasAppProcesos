import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
import Reports from './reports/reports';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const Gogo = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './gogo')
);
const SecondMenu = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './second-menu')
);
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './blank-page')
);

const DetailProcess = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './detail/DetailProcess')
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className='dashboard-wrapper'>
        <Suspense fallback={<div className='loading' />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/process`}
            />
            <Route
              path={`${match.url}/process`}
              render={(props) => <Gogo {...props} />}
            />
            <Route
              path={`${match.url}/second-menu`}
              render={(props) => <SecondMenu {...props} />}
            />
            <Route
              path={`${match.url}/detail/:id`}
              render={(props) => <DetailProcess {...props} />}
            />
            <Route
              path={`${match.url}/reportes`}
              render={(props) => <Reports {...props} />}
            />
            {/* <ProtectedRoute
                    path={`${match.url}/second-menu`}
                    component={SecondMenu}
                    roles={[UserRole.Admin]}
            /> */}
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />
            <Redirect to='/error' />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
