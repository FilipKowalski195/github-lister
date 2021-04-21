import { useMemo } from 'react'
import { selectRepositories, fetchRepositories } from './features/repositories/repositoriesSlice'
import { useDispatch, useSelector, } from 'react-redux'
import { useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid';


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
  console.log("render")
    useEffect(() => {
      if (props.name !== '') { 
        dispatch(fetchRepositories(props.name))
        }
      }, [props.name, dispatch])
  
    const rows = useMemo(() =>  repos.map((data) => { 
      return {
        id: data.id,
        name: data.name, 
        stars: data.stargazers_count,
        forks: data.forks,
        lang: data.language
      }
    }), [repos])

 
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}
