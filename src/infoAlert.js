import React, { useMemo } from 'react'
import { Alert } from '@material-ui/lab'
import { useSelector } from 'react-redux'
import { selectError, selectLength, selectUser } from './features/repositories/repositoriesSlice'

export default function InfoAlert(props) {
    
    const error = useSelector(selectError)
    const reposLenght = useSelector(selectLength)
    const name = useSelector(selectUser)

    const alert = useMemo(() => {
        if (error === -1 || name === '') return <Alert severity="info">Enter github username</Alert>
        else if (error === 0 && reposLenght === 0) return <Alert severity="warning"> User had no public repositories </Alert> 
        else if (error !== 0) return <Alert severity="error"> Error - Repositories not Found! </Alert>
      }, [props])
    
    return (
        <div>
           {alert}
        </div>
    )
}
