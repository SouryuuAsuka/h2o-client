import { useState } from "react";
import { useAppSelector } from "../../hooks";
import { useDispatch } from "react-redux";

export function Header() {
  const user = useAppSelector((state) => state.user);
  const search = useAppSelector((state) => state.app.search);
  const dispatch = useDispatch();
  const handleChange = (event: any) => {
    if (event.target.checked) {
      window.localStorage.setItem('theme', 'light');
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    } else {
      window.localStorage.setItem('theme', 'dark');
      document.body.classList.add('dark');
      document.body.classList.remove('light');

    }
  };

  return (
    <header>
      <div className="header__brand">
        <div className="header__brand_text">
          TODO
        </div>
        <div className="header__brand_logo">

        </div>
      </div>
      <div className="header__panel">
        <div className="header__panel_lang">
        </div>
        <div className="header__panel_theme">
          <input type="checkbox" id="switch" onChange={handleChange} /><label htmlFor="switch">Toggle</label>
        </div>
        <div className="header__panel_profile">
          <div className="header__panel_profile_img">
            <img src={process.env.PUBLIC_URL + '/avatars/128/128_' + user.avatar + '.png'} />
          </div>
          <div className="header__panel_profile_name">
            {user.name}
          </div>
        </div>
      </div>
    </header>
  )

}
