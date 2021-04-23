import { useMemo } from 'react'
import { fetchRepositories, selectError, selectLoading, selectRepositories } from './features/repositories/repositoriesSlice'
import { useDispatch, useSelector, } from 'react-redux'
import { useEffect, useState } from 'react'
import { Fade, CircularProgress } from '@material-ui/core'
import InfoAlert from './infoAlert'
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


const columns = [
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
  const [valueToOrderBy, setValueToOrderBy] = useState('stars')
  const [sortingDirection, setSortingDirection] = useState('desc')
  
    useEffect(() => {
      if (props.name !== '') { 
          dispatch(fetchRepositories(props.name))
          setValueToOrderBy('stars')
          setSortingDirection("desc")
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

    const handleRowClick = (field) => { 
      const isAscending = (valueToOrderBy === field && sortingDirection === 'asc')
      setValueToOrderBy(field)
      setSortingDirection(isAscending ? 'desc' : 'asc')
    }

    function descendingComparator(a, b, orderBy) {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }
    
    function getComparator(order, orderBy) {
      return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    }
    
    function stableSort(array, comparator) {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
    }
  return (
    <div style={{textAlign: 'center'}}> 

      <InfoAlert err={error} length={repos.length} name={props.name}/>

      {loading !== 'idle' ? <CircularProgress style={{marginTop: '25px'}} color="secondary" /> :
        <Fade in={checked}>
            <div style={{height: '450px', width: "100%", marginTop: '20px'}}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {columns.map(row => (
                      <TableCell>
                      <TableSortLabel active={valueToOrderBy === row.field} direction={sortingDirection} onClick={() => handleRowClick(row.field)}>
                        {row.headerName}
                      </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stableSort(rows, getComparator(sortingDirection, valueToOrderBy)).map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">{row.name}</TableCell>
                      <TableCell align="center">{row.stars}</TableCell>
                      <TableCell align="center">{row.forks}</TableCell>
                      <TableCell align="center">{row.lang}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer> 
            </div> 
        </Fade>
      }
    </div>
  );
}
