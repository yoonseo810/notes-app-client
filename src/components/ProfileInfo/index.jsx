import { getInitials } from '../../utils/helper';
import PropTypes from 'prop-types';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from '@nextui-org/react';

const ProfileInfo = ({
  userInfo,
  onLogout,
  onChangeDetails,
  setUpdateMode,
}) => {
  return (
    <div className="flex items-center gap-3">
      <Popover placement="left">
        <PopoverTrigger>
          <div className="cursor-pointer w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
            {getInitials(userInfo?.fullName)}
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4 flex flex-col gap-3">
            <p className="text-lg">{userInfo?.fullName}</p>
            <hr />
            <Button
              color="primary"
              onClick={() => {
                setUpdateMode('user');
                onChangeDetails();
              }}
            >
              Change Details
            </Button>
            <Button
              color="primary"
              onClick={() => {
                setUpdateMode('password');
                onChangeDetails();
              }}
            >
              Change Password
            </Button>
            <Button onClick={onLogout}>Log Out</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

ProfileInfo.propTypes = {
  onLogout: PropTypes.func,
  userInfo: PropTypes.object,
  onChangeDetails: PropTypes.func,
  setUpdateMode: PropTypes.func,
};

ProfileInfo.defaultProps = {
  onLogout: () => {},
  userInfo: {},
  onChangeDetails: () => {},
  setUpdateMode: () => {},
};

export default ProfileInfo;
