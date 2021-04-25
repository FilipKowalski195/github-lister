import React from 'react'
import { Dialog, DialogContent, List, ListItem, DialogTitle, DialogActions, Button, ListSubheader, ListItemText} from '@material-ui/core'
import { useSelector } from 'react-redux'

export default function DetailedInfo(props) {

    const [data] = useSelector(state => state.repositories.repositories.filter(repo => repo.id === props.id))
    
    const jsx = data ?
        <Dialog open={props.open} maxWidth={"lg"} onClose={() => props.onCloseHandle()}>
        <DialogTitle>Repositories details</DialogTitle>
        <DialogContent>
          <List> 
            <ListItem key={data.id}>
              <ListSubheader>
                Full name  
              </ListSubheader>
              <ListItemText>
                {data.full_name}
              </ListItemText>
            </ListItem>
            <ListItem key={1}>
              <ListSubheader>
                Description
              </ListSubheader> 
              <ListItemText>
                {data.description ? data.description : "No description."}
              </ListItemText> 
            </ListItem>
            <ListItem key={2}>
              <ListSubheader>
                Stars count
              </ListSubheader>
              <ListItemText>
                {data.stargazers_count}
              </ListItemText>
            </ListItem>
            <ListItem key={3}>
              <ListSubheader>
                Forks count
              </ListSubheader>
              <ListItemText>
                {data.forks}
              </ListItemText>
            </ListItem>
            <ListItem key={4}>
              <ListSubheader>
                Open issues
              </ListSubheader> 
              <ListItemText>
                {data.open_issues}
              </ListItemText> 
            </ListItem>
            <ListItem key={5}>
              <ListSubheader>
                Language 
              </ListSubheader>
              <ListItemText>
                {data.language ?  data.language : 'Not specified'}
               </ListItemText>
              </ListItem>
            <ListItem key={6}>
              <ListSubheader>
                URL to clone: 
              </ListSubheader>
              <ListItemText>
                {data.clone_url}
               </ListItemText>
              </ListItem>
            <ListItem key={7}>
              <ListSubheader>
                Default branch name
              </ListSubheader>
              <ListItemText> 
                {data.default_branch}
              </ListItemText>
            </ListItem>
          </List> 
        </DialogContent>
        <DialogActions>
            <Button color='primary' onClick={() => window.open(data.html_url, '_blank')}> Go to github page </Button>
            <Button color='secondary' onClick={props.onCloseHandle}> Close </Button>
        </DialogActions>
      </Dialog> : ''

    return jsx
    
}
