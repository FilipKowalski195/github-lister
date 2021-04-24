import React from 'react'
import { Dialog, DialogContent, List, ListItem, DialogTitle, DialogActions, Button} from '@material-ui/core'
import { useSelector } from 'react-redux'


export default function DetailedInfo(props) {

    
    const [data] = useSelector(state => state.repositories.repositories.filter(repo => repo.id === props.id))
    console.log(data)
    return (
        <Dialog open={props.open} onClose={() => props.onCloseHandle()}>
        <DialogTitle>Repositories details</DialogTitle>
        <DialogContent>
          <List> 
          <ListItem key={data.id}>Full name: {data.full_name}</ListItem>
            <ListItem>Stars count: {data.stargazers_count}</ListItem>
            <ListItem>Forks count: {data.forks}</ListItem>
            <ListItem>Open issues: {data.open_issues}</ListItem>
            <ListItem>Language: {data.language ?  data.language : 'Not specified'}</ListItem>
            <ListItem>URL to clone: {data.clone_url}</ListItem>
            <ListItem>Default branch name: {data.default_branch}</ListItem>
          </List> 
        </DialogContent>
        <DialogActions>
            <Button color='primary' onClick={() => window.open(data.html_url, '_blank')}> Go to github page </Button>
            <Button color='secondary' onClick={props.onCloseHandle}> Close </Button>
        </DialogActions>
      </Dialog>
    )
}
