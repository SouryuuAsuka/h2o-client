import { useEffect } from "react";
import { Header } from "@/components/menu/Header";
import { useAppSelector } from "@/hooks";
import { useDispatch } from "react-redux";
import { getTransactions } from "@/frameworks/redux/sagas";

export default function ReportsCompany() {
  const dispatch = useDispatch()

  const user = useAppSelector((state) => state.user);
  const app = useAppSelector((state) => state.app);
  const transactions = useAppSelector((state) => state.data.transactions);

  useEffect(() => {
    if (user.isLogin) {
      dispatch(getTransactions('week'));
    }
  }, [user.isLogin]);
  console.log(JSON.stringify(transactions))
  return (
    <>
      <h1>
        Сводный отчет
      </h1>
      <div className="main__body">
      </div>
    </>
  )
}