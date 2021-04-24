import { useMemo } from 'react'
import { fetchRepositories, selectError, selectLength, selectLoading, selectRepositories, selectUser } from './features/repositories/repositoriesSlice'
import { useDispatch, useSelector, } from 'react-redux'
import { useEffect, useState } from 'react'
import { Fade, CircularProgress, Dialog, DialogContent, DialogTitle, ListItem } from '@material-ui/core'
import InfoAlert from './infoAlert'
import { makeStyles } from '@material-ui/core/styles'
import { 
  TableSortLabel,
  TableCell,
  TableBody,
  TableRow,
  TableContainer, 
  Paper,
  Table, 
  TableHead, 
  } from '@material-ui/core'

import RepositoriesTable  from './repositoriesTable'


export const ReposList = () => {
 

  const dispatch = useDispatch()

  const error = useSelector(selectError)
  const loading = useSelector(selectLoading)
  const length = useSelector(selectLength)
  const name = useSelector(selectUser)
  const [checked, setChecked] = useState(false); 
  const [openDialog, setOpenDialog] = useState(true);

    useEffect(() => { 
      (length > 0 && error > -1) ? setChecked(true) : setChecked(false)
    }, [error, length])

    useEffect(() => {
      if (name !== '') { 
          dispatch(fetchRepositories(name))
        }
      }, [name, dispatch])

  return (
    <div style={{textAlign: 'center'}}> 

      <InfoAlert />
      
      { loading !== 'idle' ?
        <CircularProgress style={{marginTop: '25px'}} color="secondary" /> 
        :
        <Fade in={checked} >
            <div style={{height: '450px', width: "100%", marginTop: '20px'}}>
              <RepositoriesTable /> 
            </div> 
        </Fade>  
      } 
    </div>
  );
}
