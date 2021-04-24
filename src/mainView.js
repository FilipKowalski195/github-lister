import React, { useState } from 'react'
import { ReposList } from './reposList'
import { TextField, Button, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import { updateUser } from './features/repositories/repositoriesSlice'

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
            <h1 className={classes.header}> Git Lister </h1> 
            <form onSubmit={handleOnSubmit} className={classes.root}>
                <TextField 
                        autoFocus
                        id="outlined-basic" 
                        className={classes.root} 
                        label="Github username" 
                        variant="outlined"
                        value={username}
                        onChange={handleOnChange}
                                
                />
                <Button onClick={handleOnSubmit} className={classes.root} variant="outlined"> Find repositories</Button>
            </form>
            <ReposList />
        </Container>
    )
}
