import { tailspin } from "ldrs";

tailspin.register();

const Loading = () => {
  return (
    <div className="w-full h-[300px] flex justify-center items-center">
      <l-tailspin size="40" stroke="5" speed="0.9" color="rgb(13, 148, 136)"></l-tailspin>
    </div>
  );
};

export default Loading;
