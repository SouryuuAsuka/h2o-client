import { Header } from "@/components/Menu";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function ReportsIndex() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!window.location.pathname.split('/')[2]) {
      navigate('/reports/company')
    }
  }, [location]);
  const nav = [
    {
      name: 'Свод данных по сотрудникам',
      route: 'workers'
    },
    {
      name: 'Сводный отчет внутри компании',
      route: 'company'
    },
    {
      name: 'Сводный отчет по сделкам',
      route: 'deals'
    }
  ]
  return (
    <main>
      <Header navs={nav} />
      <div className="main">
        <div className="main__container">
          <Outlet />
        </div>
      </div>
    </main>
  )

}