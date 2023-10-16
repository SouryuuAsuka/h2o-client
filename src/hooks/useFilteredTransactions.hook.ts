import { LineData, Transaction } from "@/types"
import { useMemo } from "react"

export const useFilteredTransactions = (transactions: Transaction[], interval = 'week', group = 'all'): [LineData[], LineData[], LineData[]] => {
  return useMemo(() => {
    let expanses: LineData[] = [];
    let income: LineData[] = [];
    let expansesProxy = transactions ?? [];
    let incomeProxy = transactions ?? [];
    if (group === 'cli') {
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
    } else if (group === 'bus') {
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
    let expansesTempDateCollection = [];
    let incomeTempDateCollection = [];
    if (interval === 'year') {
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
        } else{
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

    let profits: LineData[] = [];
    expanses.map((tr) => {
      const formatedDate = tr.x;
      if (incomeTempDateCollection.includes(formatedDate)) {
        const index = incomeTempDateCollection.indexOf(formatedDate);
        const element = income[index];
        profits.push({ ...element, y: element.y - tr.y });
      } else {
        profits.push({ x: formatedDate, y: tr.y });
      }
    })
    return [expanses, income, profits]
  }, [transactions, interval, group])

}