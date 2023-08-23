import PropTypes from 'prop-types';

const Button = ({ handlerLoadMore }) => {
  return (
    <button
      onClick={() => handlerLoadMore()}
      className="button-load-more"
      type="button"
    >
      Load more
    </button>
  );
};
export default Button;
Button.propTypes = {
  handlerLoadMore: PropTypes.func.isRequired,
};

// import PropTypes from 'prop-types';

// const Button = ({ handlerFetch, searchText }) => {
//   return (
//     <button
//       onClick={e => handlerFetch(searchText, e.target.nodeName)}
//       className="button-load-more"
//       type="button"
//     >
//       Load more
//     </button>
//   );
// };
// export default Button;

// Button.propTypes = {
//   handlerLoadMore: PropTypes.func.isRequired,
// };
