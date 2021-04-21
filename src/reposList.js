import { selectRepositories, fetchRepositories } from './features/repositories/repositoriesSlice'
import { useDispatch, useSelector, } from 'react-redux'
import { useEffect } from 'react'
import { 
  Paper,
  Table,
  TableContainer, 
  TableCell, 
  TableHead, 
  TableBody, 
  TableRow 
} from '@material-ui/core'


export const ReposList = (props) => {
    const dispatch = useDispatch()
    const repos = useSelector(selectRepositories)
 
    useEffect(() => {
      if (props.name !== '') { 
        dispatch(fetchRepositories(props.name))
        }
      }, [props.name, dispatch])
  
    return (
      
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Stars</TableCell>
            <TableCell align="center">Forks</TableCell>
            <TableCell align="center">Programming language</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {repos.slice().sort((a, b) => a.stargazers_count < b.stargazers_count ? 1 : -1).map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.stargazers_count}</TableCell>
              <TableCell align="center">{row.forks}</TableCell>
              <TableCell align="center">{row.language}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
    )
  }