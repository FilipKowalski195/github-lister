import React, { useMemo} from 'react'
import { Alert } from '@material-ui/lab'

export default function InfoAlert(props) {
    
    const alert = useMemo(() => {
        console.log(props)
        if (props.err === -1 || props.name === '') return <Alert severity="info">Enter github username</Alert>
        else if (props.err === 0 && props.length === 0) return <Alert severity="warning"> User had no public repositories </Alert> 
        else if (props.err !== 0) return <Alert severity="error"> Error - Repositories not Found! </Alert>
      }, [props])
    
    return (
        <div>
           {alert}
        </div>
    )
}
