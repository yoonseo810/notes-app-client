import ProfileInfo from '../ProfileInfo';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar';
import { useState } from 'react';
import PropTypes from 'prop-types';
import NavBarSkeleton from '../Skeletons/NavBarSkeleton';
// import {
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
//   Button,
// } from '@nextui-org/react';

const Navbar = ({
  userInfo,
  onSearchNote,
  handleClearSearch,
  onChangeDetails,
  setUpdateMode,
  getUserLoading,
  // view,
  // setView,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const onClearSearch = () => {
    setSearchQuery('');
    handleClearSearch();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes App</h2>
      {getUserLoading && <NavBarSkeleton />}
      {!getUserLoading && userInfo?.email && (
        <>
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            onClearSearch={onClearSearch}
            handleSearch={handleSearch}
          />
          <ProfileInfo
            userInfo={userInfo}
            onLogout={onLogout}
            onChangeDetails={onChangeDetails}
            setUpdateMode={setUpdateMode}
          />
        </>
      )}
      {/* {!getUserLoading && userInfo?.email && (
        // <div className="flex flex-row gap-16 items-center">
        //   <div className="flex flex-row gap-3 items-center">
        //     <p>Choose view</p>
        //     <Dropdown>
        //       <DropdownTrigger>
        //         <Button variant="bordered" className="capitalize">
        //           {view}
        //         </Button>
        //       </DropdownTrigger>
        //       <DropdownMenu
        //         aria-label="Single selection example"
        //         variant="flat"
        //         disallowEmptySelection
        //         selectionMode="single"
        //         selectedKeys={view}
        //         onSelectionChange={setView}
        //       >
        //         <DropdownItem key="card">Card</DropdownItem>
        //         <DropdownItem key="table">Table</DropdownItem>
        //       </DropdownMenu>
        //     </Dropdown>
        //   </div>

        // </div>
      )} */}
    </div>
  );
};

Navbar.propTypes = {
  userInfo: PropTypes.object,
  onSearchNote: PropTypes.func,
  handleClearSearch: PropTypes.func,
  onChangeDetails: PropTypes.func,
  onChangePassword: PropTypes.func,
  setUpdateMode: PropTypes.func,
  getUserLoading: PropTypes.bool,
  // view: PropTypes.object,
  // setView: PropTypes.func,
};

Navbar.defaultProps = {
  userInfo: {},
  onSearchNote: () => {},
  handleClearSearch: () => {},
  onChangeDetails: () => {},
  onChangePassword: () => {},
  setUpdateMode: () => {},
  getUserLoading: false,
  // view: {},
  // setView: () => {},
};

export default Navbar;
