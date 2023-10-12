import ReactDOM from 'react-dom/client';
import '@/assets/styles/index.css';

import { Provider } from 'react-redux'

import { store } from '@/frameworks/redux/store';
import App from '@/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

