import PropTypes from 'prop-types';
import { Input } from '@nextui-org/react';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const ChangePassword = ({
  newPassword,
  setNewPassword,
  confirmNewPassword,
  setConfirmNewPassword,
}) => {
  const [isVisible, setIsVisible] = useState({
    password: false,
    confirm: false,
  });
  const passwordsMatch = newPassword === confirmNewPassword;

  const isPasswordLongEnough = (password) => password.length >= 8;

  return (
    <>
      <Input
        isRequired
        label="New Password"
        placeholder="New Password"
        value={newPassword}
        onValueChange={setNewPassword}
        isInvalid={!isPasswordLongEnough(newPassword)}
        color={!isPasswordLongEnough(newPassword) ? 'danger' : 'success'}
        errorMessage={
          !isPasswordLongEnough(newPassword) &&
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
        value={confirmNewPassword}
        onValueChange={setConfirmNewPassword}
        isInvalid={!passwordsMatch || !isPasswordLongEnough(confirmNewPassword)}
        color={
          !passwordsMatch || !isPasswordLongEnough(confirmNewPassword)
            ? 'danger'
            : 'success'
        }
        errorMessage={
          (!passwordsMatch || !isPasswordLongEnough(confirmNewPassword)) &&
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

ChangePassword.propTypes = {
  newPassword: PropTypes.string,
  setNewPassword: PropTypes.func,
  confirmNewPassword: PropTypes.string,
  setConfirmNewPassword: PropTypes.func,
};

ChangePassword.defaultProps = {
  newPassword: '',
  setNewPassword: () => {},
  confirmNewPassword: '',
  setConfirmNewPassword: () => {},
};

export default ChangePassword;
