import PropTypes from 'prop-types';
import { Input } from '@nextui-org/react';
import { useMemo } from 'react';

const EditUser = ({ newName, setNewName, newEmail, setNewEmail }) => {
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isEmailInvalid = useMemo(() => {
    if (newEmail === '') return false;

    return validateEmail(newEmail) ? false : true;
  }, [newEmail]);

  return (
    <>
      <Input
        isRequired
        type="text"
        label="Name"
        value={newName}
        onValueChange={setNewName}
      />
      <Input
        isRequired
        type="email"
        label="Email"
        value={newEmail}
        onValueChange={setNewEmail}
        isInvalid={isEmailInvalid}
        color={isEmailInvalid ? 'danger' : 'success'}
        errorMessage={isEmailInvalid && 'Please enter a valid email'}
      />
    </>
  );
};

EditUser.propTypes = {
  newName: PropTypes.string,
  setNewName: PropTypes.func,
  newEmail: PropTypes.string,
  setNewEmail: PropTypes.func,
};

EditUser.defaultProps = {
  newName: '',
  setNewName: () => {},
  newEmail: '',
  setNewEmail: () => {},
};
export default EditUser;
