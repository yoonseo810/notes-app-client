import PropTypes from 'prop-types';
import { Input } from '@nextui-org/react';
import { useState, useMemo } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const EditUser = ({
  fieldOne,
  setFieldOne,
  fieldTwo,
  setFieldTwo,
  isChangeUserDetails,
}) => {
  const [isVisible, setIsVisible] = useState({
    password: false,
    confirm: false,
  });

  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isEmailInvalid = useMemo(() => {
    if (isChangeUserDetails) {
      if (fieldTwo === '') return false;

      return validateEmail(fieldTwo) ? false : true;
    }
  }, [fieldTwo, isChangeUserDetails]);

  const passwordsMatch = fieldOne === fieldTwo;

  const isPasswordLongEnough = (password) => {
    return password.length >= 8;
  };

  if (isChangeUserDetails) {
    return (
      <>
        <Input
          isRequired
          type="text"
          label="Name"
          value={fieldOne}
          onValueChange={setFieldOne}
        />
        <Input
          isRequired
          type="email"
          label="Email"
          value={fieldTwo}
          onValueChange={setFieldTwo}
          isInvalid={isEmailInvalid}
          color={isEmailInvalid ? 'danger' : 'success'}
          errorMessage={isEmailInvalid && 'Please enter a valid email'}
        />
      </>
    );
  }

  return (
    <>
      <Input
        isRequired
        label="New Password"
        placeholder="New Password"
        value={fieldOne}
        onValueChange={setFieldOne}
        isInvalid={!isPasswordLongEnough(fieldOne)}
        color={!isPasswordLongEnough(fieldOne) ? 'danger' : 'success'}
        errorMessage={
          !isPasswordLongEnough(fieldOne) &&
          'Password must be at least 8 characters'
        }
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={() =>
              setIsVisible({ ...isVisible, password: !isVisible.password })
            }
          >
            {isVisible?.password ? (
              <FaRegEye
                size={22}
                className="text-2xl text-default-400 pointer-events-none"
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-2xl text-default-400 pointer-events-none"
              />
            )}
          </button>
        }
        type={isVisible?.password ? 'text' : 'password'}
      />
      <Input
        isRequired
        label="Confirm New Password"
        placeholder="Confirm New Password"
        value={fieldTwo}
        onValueChange={setFieldTwo}
        isInvalid={!passwordsMatch || !isPasswordLongEnough(fieldTwo)}
        color={
          !passwordsMatch || !isPasswordLongEnough(fieldTwo)
            ? 'danger'
            : 'success'
        }
        errorMessage={
          (!passwordsMatch || !isPasswordLongEnough(fieldTwo)) &&
          'Passwords must match!'
        }
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={() =>
              setIsVisible({ ...isVisible, confirm: !isVisible.confirm })
            }
          >
            {isVisible?.confirm ? (
              <FaRegEye
                size={22}
                className="text-2xl text-default-400 pointer-events-none"
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-2xl text-default-400 pointer-events-none"
              />
            )}
          </button>
        }
        type={isVisible?.confirm ? 'text' : 'password'}
      />
    </>
  );
};

EditUser.propTypes = {
  fieldOne: PropTypes.string,
  setFieldOne: PropTypes.func,
  fieldTwo: PropTypes.string,
  setFieldTwo: PropTypes.func,
  isChangeUserDetails: PropTypes.bool,
};

EditUser.defaultProps = {
  fieldOne: '',
  setFieldOne: () => {},
  fieldTwo: '',
  setFieldTwo: () => {},
  isChangeUserDetails: false,
};
export default EditUser;
