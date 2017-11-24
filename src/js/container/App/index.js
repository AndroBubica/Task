import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import createAppStore from '../../store'
import { PersistGate } from 'redux-persist/es/integration/react'

import AllContacts from '../AllContacts'
import NotFound from '../NotFound'
import Header from '../../components/Header'
import AddNew from '../AddNew'
import EditContact from '../EditContact'
import ViewContact from '../ViewContact'

const { persistor, store } = createAppStore()

const Loading = () =>
  <section>
    <span>Loading...</span>
  </section>

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <PersistGate
          loading={<Loading />}
          persistor={persistor}>
          <Router>
            <main>
              <Header />
              <Switch>
                <Route exact path='/' component={AllContacts} />
                <Route path='/favorites' component={AllContacts} />
                <Route path='/contact/add' component={AddNew} />
                <Route path='/contact/edit/:userId' component={EditContact} />
                <Route path='/contact/:userId' component={ViewContact} />
                <Route path='*' component={NotFound} />
              </Switch>
            </main>
          </Router>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
