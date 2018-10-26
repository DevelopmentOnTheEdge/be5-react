import ReactDOM         from 'react-dom';
import React            from 'react';
import { Provider }     from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import ApplicationWithBe5Menu              from './components/test/ApplicationWithBe5Menu';
import Application from './components/Application';
import rootReducer      from './store/reducers'
import createBaseStore  from './store'
import be5init          from './be5init';
import './be5styles';

const store = createBaseStore(rootReducer);
be5init.init(store, function () {
  const render = Component => {
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <Component />
        </Provider>
      </AppContainer>,
      document.getElementById('app'),
    )
  };

  render(ApplicationWithBe5Menu);

// Webpack Hot Module Replacement API
  if (module.hot) {
    module.hot.accept('./components/Application', () => {
      render(ApplicationWithBe5Menu)
    })
  }
});

