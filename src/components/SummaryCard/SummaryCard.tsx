import { numberWithSpaces } from "@/utils";
import Spinner from "@/components/UI/spinner/Spinner";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "@/hooks";

type Props = {
  persent: number;
  amount: number;
  param: string;
}
export default function SummaryCard({ persent, amount, param }: Props) {
  let [searchParams, setSearchParams] = useSearchParams();
  const loading = useAppSelector((state) => state.data.loading);
  const handleSetParams = (key: string, value: string) => {
    setSearchParams(params => {
      params.set(key, value);
      return params;
    });
  }
  return (
    <div className={"card clickable " + (searchParams.get('g') === param ? 'active' : '') + ' ' + (persent > 0 ? 'success' : 'fail')} onClick={() => handleSetParams('g', param)}>
      <div className="card__container">
        {
          loading.stats
            ? <div className='company__summary_body'>
              <div className='company__summary_stat ' >
                {persent} %
              </div>
              <div className='company__summary_sum'>
                ₽  {numberWithSpaces(amount)}
              </div>
              <div className='company__summary_subtitle'>
                Итоги
              </div>
            </div>
            : <div className='company__summary_spinner'>
              <Spinner />
            </div>
        }
      </div>
    </div>
  )
}