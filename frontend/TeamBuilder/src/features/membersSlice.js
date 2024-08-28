import { createSlice } from '@reduxjs/toolkit';
import { getMembersAsync, getMembersByAgeRangeAsync } from './thunks';


// follow https://react-redux.js.org/tutorials/quick-start tutorial
const initialState = {
    members: [],
    pagination: {
      page: 1,
      perPage: 5,
      total: 100,
      totalPages: 10,
    },
    showCards: true,
    popupMemberName: null,
    ageRange: [0, 100],
  };

  const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {

      // deleteMember: (state, action) => {
      //   state.members = state.members.filter((_, index) => index !== action.payload);
      // },
      // clearMembers: (state) => {
      //   state.members = [];
      // },
      setCurrentPage(state, action) {
        state.pagination.page = action.payload;
      },
      showCards: (state) => {
        state.showCards = true;
      },
      hideCards: (state) => {
        state.showCards = false;
      },
      popupCard: (state, action) => {
        state.popupMemberName = action.payload;
      },
      setAgeRange(state, action) {
        state.ageRange = action.payload;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(getMembersAsync.fulfilled, (state, action) => {
          state.members = action.payload;
        })
        .addCase(getMembersByAgeRangeAsync.fulfilled, (state, action) => {
          state.members = action.payload;
        });
    }
  });
  
  export const { setCurrentPage, showCards, hideCards , popupCard, setAgeRange} = membersSlice.actions;
  
  export default membersSlice.reducer;