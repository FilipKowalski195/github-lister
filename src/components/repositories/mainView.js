import React, { useState } from 'react'
import { RepositoriesView } from './repositoriesView'
import { TextField, Button, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import { updateUser } from '../../features/repositories/repositoriesSlice'

import photo from '../../imgs/logo.png'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: 'center',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,

    },
    '& .MuiButton-root': { 
        margin: '8px',
        width: 200,
    }
  },
  header: {
      textAlign: 'center'
  }
}));

export const MainView = () => {
    
    const [username, setUsername] = useState('')
    const classes = useStyles();
    const dispatch = useDispatch()

    const handleOnChange = (evt) => { 
        evt.stopPropagation()
        setUsername(evt.target.value)
    }

    const handleOnSubmit = (evt) => { 
        evt.preventDefault();
        dispatch(updateUser(username))
    }

    return (
        <Container fixed maxWidth="md">
            <h1 className={classes.header}><img style={{width:'250px'}}src={photo} alt={"Git Lister logo"} /> </h1> 
            <form onSubmit={handleOnSubmit} className={classes.root}>
                <TextField 
                        autoFocus
                        id="outlined-basic" 
                        className={classes.root} 
                        label="Github username" 
                        variant="outlined"
                        color="primary"
                        value={username}
                        onChange={handleOnChange}
                                
                />
                <Button onClick={handleOnSubmit} className={classes.root} variant="outlined" color="primary" > Find repositories</Button>
            </form>
            <RepositoriesView />
        </Container>
    )
}
