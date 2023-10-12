import { useEffect } from "react";
import { useAppSelector } from "@/hooks";
import { useDispatch } from "react-redux";
import { getTransactions } from "@/frameworks/redux/sagas";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useSearchParams } from "react-router-dom";
Chart.register(CategoryScale);

export default function ReportsCompany() {
  const dispatch = useDispatch()
  let [searchParams, setSearchParams] = useSearchParams();
  const user = useAppSelector((state) => state.user);
  const app = useAppSelector((state) => state.app);
  const transactions = useAppSelector((state) => state.data.transactions);


  const handleSetParams = (key, value) => {
    setSearchParams(params => {
      params.set(key, value);
      return params;
    });
  }
  useEffect(() => {
    if (!searchParams.get("i")) {
      setSearchParams(params => {
        params.set("i", 'week');
        return params;
      });
    }
    if (!searchParams.get("g")) {
      setSearchParams(params => {
        params.set("g", 'all');
        return params;
      });
    }
  })
  useEffect(() => {
    if (user.isLogin && searchParams.get("i")) {
      dispatch(getTransactions(searchParams.get("i")));
    }
  }, [user.isLogin, searchParams.get("i")]);

  const options = {
    responsive: true,

    plugins: {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
            round: 'day'
          }
        }
      },
      legend: {
        position: 'bottom' as const,
      },
    },
    updateMode: 'resize'
  };
  let expanses = [];
  let income = [];
  let expansesProxy = transactions ?? [];
  let incomeProxy = transactions ?? [];

  if (searchParams.get('g') === 'cli') {

  } else if (searchParams.get('g') === 'bus') {

  } else {
    expansesProxy = expansesProxy
      .filter((tr) => {
        if (tr.type === 'expanses') return true;
        return false
      })

    incomeProxy = incomeProxy
      .filter((tr) => {
        if (tr.type === 'income') return true;
        return false
      })
  }

  let expansesTempDateCollection = [];
  let incomeTempDateCollection = [];

  expansesProxy.map((tr) => {
    const formatedDate = new Date(tr.date).toLocaleDateString('en-GB');
    if (expansesTempDateCollection.includes(formatedDate)) {
      const index = expansesTempDateCollection.indexOf(formatedDate);
      const element = expanses[index];
      expanses[index] = { ...element, y: element.y + tr.amount }
    } else {
      expansesTempDateCollection.push(formatedDate);
      expanses.push({ x: formatedDate, y: tr.amount });
    }
  })
  incomeProxy.map((tr) => {
    const formatedDate = new Date(tr.date).toLocaleDateString('en-GB');
    if (incomeTempDateCollection.includes(formatedDate)) {
      const index = incomeTempDateCollection.indexOf(formatedDate);
      const element = income[index];
      income[index] = { ...element, y: element.y + tr.amount }
    } else {
      incomeTempDateCollection.push(formatedDate);
      income.push({ x: formatedDate, y: tr.amount });
    }
  })
  let profits = [];
  expanses.map((tr) => {
    const formatedDate = tr.x;
    if (incomeTempDateCollection.includes(formatedDate)) {
      const index = incomeTempDateCollection.indexOf(formatedDate);
      const element = income[index];
      profits.push({ ...element, y: element.y - tr.y });
    } else {
      profits.push({ x: formatedDate, y: -tr.amount });
    }
  })
  const data = {
    datasets: [
      {
        label: 'Затраты',
        data: expanses ?? [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        lineTension: 0.4,
      },
      {
        label: 'Выручка',
        data: income ?? [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        lineTension: 0.4,
      },
            {
        label: 'Прибыль',
        data: profits ?? [],
        borderColor: 'rgba(69, 170, 242)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        lineTension: 0.4,
      },
    ],
  };
  console.log(JSON.stringify(data.datasets))
  return (
    <>
      <h1>
        Сводный отчет
      </h1>
      <div className="main__body">
        <div className="card">
          <div className="card__container">
            <div className="card__header">
              <h2>
                Общая статистика
              </h2>
              <div className="card__nav">
                <div className={"card__nav_item " + (searchParams.get('i') === 'week' ? 'active' : '')} onClick={() => handleSetParams('i', 'week')}>
                  Неделя
                </div>
                <div className={"card__nav_item " + (searchParams.get('i') === 'month' ? 'active' : '')} onClick={() => handleSetParams('i', 'month')}>
                  Месяц
                </div>
                <div className={"card__nav_item " + (searchParams.get('i') === 'year' ? 'active' : '')} onClick={() => handleSetParams('i', 'year')}>
                  Год
                </div>
              </div>
            </div>
            <div className="card__body">
              <Line options={options} data={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}