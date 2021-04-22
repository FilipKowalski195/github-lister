import { useMemo } from 'react'
import { selectRepositories, fetchRepositories, selectError } from './features/repositories/repositoriesSlice'
import { useDispatch, useSelector, } from 'react-redux'
import { useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { Alert } from '@material-ui/lab'
import { Fade, CircularProgress } from '@material-ui/core'


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
  const loading = useSelector(state => state.repositories.loading)
  const [checked, setChecked] = useState(false); 
  const [sortModel, setSortModel] = useState([
    { field: 'stars', sort: 'desc' },
  ]);
  
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

    const alert = useMemo(() => {
      if (error === -1 || props.name === '') return <Alert severity="info">Enter github username</Alert>
      else if (error === 0 && repos.length === 0) return <Alert severity="warning"> User had no public repositories </Alert> 
      else if (error === 0) return <Alert severity="success"> Found {repos.length} repozitories </Alert> 
      return <Alert severity="error">Error - Repositories not Found! </Alert>
    }, [error, repos, props.name])
      
  return (
    <div style={{textAlign: 'center'}}> 
      {alert} 
      {loading !== 'idle' ? <CircularProgress style={{marginTop: '25px'}} color="secondary" /> :
        <Fade in={true}>
            <div style={{width: "100%", marginTop: '20px'}}>
              <DataGrid rows={rows} columns={columns} pageSize={7} autoHeight sortModel={sortModel}/> 
            </div> 
        </Fade>
      }
    </div>
  );
}
