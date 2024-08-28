import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MemberCard from './MemberCard';
import { setCurrentPage, showCards, hideCards } from '../features/membersSlice';
import MemberDetail from './MemberDetail';
import AgeRangeFilter from './AgeRangeFilter';
import { deleteAllMembersAsync, getMembersAsync , getMembersByAgeRangeAsync } from '../features/thunks';

const MemberList = () => {
  const data = useSelector((state) => state.members);
  const members = data.members;
  const pagination = data.pagination;
  const showCardsState = data.showCards;
  const popupMemberName = data.popupMemberName;
  const ageRange = data.ageRange;
  const currentPage = pagination.page;

  const popupMember = members.find((member) => member.name === popupMemberName);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMembersAsync({ page: currentPage, pageSize: pagination.perPage }));
  }, [currentPage, pagination.perPage, dispatch]);

  const handleClearAll = () => {
    dispatch(deleteAllMembersAsync()).then(() => {
      dispatch(getMembersAsync({ page: 1, pageSize: pagination.perPage }));
    });
  };

  const handleShowCards = () => {
    dispatch(showCards());
  };

  const handleHideCards = () => {
    dispatch(hideCards());
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      dispatch(setCurrentPage(newPage));
    }
  };

  const filteredMembers = members.filter(
    (member) => member.age >= ageRange[0] && member.age <= ageRange[1]
  );

  return (
    <div className="cards-container">
      <div className="button-group">
        <button onClick={handleShowCards}>Show Cards</button>
        <button onClick={handleHideCards}>Hide Cards</button>
        <button className="right-button" onClick={handleClearAll}>
          Delete All Cards
        </button>
      </div>
      <div className="filter">
          <AgeRangeFilter />
      </div>
      <div id="memberList" className={showCardsState ? '' : 'hidden'}>
        {filteredMembers.map((member, index) => (
          <MemberCard key = {index} member={member} index={index + (currentPage - 1) * 5} />
        ))}
      </div>
      <div>
        <MemberDetail member={popupMember}/>
      </div> 
      <div className="pagination-controls">
        <p>Current Page: {currentPage}</p>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= pagination.totalPages}>Next</button>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
      </div>

    </div>
  );
};

export default MemberList;