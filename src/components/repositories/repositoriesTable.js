import { useMemo } from 'react'
import { selectRepositories} from '../../features/repositories/repositoriesSlice'
import { useSelector, } from 'react-redux'
import { useEffect, useState } from 'react'
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
  TablePagination 
  } from '@material-ui/core'


const columns = [
{ id: 0,field: 'name', headerName: 'Repository name' },
{ id: 1,field: 'stars', headerName: 'Stars no.' },
{ id: 2,field: 'forks', headerName: 'Forks no.' },
{ id: 3,field: 'lang', headerName: 'Programming language'},
];

const useStyles = makeStyles(() => ({
    root: { 
      '&:hover': { 
        cursor: 'pointer',
        backgroundColor: '#f0f0f0',
      }
    }
}));
  
export default function RepositoriesTable(props) {

    const classes = useStyles()

    const repos = useSelector(selectRepositories)

    const [valueToOrderBy, setValueToOrderBy] = useState('stars')
    const [sortingDirection, setSortingDirection] = useState('desc')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
            setValueToOrderBy('stars')
            setSortingDirection("desc")
        }, [])
    
    const rows = useMemo(() => repos
    .map((data) => { 
      return {
        id: data.id,
        name: data.name, 
        stars: data.stargazers_count,
        forks: data.forks,
        lang: data.language ? data.language : "Not specified"
      }
    }), [repos])


    const handleHeaderClick = (field) => { 
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

      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    return (
            <TableContainer component={Paper}>
            <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                {columns.map(column => (
                    <TableCell key={column.id}>
                    <TableSortLabel active={valueToOrderBy === column.field} direction={sortingDirection} onClick={() => handleHeaderClick(column.field)}>
                        {column.headerName}
                    </TableSortLabel>
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {stableSort(rows, getComparator(sortingDirection, valueToOrderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                <TableRow 
                    className={classes.root} 
                    key={row.id} 
                    onClick={() => props.onRowClickHandler(row.id)}
                >
                    <TableCell component="th" scope="row" style={{width:'300px'}}>{row.name}</TableCell>
                    <TableCell align="center">{row.stars}</TableCell>
                    <TableCell align="center">{row.forks}</TableCell>
                    <TableCell align="center">{row.lang}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </TableContainer>
 
    )
}
