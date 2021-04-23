import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRepositories = createAsyncThunk(
  'repositories/fetchRepositories',
   async (username) => {
    return axios.get(`https://api.github.com/users/${username}/repos`)
    .then( 
        (response) => {
          return response.data
        }
  )  
})

export const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState: {
    error: -1,
    loading: 'idle',
    repositories: []
  },
  reducers: {},
  extraReducers: { 
      [fetchRepositories.pending]: state => { 
        if (state.loading === 'idle') { 
          state.loading = "pending"
        } 
      },
      [fetchRepositories.fulfilled]: (state, action) => { 
        if (state.loading === 'pending') { 
          state.loading = 'idle'
          state.repositories = action.payload
          state.error = 0
        }
      },
      [fetchRepositories.rejected]: (state, action) => { 
        if (state.loading === 'pending') { 
          state.loading = 'idle'
          state.repositories = []
          state.error = action.error
        }
      }
  }
})



export const selectRepositories = (state) => state.repositories.repositories;
export const selectError = (state) => state.repositories.error; 
export const selectLoading = (state) => state.repositories.loading; 

export default repositoriesSlice.reducer;
