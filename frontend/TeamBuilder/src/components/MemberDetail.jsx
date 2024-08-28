import React from 'react';
import { useDispatch } from 'react-redux';
import { popupCard } from '../features/membersSlice';


const MemberDetail = ({ member }) => {
  const dispatch = useDispatch();

  const handlePopup = () => {
    dispatch(popupCard(null));
  };
  
  if (!member) return null;

  return (
    <div className="memberDetail">
        <img src={member.image_url} alt={member.name} className="member-photo"  />
        <h2 className="member-name">
        {member.name}
        {member.ranking != null && <span className="member-ranking"> (Ranking: {member.ranking})</span>}
      </h2>
        <p className="member-description">{member.description}</p>
        <h2 className="member-age">Age: {member.age} ({member.gender})</h2>
        <button className="close-btn" onClick={handlePopup}>
          Close
        </button>    
    </div>
  );
};

export default MemberDetail;
