import { AppBar, Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import NotesIcon from '@mui/icons-material/Notes';
import { makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';


const drawerWidth = 240;

const useStyles = makeStyles ((theme)=>{
    return {
    title:{
        padding: theme.spacing(2)
    },
    divspacing: {
      marginTop : theme.spacing(10)
    }
    }
  }
)

let items = [
  {
    "text" : "All todos",
    "path" : "/",
    "icon" : <NotesIcon />
  },
  {
    "text" : "Add todo",
    "path" : "/create",
    "icon" : <AddIcon  /> 
  }
]

const Layout = ({children}) => {
   const classes = useStyles()
   let navigate = useNavigate()
  return (


  <div>
    <Box sx={{ display: 'flex' }}>

    <CssBaseline />
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)` }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Today is {format(new Date(), 'MM/dd/yyyy')}
        </Typography>
      </Toolbar>
    </AppBar>

    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
    <Toolbar>
        <Typography variant="h6" className={classes.title}>
            Todos app
        </Typography>
    </Toolbar>
      <Divider />
      <List>
        {items.map((item) => (
          <ListItem button key={item.text} onClick={()=>navigate(item.path)}>
            <ListItemText primary={item.text} />
            <ListItemIcon>
              {item.icon }
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>

    <div style={{     
      background: '#f9f9f9',
      width: '100%',
      }}>
    <div className={classes.divspacing}>

    </div>
   
     {children}
    </div>

   </Box>

  </div>
  )
}

export default Layout