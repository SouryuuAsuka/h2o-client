import 'chartjs-adapter-date-fns';

import { useEffect } from "react";
import { useAppSelector, useFilteredTransactions } from "@/hooks";
import { useDispatch } from "react-redux";
import { genProblems, genStats, getTransactions } from "@/frameworks/redux/sagas";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import { useSearchParams } from "react-router-dom";
import Spinner from '@/components/UI/spinner/Spinner';
import { Helmet } from "react-helmet";
import SummaryCard from '@/components/SummaryCard/SummaryCard';
import ProblemItem from '@/components/ProblemItem/ProblemItem';

ChartJS.register(
  ...registerables
);

export default function ReportsCompany() {
  const dispatch = useDispatch()
  let [searchParams, setSearchParams] = useSearchParams();
  const user = useAppSelector((state) => state.user);
  const loading = useAppSelector((state) => state.data.loading);
  const transactions = useAppSelector((state) => state.data.transactions);
  const stats = useAppSelector((state) => state.data.stats);
  const problems = useAppSelector((state) => state.data.problems);
  const [expanses, income, profits] = useFilteredTransactions(transactions, searchParams.get('i'), searchParams.get('g'));

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
    dispatch(genProblems());
    setTimeout(() => {
      dispatch(genStats());
    }, 1500)
  }, []);
  useEffect(() => {
    if (user.isLogin && searchParams.get("i")) {
      dispatch(getTransactions(searchParams.get("i")));
    }
  }, [user.isLogin, searchParams.get("i")]);

  let scales: any;

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

  
  const data = {
    datasets: [
      {
        label: 'Затраты',
        data: expanses ?? [],
        borderColor: 'rgb(48, 199, 220)',
        backgroundColor: 'rgba(48, 199, 220, 0.5)',
        lineTension: 0.4,
      },
      {
        label: 'Выручка',
        data: income ?? [],
        borderColor: 'rgb(115, 207, 122)',
        backgroundColor: 'rgba(115, 207, 122, 0.5)',
        lineTension: 0.4,
      },
      {
        label: 'Прибыль',
        data: profits ?? [],
        borderColor: 'rgb(69, 170, 242)',
        backgroundColor: 'rgba(69, 170, 242, 0.5)',
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
        <div className='main__body_left'>
          <div className='company__summary'>
            <SummaryCard param='all' persent={(stats.business.persent * 10 + stats.client.persent * 10) / 20}  amount={stats.business.amount + stats.client.amount}/>
            <SummaryCard param='bus' persent={stats.business.persent}  amount={stats.business.amount}/>
            <SummaryCard param='cli' persent={stats.client.persent}  amount={stats.client.amount}/>
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
        <div className='main__body_right'>
          <div className='company__problems'>
            <div className="card">
              <div className="card__container">
                <div className="card__header">
                  <h2>
                    Проблемные зоны
                  </h2>
                </div>
                <div className="card__body">
                  {
                    problems.map((pr) => (
                      <ProblemItem key={pr.id} amount={pr.amount} title={pr.title} />
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}