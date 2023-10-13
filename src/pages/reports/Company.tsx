import 'chartjs-adapter-date-fns';

import { useEffect } from "react";
import { useAppSelector } from "@/hooks";
import { useDispatch } from "react-redux";
import { genStats, getTransactions } from "@/frameworks/redux/sagas";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { Chart as ChartJS, registerables } from 'chart.js';
import { useSearchParams } from "react-router-dom";
import Spinner from '@/components/elements/Spinner';
import {Helmet} from "react-helmet";

import { numberWithSpaces } from '@/utils'
ChartJS.register(
  ...registerables
);

export default function ReportsCompany() {
  const dispatch = useDispatch()
  let [searchParams, setSearchParams] = useSearchParams();
  const user = useAppSelector((state) => state.user);
  const app = useAppSelector((state) => state.app);
  const loading = useAppSelector((state) => state.data.loading);
  const transactions = useAppSelector((state) => state.data.transactions);
  const stats = useAppSelector((state) => state.data.stats);

  const handleSetParams = (key: string, value: string) => {
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
    setTimeout(() => {
      dispatch(genStats());
    }, 1500)
  }, [])
  useEffect(() => {
    if (user.isLogin && searchParams.get("i")) {
      dispatch(getTransactions(searchParams.get("i")));
    }
  }, [user.isLogin, searchParams.get("i")]);

  let expanses = [];
  let income = [];
  let expansesProxy = transactions ?? [];
  let incomeProxy = transactions ?? [];
  let scales: any;

  if (searchParams.get('g') === 'cli') {
    expansesProxy = expansesProxy
      .filter((tr) => {
        if (tr.type === 'expanses' && tr.division === 'B2C') return true;
        return false
      })

    incomeProxy = incomeProxy
      .filter((tr) => {
        if (tr.type === 'income' && tr.division === 'B2C') return true;
        return false
      })
  } else if (searchParams.get('g') === 'bus') {
    expansesProxy = expansesProxy
      .filter((tr) => {
        if (tr.type === 'expanses' && tr.division === 'B2B') return true;
        return false
      })

    incomeProxy = incomeProxy
      .filter((tr) => {
        if (tr.type === 'income' && tr.division === 'B2B') return true;
        return false
      })
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

  if (searchParams.get('i') === 'year') {
    scales = {
      x: {
        type: 'time',
        time: {
          unit: 'month',
          round: 'month'
        }
      }
    }
  } else if (searchParams.get('i') === 'month') {
    scales = {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          round: 'day'
        }
      }
    }
  } else {
    scales = {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          round: 'day'
        }
      }
    }
  }

  let expansesTempDateCollection = [];
  let incomeTempDateCollection = [];
  if (searchParams.get('i') === 'year') {
    expansesProxy.map((tr) => {
      const proxyDate = new Date(tr.date)
      proxyDate.setDate(1)
      const formatedDate = proxyDate.toISOString().split('T')[0];
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
      const proxyDate = new Date(tr.date)
      proxyDate.setDate(1)
      const formatedDate = proxyDate.toISOString().split('T')[0];
      if (incomeTempDateCollection.includes(formatedDate)) {
        const index = incomeTempDateCollection.indexOf(formatedDate);
        const element = income[index];
        income[index] = { ...element, y: element.y + tr.amount }
      } else {
        incomeTempDateCollection.push(formatedDate);
        income.push({ x: formatedDate, y: tr.amount });
      }
    })
  } else {
    expansesProxy.map((tr) => {
      const formatedDate = new Date(tr.date).toISOString().split('T')[0];
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
      const formatedDate = new Date(tr.date).toISOString().split('T')[0];
      if (incomeTempDateCollection.includes(formatedDate)) {
        const index = incomeTempDateCollection.indexOf(formatedDate);
        const element = income[index];
        income[index] = { ...element, y: element.y + tr.amount }
      } else {
        incomeTempDateCollection.push(formatedDate);
        income.push({ x: formatedDate, y: tr.amount });
      }
    })
  }

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

  const options = {
    responsive: true,
    scales,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    updateMode: 'reset'
  };

  return (
    <>
      <Helmet>
        <title>Сводный отчет</title>
      </Helmet>
      <h1>
        Сводный отчет
      </h1>
      <div className="main__body">
        <div className='company__summary'>
          <div className={"card clickable " + (searchParams.get('g') === 'all' ? 'active' : '') + ' ' + ((stats.business.persent * 10 + stats.client.persent * 10) / 20 > 0 ? 'success' : 'fail')} onClick={() => handleSetParams('g', 'all')}>
            <div className="card__container">
              <div className='company__summary_body'>
                <div className='company__summary_stat ' >
                  {(stats.business.persent * 10 + stats.client.persent * 10) / 20} %
                </div>
                <div className='company__summary_sum'>
                  ₽  {numberWithSpaces(stats.business.amount + stats.client.amount)}
                </div>
                <div className='company__summary_subtitle'>
                  Итоги
                </div>
              </div>
            </div>
          </div>
          <div className={"card clickable " + (searchParams.get('g') === 'cli' ? 'active' : '') + ' ' + (stats.business.persent > 0 ? 'success' : 'fail')} onClick={() => handleSetParams('g', 'cli')}>
            <div className="card__container">
              <div className='company__summary_body'>
                <div className='company__summary_stat'>
                  {stats.business.persent} %
                </div>
                <div className='company__summary_sum'>
                  ₽  {numberWithSpaces(stats.business.amount)}
                </div>
                <div className='company__summary_subtitle'>
                  B2B
                </div>
              </div>
            </div>
          </div>
          <div className={"card clickable " + (searchParams.get('g') === 'bus' ? 'active' : '') + ' ' + (stats.client.persent > 0 ? 'success' : 'fail')} onClick={() => handleSetParams('g', 'bus')}>
            <div className="card__container">
              <div className='company__summary_body'>
                <div className={'company__summary_stat'}>
                  {stats.client.persent} %
                </div>
                <div className='company__summary_sum'>
                  ₽  {numberWithSpaces(stats.client.amount)}
                </div>
                <div className='company__summary_subtitle'>
                  B2C
                </div>
              </div>
            </div>
          </div>
        </div>
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
              <div className='company__chart'>
                {
                  loading.transactions
                    ? <Spinner />
                    : <Line options={options} data={data} />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}