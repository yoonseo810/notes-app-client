import { useState } from 'react';
import TagInput from '../../components/TagInput';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';
import * as Yup from 'yup';
import { useFormik } from 'formik';
// import classNames from 'classnames';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import { Button } from '@nextui-org/react';

const AddEditNotes = ({ noteData, type, onClose, getAllNotes }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const notesValidationSchema = Yup.object().shape({
    title: Yup.string().required('Title cannot be empty'),
    content: Yup.string().required('Content cannot be empty'),
  });
  const [tags, setTags] = useState(noteData?.tags || []);

  const { touched, handleBlur, errors, values, handleChange } = useFormik({
    initialValues: {
      title: noteData?.title || '',
      content: noteData?.content || '',
    },
    validationSchema: notesValidationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  const addNewNote = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/api/notes/add', {
        title: values.title,
        content: values.content,
        tags,
      });

      if (response.data && response.data.note) {
        toast.success('Note added successfully');
        setLoading(false);
        getAllNotes();
        onClose();
      }
    } catch (error) {
      //
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const editNote = async () => {
    const noteId = noteData._id;
    setLoading(true);
    try {
      const response = await axiosInstance.put(`/api/notes/edit/${noteId}`, {
        title: values.title,
        content: values.content,
        tags,
      });

      if (response.data && response.data.note) {
        toast.success('Note updated successfully');
        setLoading(false);
        getAllNotes();
        onClose();
      }
    } catch (error) {
      //
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const handleAddNote = () => {
    if (type === 'edit') {
      editNote();
    } else {
      addNewNote();
    }
  };

  const isDisabled = Object.values(errors).some((error) => error);

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          id="title"
          name="title"
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Add title..."
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.title && errors?.title && (
          <p className="text-red-500 text-xs pb-4">{errors.title}</p>
        )}
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          id="content"
          name="content"
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Add content..."
          rows={10}
          value={values.content}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.content && errors?.content && (
          <p className="text-red-500 text-xs pb-4">{errors.content}</p>
        )}
      </div>
      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      <Button
        onPress={handleAddNote}
        className="mt-5 p-3"
        isDisabled={isDisabled || loading}
        isLoading={loading}
        color="primary"
        fullWidth
      >
        {loading ? 'Loading' : type === 'edit' ? 'UPDATE' : 'ADD'}
      </Button>
      {/* <button
        disabled={isDisabled || loading}
        className={classNames(
          'btn-primary font-medium mt-5 p-3',
          (isDisabled || loading) &&
            'cursor-not-allowed bg-gray-300 hover:bg-gray-900'
        )}
        onClick={handleAddNote}
      >
        {loading ? 'Loading...' : type === 'edit' ? 'UPDATE' : 'ADD'}
      </button> */}
      {error && <p className="text-red-500 text-xs pb-4">{error}</p>}
    </div>
  );
};

AddEditNotes.propTypes = {
  noteData: PropTypes.object,
  type: PropTypes.string,
  onClose: PropTypes.func,
  getAllNotes: PropTypes.func,
};

AddEditNotes.defaultProps = {
  type: 'add',
  noteData: {},
  onClose: () => {},
  getAllNotes: () => {},
};

export default AddEditNotes;
