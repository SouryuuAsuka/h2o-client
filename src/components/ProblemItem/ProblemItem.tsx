import { numberWithSpaces } from "@/utils";
type Props={
  amount?:number;
  title?:string;
}
export default function ProblemItem({amount=10000, title=''}:Props) {
  const status = amount > 50000 ? 'warning' : '';
  return (
    <div className='company__problems_item'>
      <div className={'company__problems_item_image'}>
        <div className={'company__problems_item_image_icon ' + status}>
          !
        </div>
      </div>
      <div className='company__problems_item_body'>
        <div className='company__problems_item_body_title'>
          {title}
        </div>
        <div className='company__problems_item_body_amount'>
          ₽ {numberWithSpaces(amount)}
        </div>
      </div>
    </div>
  )
}