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
    error: null,
    loading: 'idle',
    status: '',
    repositories: []
  },
  reducers: {},
  extraReducers: { 
      [fetchRepositories.pending]: state => { 
        if (state.loading === 'idle') { 
          console.log("pending")
          state.loading = "pending"
        } 
      },
      [fetchRepositories.fulfilled]: (state, action) => { 
        if (state.loading === 'pending') { 
          state.loading = 'idle'
          state.repositories = action.payload
          state.status = 'done'
        }
      },
      [fetchRepositories.rejected]: (state, action) => { 
        if (state.loading === 'pending') { 
          state.loading = 'idle'
          state.error = action.error
        }
      }
  }
})



export const selectRepositories = (state) => state.repositories.repositories;

export default repositoriesSlice.reducer;
