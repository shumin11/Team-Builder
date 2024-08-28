import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMemberAsync, getMembersAsync } from '../features/thunks';

const MemberForm = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.members.pagination.page);
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    age: 10,
    image_url: '',
    gender: ''
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addMemberAsync(formState)).then(() => {
      dispatch(getMembersAsync({ page: currentPage, pageSize: 5 }));
    });
    setFormState({ name: '', description: '', age: 10, image_url: '', gender: ''});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-25">
          <label htmlFor="name">Member Name:</label>
        </div>
        <div className="col-75">
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="Member's name..."
          />
        </div>
      </div>
      <div className="row">
        <div className="col-25">
          <label htmlFor="description">Description of member:</label>
        </div>
        <div className="col-75">
          <input
            type="text"
            id="description"
            name="description"
            value={formState.description}
            onChange={handleChange}
            placeholder="Description of the member..."
          />
        </div>
      </div>
      <div className="row">
        <div className="col-25">
          <label htmlFor="age">Member age:</label>
        </div>
        <div className="col-75">
          <select
            id="age"
            name="age"
            value={formState.age}
            onChange={handleChange}
          >
            {[...Array(100).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-25">
          <label htmlFor="image_url">Image of member:</label>
        </div>
        <div className="col-75">
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={formState.image_url}
            onChange={handleChange}
            placeholder="URL of member's image..."
          />
        </div>
      </div>
      <div className="row">
        <div className="col-25">
          <label htmlFor="gender">Gender :</label>
        </div>
        <div className="col-75">
          <input
            type="text"
            id="gender"
            name="gender"
            value={formState.gender}
            onChange={handleChange}
            placeholder="Member's gender..."
          />
        </div>
      </div>
      <div className="row">
        <button type="submit">Add Member</button>
        <button type="button" onClick={() => setFormState({ name: '', description: '', age: 10, image_url: ''})}>
          Clear
        </button>
      </div>
    </form>
  );
};

export default MemberForm;