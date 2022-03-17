import { makeStyles } from '@material-ui/core'
import { Box} from '@mui/material';
import {MdDeleteOutline} from 'react-icons/md';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

const styles = makeStyles((theme)=>{
  return {
    todo:{    
      backgroundColor: "#f1f1f1",
      borderLeft : (todo) => todo.reminder ? "green solid 5px":"",
    }
    ,
    delete:{
       marginTop: "50px", marginRight:"15px", fontSize:"35px",
       cursor:"pointer"
    },
    edit:{
      marginTop: "10px", marginRight:"15px", fontSize:"35px",
      cursor:"pointer"
    }
  }
})

const Todo = ({todo, deleteTodo, updateTodoReminder}) => {
  const classes = styles(todo)
  let navigate = useNavigate()
  let id = todo.id
  const handleUpdateTodo = () => {
    updateTodoReminder(todo.id)
  }
  const handleEditDetailsTodo = () => {
    navigate(`/edit/todo/${id}`)
  }
  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      p: 1,
      m: 1,
      bgcolor: 'background.paper',
      borderRadius: 1,
    }}
    className={classes.todo} 
    onDoubleClick={() => handleUpdateTodo()}
    >
      <div>
        <h2>{todo.title}  {' '}
        </h2>
        <p>{todo.interval} hours</p>
        <p>{todo.date}</p>
      </div>
    <div>        
      <EditIcon color='blue' fontSize='large' className={classes.delete} onClick={() => handleEditDetailsTodo()} />
      <MdDeleteOutline color="red" className={classes.edit} onClick={() => deleteTodo(todo.id)} />
    </div>

       
    </Box>
  )
}

export default Todo