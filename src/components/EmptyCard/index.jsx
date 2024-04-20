import PropTypes from 'prop-types';

const EmptyCard = ({ isSearch }) => {
  const accessToken = localStorage.getItem('token') ?? '';

  let message;

  if (!accessToken) {
    message = 'Please log in first to view your notes.';
  } else if (isSearch) {
    message = 'No data found, please search again.';
  } else {
    message =
      "There aren't any notes. Start creating notes by clicking + icon.";
  }
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <p className="w-1/2 text-2xl font-medium text-slate-700 text-center leading-7 mt-5">
        {message}
      </p>
      {/* <p className="w-1/2 text-4xl font-medium text-slate-700 text-center leading-7 mt-5">
        {''}
      </p> */}
    </div>
  );
};

EmptyCard.propTypes = {
  isSearch: PropTypes.bool,
};

EmptyCard.defaultProps = {
  isSearch: false,
};

export default EmptyCard;
