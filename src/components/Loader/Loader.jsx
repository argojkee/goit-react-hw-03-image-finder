import { CirclesWithBar } from 'react-loader-spinner';

const Loader = () => {
  return (
    <CirclesWithBar
      height="100"
      width="100"
      color="#4fa94d"
      wrapperStyle={{
        position: 'absolute',
        left: '50%',
      }}
      wrapperClass="loader"
      visible={true}
      outerCircleColor=""
      innerCircleColor=""
      barColor=""
      ariaLabel="circles-with-bar-loading"
    />
  );
};

export default Loader;

// import { CirclesWithBar } from 'react-loader-spinner';

// const Loader = () => {
//   return (
//     <CirclesWithBar
//       height="100"
//       width="100"
//       color="#4fa94d"
//       wrapperStyle={{
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//       }}
//       wrapperClass="loader"
//       visible={true}
//       outerCircleColor=""
//       innerCircleColor=""
//       barColor=""
//       ariaLabel="circles-with-bar-loading"
//     />
//   );
// };

// export default Loader;
