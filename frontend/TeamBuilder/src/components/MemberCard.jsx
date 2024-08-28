import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { popupCard } from '../features/membersSlice';
import { deleteMemberAsync, getMembersAsync, editMemberAsync } from '../features/thunks';

const MemberCard = ({ member, index }) => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editedMember, setEditedMember] = useState(member);

  useEffect(() => {
    setEditedMember(member);
  }, [member]);

  const handleChange = (e) => {
    setEditedMember({ ...editedMember, [e.target.name]: e.target.value });
  };

  const handleDelete = () => {
    dispatch(deleteMemberAsync(index)).then(() => {
      const currentPage = Math.ceil((index + 1) / 5);
      console.log("index: ", index, "currentPage: ", currentPage);
      dispatch(getMembersAsync({ page: currentPage, pageSize: 5 }));
    });
  };

  const handlePopup = () => {
    dispatch(popupCard(member.name));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    // console.log("Editing member: ", editedMember);
    const payload = {...editedMember, index : index};
    dispatch(editMemberAsync(payload)).then(() => {
      console.log("index: ", index, "editedMember: ", editedMember, "payload: ", payload);
      const currentPage = Math.ceil((index + 1) / 5);
      dispatch(getMembersAsync({ page: currentPage, pageSize: 5 }));
      setIsEditing(false);
    }).catch((err) => {
      console.log("Update failed: ", err);
    });
  };

  return (
    <div className="member">
      {isEditing ? (
        <form onSubmit ={handleEdit}>
          <label htmlFor="name">Member Name:</label>
          <input type="text" id="name" name="name" value={editedMember.name} onChange={handleChange} />
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" name="description" value={editedMember.description} onChange={handleChange} />
          <label htmlFor="age">Member age:</label>
          <input id="age" name="age" value={editedMember.age} onChange={handleChange} />
          <label htmlFor="image_url">Image URL:</label>
          <input type="text" id="image_url" name="image_url" value={editedMember.image_url} onChange={handleChange} />
          <label htmlFor="gender">Member Gender:</label>
          <input type="text" id="gender" name="gender" value={editedMember.gender} onChange={handleChange} />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <div className="member-info" onClick={handlePopup}>
            <img src={member.image_url} alt={member.name} className="member-photo" />
            <h2 className="member-name">{member.name}</h2>
          </div>
          <div className="row">
            <button className="delete-btn" onClick={handleDelete}>
              Delete
            </button>
            <button className="edit-btn" onClick={() => setIsEditing(true)}> Edit </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberCard;