import './service-worker-registration'
import { app } from 'hyperapp'
import actions from './actions/board'
import state from './states/board'
import view from './views/board'
import { withLogger } from '@hyperapp/logger'
import {
  persist,
  calculatePools,
  updateUrl,
  resetPersistentState,
  compose
} from './appDecorators.js'

compose(
  persist(sessionStorage, 'ledger', 'dropToken'),
  persist(sessionStorage, 'vigor', 'tapVigor'),
  resetPersistentState(sessionStorage, 'ledger', 'vigor'),
  calculatePools,
  updateUrl,
  withLogger
)(app)(state, actions, view, document.body)
