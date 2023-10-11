import { useEffect } from 'react';

import Main from './components/pages/Main';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getUser } from './frameworks/redux/sagas';
import Panel from './components/menu/Panel';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
    const theme = window.localStorage.getItem('theme');
    if (theme == 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.add('light');
    }
  }, [])

  return (
    <BrowserRouter>
      <Panel />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;