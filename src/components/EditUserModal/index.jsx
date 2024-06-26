import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import PropTypes from 'prop-types';
import EditUser from '../EditUser';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import ChangePassword from '../ChangePassword';

const EditUserModal = ({
  isModalOpen,
  onOpenChange,
  userInfo,
  setUserInfo,
  updateMode,
}) => {
  const { fullName, email, _id } = userInfo;
  const [newName, setNewName] = useState(fullName || '');
  const [newEmail, setNewEmail] = useState(email || '');

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUserUpdate = async () => {
    setLoading(true);
    try {
      const newUserDetail = {
        fullName: newName,
        email: newEmail,
        _id,
      };
      const response = await axiosInstance.put(
        'api/users/update',
        newUserDetail
      );
      if (response.data && response.data.success) {
        toast.success('User has been updated successfully');
        setUserInfo({ ...userInfo, fullName: newName, email: newEmail });
      }
    } catch (error) {
      toast.error(
        'Error occurred updating the user details. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.put('api/users/changePassword', {
        password: newPassword,
        _id,
      });

      if (response.data && response.data.success) {
        toast.success('Password has been updated successfully');
      }
    } catch (error) {
      toast.error('Error occurred updating the password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isChangeUserDetails = updateMode === 'user';

  const isButtonDisabled = isChangeUserDetails
    ? newEmail === '' || newName === ''
    : newPassword === '' ||
      confirmNewPassword === '' ||
      newPassword !== confirmNewPassword;

  // console.log(loading);
  return (
    <Modal isOpen={isModalOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              {isChangeUserDetails ? 'Edit User Details' : 'Change Password'}
            </ModalHeader>
            <ModalBody>
              {isChangeUserDetails ? (
                <EditUser
                  newName={newName}
                  setNewName={setNewName}
                  newEmail={newEmail}
                  setNewEmail={setNewEmail}
                />
              ) : (
                <ChangePassword
                  newPassword={newPassword}
                  setNewPassword={setNewPassword}
                  confirmNewPassword={confirmNewPassword}
                  setConfirmNewPassword={setConfirmNewPassword}
                />
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="warning" onPress={onClose}>
                Close
              </Button>
              <Button
                isLoading={loading}
                isDisabled={isButtonDisabled || loading}
                onPress={() => {
                  if (isChangeUserDetails) {
                    handleUserUpdate();
                  } else {
                    handleChangePassword();
                  }
                  // onClose();
                }}
                color="primary"
              >
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

EditUserModal.propTypes = {
  isModalOpen: PropTypes.bool,
  onOpenChange: PropTypes.func,
  userInfo: PropTypes.object,
  setUserInfo: PropTypes.func,
  updateMode: PropTypes.string,
};

EditUserModal.defaultProps = {
  isModalOpen: false,
  onOpenChange: () => {},
  userInfo: {},
  setUserInfo: () => {},
  updateMode: '',
};

export default EditUserModal;
