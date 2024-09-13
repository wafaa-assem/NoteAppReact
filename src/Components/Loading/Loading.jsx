import { Hearts } from "react-loader-spinner";

export const Loading = () => {
  return (
    <>
      <div className="min-h-screen bg-slate-300 flex justify-center items-center">
        <Hearts
          height="100"
          width="100"
          color="white"
          ariaLabel="hearts-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </>
  );
};
