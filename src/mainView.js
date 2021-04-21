import React, { useState } from 'react'
import { ReposList } from './reposList'
import { TextField, Button, Container } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';

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
    
    const [username, setUsername] = useState('allegro')
    const [nameToSubmit, setNameToSubmit] = useState('');
    const classes = useStyles();

    const handleOnChange = (evt) => { 
        setUsername(evt.target.value)
    }

    const handleOnSubmit = (evt) => { 
        evt.preventDefault();
        setNameToSubmit(username)
    }

    return (
        <div>
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
                        onKeyDown={(e) => e.stopPropagation()}         
                />
                <Button onClick={handleOnSubmit} className={classes.root} variant="outlined"> Find repositories</Button>
            </form>
            
            <ReposList name={nameToSubmit}/>
        </Container>
        
        </div>
    )
}
