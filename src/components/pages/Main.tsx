import { useEffect, useState } from "react";
import { Header } from "../menu/Header";
import { useAppSelector } from "../../hooks";
import { useDispatch } from "react-redux";
import { getTransactions } from "../../frameworks/redux/sagas";


function Main() {
  const dispatch = useDispatch()

  const user = useAppSelector((state) => state.user);
  const app = useAppSelector((state) => state.app);

  useEffect(() => {
    if (user.isLogin) {
      dispatch(getTransactions('week'));
    }
  }, [user.isLogin])
  return (
    <div className="mainbody">
      <Header />
      <div className="main">
        <div className="main__body">

        </div>
      </div>
    </div>
  )

}

export default Main;