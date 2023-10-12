import { Header } from "@/components/menu";
import Empty from "./Empty";

export default function EmptyIndex() {
  return (
    <main>
      <Header />
      <div className="main">
        <div className="main__container">
          <Empty />
        </div>  
      </div>
    </main>
  )

}