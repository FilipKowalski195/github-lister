
import { fetchRepositories, selectError, selectLength, selectLoading, selectUser } from '../../features/repositories/repositoriesSlice'
import { useDispatch, useSelector, } from 'react-redux'
import { useEffect, useState } from 'react'
import { Fade, CircularProgress } from '@material-ui/core'
import InfoAlert from './infoAlert'


import RepositoriesTable  from './repositoriesTable'
import DetailedInfo from './detailedInfo'


export const RepositoriesView = () => {
 
  const dispatch = useDispatch()

  const error = useSelector(selectError)
  const loading = useSelector(selectLoading)
  const length = useSelector(selectLength)
  const name = useSelector(selectUser)

  const [checked, setChecked] = useState(false); 
  const [dialogOpen, setDialogOpen] = useState(false)
  const [detailedId, setDetailedId] = useState(0)

  useEffect(() => { 
    (length > 0 && error > -1) ? setChecked(true) : setChecked(false)
  }, [error, length])

  useEffect(() => {
    if (name !== '') { 
        dispatch(fetchRepositories(name))
      }
    }, [name, dispatch])

  const onRowClickHandler = (id) => { 
    setDetailedId(id)
    setDialogOpen(true)
  }

  const onCloseHandle = () => { 
    setDialogOpen(false)
  }

  return (

  
  <div style={{textAlign: 'center'}}> 
      
      <InfoAlert />
      
      { loading !== 'idle' ?
        <CircularProgress style={{marginTop: '25px'}} color="secondary" /> 
        :
        <Fade in={checked} >

            <div style={{height: '450px', width: "100%", marginTop: '20px'}}>
              <RepositoriesTable onRowClickHandler={onRowClickHandler}/> 
            </div> 
        </Fade>  
         
      } 
      {detailedId !== 0 ? <DetailedInfo open={dialogOpen} onCloseHandle={onCloseHandle} id={detailedId}/> : ''}
    </div>
  );
}
