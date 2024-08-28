import {createAsyncThunk} from '@reduxjs/toolkit';
import MemberService from "./service";
import { actionTypes } from './actionTypes';

// export const getMembersAsync = createAsyncThunk (
//     actionTypes.GET_MEMBERS,
//     async () => {
//         return await MemberService.getMembers();
//     }
// );

export const getMembersAsync = createAsyncThunk(
    actionTypes.GET_MEMBERS,
    async ({ page, pageSize } = { page: 1, pageSize: 5 }) => {
        return await MemberService.getMembers({ page, pageSize });
    }
);

export const addMemberAsync = createAsyncThunk (
    actionTypes.ADD_MEMBER,
    async (member) => {
        return await MemberService.addMember(member);
    }
);

export const deleteMemberAsync = createAsyncThunk (
    actionTypes.DELETE_MEMBER,
    async (index) => {
        return await MemberService.deleteMember(index);
    }
);

export const deleteAllMembersAsync = createAsyncThunk (
    actionTypes.DELETE_ALL_MEMBERS,
    async () => {
        return await MemberService.deleteAllMembers();
    }
);

export const editMemberAsync = createAsyncThunk (
    actionTypes.EDIT_MEMBER,
    async (payload) => {
        return await MemberService.editMember(payload.index, payload);
    }
);

export const getMembersByAgeRangeAsync = createAsyncThunk (
    actionTypes.GET_MEMBERS_BY_AGE_RANGE,
    async ({minAge, maxAge}) => {
        return await MemberService.getMembersByAgeRange({minAge, maxAge});
    }
);

