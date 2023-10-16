import { useState } from "react";
import { useAppSelector } from "@/hooks";
import { useDispatch } from "react-redux";
import arrowIcon from "@/assets/images/icons/arrow.svg";
import { useLocation } from "react-router-dom";
interface Nav {
  name: string,
  route: string
}
interface Props {
  navs?: Nav[] | null
}

export function Header({ navs = null }: Props) {
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split('/')[2];

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
      <div className="header__nav">
        {navs && <><div className="header__nav_controller">
          <div className="header__nav_controller_item left">
            <img src={arrowIcon} alt='arrow' />
          </div>
          <div className="header__nav_controller_item right">
            <img src={arrowIcon} alt='arrow' />
          </div>
        </div>
          <div className="header__nav_panel">
            {navs && navs.map((nav) => (
              <div className={"header__nav_panel_item " + (path === nav.route ? 'active' : '')}>
                {nav.name}
              </div>
            ))}
          </div>
        </>}
      </div>

      <div className="header__profile">
        <div className="header__theme">
          <input type="checkbox" id="switch" defaultChecked={window.localStorage.getItem('theme')==='light'} onChange={handleChange} /><label htmlFor="switch">Toggle</label>
        </div>
        <div className="header__profile_img">
          <img src={process.env.PUBLIC_URL + '/avatars/128/128_' + user.avatar + '.png'} />
        </div>
        <div className="header__profile_name">
          {user.name}
        </div>
      </div>
    </header>
  )

}
