import Spinner from "../_components/Spinner";

function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p>Loading data for Cabin...</p>
    </div>
  );
}

export default Loading;
