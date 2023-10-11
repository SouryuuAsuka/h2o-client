import { useEffect } from 'react';

import Main from './components/pages/Main';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getUser, showPopupLogin } from './frameworks/redux/sagas';
import Panel from './components/menu/Panel';
import { useAppSelector } from './hooks';
import { LoginPopup } from './components';

function App() {
  const dispatch = useDispatch()
  const app = useAppSelector((state) => state.app);
  const isLogin = useAppSelector((state) => state.user.isLogin);

  useEffect(() => {
    dispatch(getUser())
    const theme = window.localStorage.getItem('theme');
    if (theme == 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.add('light');
    }
  }, [])
  useEffect(() => {
    console.log("isLogin - "+isLogin)
    console.log("app.loading - "+app.loading)
    if(!isLogin && !app.loading){
      dispatch(showPopupLogin())
    }
  }, [isLogin, app.loading])

  return (
    <BrowserRouter>
      <Panel />
      {app.popups.login && <LoginPopup/>}
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;