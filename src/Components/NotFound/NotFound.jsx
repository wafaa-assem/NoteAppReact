import notFoundPage from "./../../assets/images/error.jpg";

export const NotFound = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <img src={notFoundPage} className="w-full " alt="Not Found" />
    </div>
  );
};
