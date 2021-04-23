import { useMemo } from 'react'
import { fetchRepositories, selectError, selectLoading, selectRepositories } from './features/repositories/repositoriesSlice'
import { useDispatch, useSelector, } from 'react-redux'
import { useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { Fade, CircularProgress } from '@material-ui/core'
import InfoAlert from './infoAlert'


const columns = [
  { field: 'id', headerName: 'ID', width: 70, hide: true},
  { field: 'name', headerName: 'Repository name', width: 180 },
  { field: 'stars', headerName: 'Stars no.', type: 'number', width: 150 },
  { field: 'forks', headerName: 'Forks no.', type: 'number', width: 150 },
  { field: 'lang', headerName: 'Programming language', width: 250 },
];

export const ReposList = (props) => {
 
  const dispatch = useDispatch()
  const repos = useSelector(selectRepositories)
  const error = useSelector(selectError)
  const loading = useSelector(selectLoading)
  const [checked, setChecked] = useState(false); 
  const sortModel = [{ field: 'stars', sort: 'desc' }]
  
    useEffect(() => {
      if (props.name !== '') { 
          dispatch(fetchRepositories(props.name))
        }
      }, [props.name, dispatch])
  
    useEffect(() => { 
      (repos.length > 0 && error > -1) ? setChecked(true) : setChecked(false)

    }, [error, repos])

    const rows = useMemo(() => repos
    .map((data) => { 
      return {
        id: data.id,
        name: data.name, 
        stars: data.stargazers_count,
        forks: data.forks,
        lang: data.language
      }
    }), [repos])

    
      
  return (
    <div style={{textAlign: 'center'}}> 
      <InfoAlert err={error} length={repos.length} name={props.name} loading={loading}/>
      {loading !== 'idle' ? <CircularProgress style={{marginTop: '25px'}} color="secondary" /> :
        <Fade in={checked}>
          
            <div style={{width: "100%", marginTop: '20px'}}>
              <DataGrid rows={rows} columns={columns} pageSize={7} autoHeight sortModel={sortModel} /> 
            </div> 
        </Fade>
      }
    </div>
  );
}
