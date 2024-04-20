import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import NoteCard from '../../components/NoteCard';
import { MdAdd, MdDeleteOutline } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import EmptyCard from '../../components/EmptyCard';
import toast from 'react-hot-toast';
import EditUserModal from '../../components/EditUserModal';
import { useDisclosure } from '@nextui-org/react';

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });

  const [updateMode, setUpdateMode] = useState('');

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);

  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get('/api/notes/all');
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      toast.error('Please log in first', {
        id: 'login',
      });
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axiosInstance('/api/users/getUser');
        if (response.data && response.data.user) {
          setUserInfo(response.data.user);
        }
      } catch (error) {
        if (error.response.status === 401) {
          localStorage.clear();
          navigate('/login');
        }
      }
    };
    getUserInfo();
    getAllNotes();
    return () => {};
  }, [navigate]);

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: 'edit' });
  };

  const handleCloseModal = () => {
    setOpenAddEditModal((curr) => {
      return {
        ...curr,
        isShown: false,
      };
    });
  };

  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete(
        `/api/notes/delete/${noteId}`
      );

      if (response.data && response.data.success) {
        toast('Note deleted successfully', {
          style: {
            color: 'red',
          },
          icon: <MdDeleteOutline />,
        });
        getAllNotes();
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again');
    }
  };

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get('/api/notes/searchNotes', {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (err) {
      toast.error('An unexpected error occurred. Please try again');
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(
        `/api/notes/updatePinned/${noteId}`,
        {
          isPinned: !noteData.isPinned,
        }
      );

      if (response.data && response.data.note) {
        toast.success('Note updated successfully');
        getAllNotes();
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again');
    }
  };

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
        onChangeDetails={onOpen}
        setUpdateMode={setUpdateMode}
      />
      <div className="container mx-auto">
        {allNotes?.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {allNotes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                date={note.createdOn}
                onEdit={() => handleEdit(note)}
                onDelete={() => deleteNote(note)}
                onPinNote={() => updateIsPinned(note)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard isSearch={isSearch} />
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal((curr) => {
            return {
              ...curr,
              isShown: true,
              data: null,
              type: 'add',
            };
          });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        ariaHideApp={false}
        isOpen={openAddEditModal.isShown}
        onRequestClose={handleCloseModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.2)',
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={handleCloseModal}
          getAllNotes={getAllNotes}
        />
      </Modal>

      {isOpen && (
        <EditUserModal
          userInfo={userInfo}
          isModalOpen={isOpen}
          onOpenChange={onOpenChange}
          setUserInfo={setUserInfo}
          updateMode={updateMode}
        />
      )}
    </>
  );
};

export default Home;
