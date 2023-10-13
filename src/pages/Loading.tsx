import Spinner from "@/components/elements/Spinner";

export default function Loading() {

  return (
    <div className="loading">
      <div className="loading__container">
        <div className="loading__spinner">
          <Spinner />
        </div>
      </div>
    </div>
  )
}