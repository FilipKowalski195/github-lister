import React from 'react'
import { Dialog, DialogContent, List, ListItem, DialogTitle, DialogActions, Button, ListSubheader, ListItemText} from '@material-ui/core'
import { useSelector } from 'react-redux'

export default function DetailedInfo(props) {

    const [data] = useSelector(state => state.repositories.repositories.filter(repo => repo.id === props.id))
    
    const jsx = data ?
        <Dialog open={props.open} maxWidth={"sm"} fullWidth onClose={() => props.onCloseHandle()}>
        <DialogTitle>Repositories details</DialogTitle>
        <DialogContent>
          <List> 
            <ListItem key={data.id}>
              <ListItemText primary={"Full name"} secondary={data.full_name} />
            </ListItem>
            <ListItem key={1}>
              <ListItemText primary={"Description"} secondary={data.description ? data.description : "No description."} />
            </ListItem>
            <ListItem key={2}>
              <ListItemText primary={"Stars count"} secondary={data.stargazers_count} />
            </ListItem>
            <ListItem key={3}>
              <ListItemText primary={"Forks count"} secondary={data.forks} />
            </ListItem>
            <ListItem key={4}>
              <ListItemText primary={"Open issues"} secondary={data.open_issues} />
            </ListItem>
            <ListItem key={5}>
              <ListItemText primary={"Language"} secondary={data.language ?  data.language : 'Not specified'}/>
              </ListItem>
            <ListItem key={6}>
              <ListItemText primary={"URL to clone"} secondary={data.clone_url}/>
            </ListItem>
            <ListItem key={7}>
              <ListItemText primary={"Default branch name"} secondary={data.default_branch}/> 
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
