import {Helmet} from "react-helmet";

export default function Empty() {
  return (
    <>
      <Helmet>
        <title>Пустая страница</title>
      </Helmet>
      <h1>
        Пустая страница
      </h1>
      <div className="main__body">
      </div>
    </>
  )
}