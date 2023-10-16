import { useState } from "react";
import Api from "../../frameworks/axios/Api";
import { useDispatch } from "react-redux";
import { getUser, setUser } from "../../frameworks/redux/sagas";

export function LoginPopup() {
  const [signUp, setSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch()
  const signInFetch = (event: any) => {
    event.preventDefault();
    try {
      Api.post('/users/signin', {
        username,
        password,
      }).then((res) => {
        const { accessToken, refreshToken } = res.data.data;
        window.localStorage.setItem('accessToken', accessToken);
        window.localStorage.setItem('refreshToken', refreshToken);
        const data = res?.data?.data?.user;
        const user = {
          id: data.user_id ?? 1,
          name: data.username ?? null,
          avatar: data.avatar ?? null,
          isLogin: true
        }
        dispatch(setUser(user));
        window.location.reload();
      })
    } catch (err: any) {
      setError(true)
    }
  }
  const signUpFetch = (event: any) => {
    event.preventDefault();
    try {
      Api.post('/users/signup', {
        username,
        password,
      }).then((res) => {
        const { accessToken, refreshToken } = res.data.data;
        window.localStorage.setItem('accessToken', accessToken);
        window.localStorage.setItem('refreshToken', refreshToken);
        Api.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
        const data = res?.data?.data?.user;
        const user = {
          id: data.user_id ?? 1,
          name: data.username ?? null,
          avatar: data.avatar ?? null,
          isLogin: true
        }
        dispatch(setUser(user));
        window.location.reload();
      })
    } catch (err: any) {
      setError(true)
    }
  }
  return (
    <div className='loginPopup__background'>
      <div className='loginPopup__container'>
        <div className='loginPopup__header'>
          <div className='loginPopup__header_tittle'>
            {signUp ? 'Регистрация' : 'Вход'}
          </div>
        </div>
        <div className='loginPopup__buttons '>
          <div className={'loginPopup__buttons_item btn ' + (signUp ? '' : 'active')} onClick={() => { setSignUp(false) }}>
            Вход
          </div>
          <div className={'loginPopup__buttons_item btn ' + (signUp ? 'active' : '')} onClick={() => { setSignUp(true) }}>
            Регистрация
          </div>
        </div>
        <div className='loginPopup__body'>
          {error && <div className='loginPopup__body_error'>
            Ошибка запроса
          </div>}
          {
            signUp
              ?
              <form className="loginPopup__form" onSubmit={e => signUpFetch(e)}>
                <div className="loginPopup__form_input">
                  <div className="loginPopup__form_input_text">
                    Логин
                  </div>
                  <input onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="loginPopup__form_input">
                  <div className="loginPopup__form_input_text">
                    Пароль
                  </div>
                  <input type="password" onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit">
                  Зарегистрироваться
                </button>
              </form>
              :
              <form className="loginPopup__form" onSubmit={e => signInFetch(e)}>
                <div className="loginPopup__form_input">
                  <div className="loginPopup__form_input_text">
                    Логин
                  </div>
                  <input onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="loginPopup__form_input">

                  <div className="loginPopup__form_input_text">
                    Пароль
                  </div>
                  <input type="password" onChange={e => setPassword(e.target.value)} />
                </div>
                <button className="btn active" type="submit">
                  Войти
                </button>
              </form>
          }
        </div>
      </div>
    </div>
  )
}