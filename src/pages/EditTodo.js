import { makeStyles } from '@material-ui/core'
import { DateTimePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { format, parseISO } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

const styles = makeStyles((theme)=>{
    return {
        label : {
        marginTop : theme.spacing(2),
        fontSize : 17,
        minWidth : 110
        }
    }
  }
)

const EditTodo = () => {
    let id = useParams()
    const navigate = useNavigate()
    const [date, setDate] = useState("")
    const [title, setTitle] = useState("")
    const [interval, setInterval] = useState("")

    const handleTitleChange = (val) => {
      setTitle(val)
    }

    const handleDateChange = (val) => {
      setDate(val)
    }

    const handleIntervalChange = (val) => {
      setInterval(val)
    }
  
    const handleSubmit = (e) =>  {
      e.preventDefault()
      const obj = {}
      obj["title"] = title
      obj["date"] = format(date,'PPpp')
      obj["interval"] = interval
      editTodo(obj)
    }

    const getTodoById = async (id) => {
      const res = await axios.get(`http://localhost:3030/todos/${id}`);
      return  res.data
    } 

    const SetTodo = async (id) => {
      const todo = await getTodoById(id)
      setTitle(todo.title)
      setInterval(todo.interval)
    }
 
    useEffect(() => {
      const myFunc = () => {
      return SetTodo(id["id"])
    }
      myFunc()
    }, [])
  

    const editTodo = (todo) => {
      axios.put(`http://localhost:3030/todos/${id["id"]}`, todo).then(
        navigate('/')
    )
    }
  
    
    const classes = styles()

  return (
    

    <Container>
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'row',
            p: 1,
            m: 1,
            borderRadius: 1,
            }}
            >
            <Typography variant="h3">
                Todo details
            </Typography>

        </Box>

       <form onSubmit={handleSubmit}>

       <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 1,
          m: 1,
          borderRadius: 1,
        }}
        >
        <Typography className={classes.label} variant="h6">
          Id
        </Typography>

        <TextField  disabled = {true} name="id" value={id["id"]} variant="outlined" 
                    size = "small"
                    style={{backgroundColor: 'white', width:"50%"}}
        />

      </Box>

       <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 1,
          m: 1,
          borderRadius: 1,
        }}
        >
          <Typography className={classes.label} variant="h6">
            Title
          </Typography>

          <TextField  required label="title"  variant="outlined" 
                      value = {title}
                      onChange = {(e) => handleTitleChange (e.target.value)}
                      size = "small"
                      style={{backgroundColor: 'white', width:"50%"}} 
          />

      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 1,
          m: 1,
          borderRadius: 1,
        }}
        >
          <Typography className={classes.label} variant="h6">
            Interval
          </Typography>

          <TextField required label="interval" variant="outlined" 
                      size = "small"
                      style={{backgroundColor: 'white', width:"50%"}}
                      value = {interval}
                      onChange = {(e) => handleIntervalChange(e.target.value)}
          />

      </Box>

       <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 1,
          m: 1,
          borderRadius: 1,
        }}
      >
          <Typography className = {classes.label} variant="h6">
            Date
          </Typography>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                required
                value={date}
                onChange={(newValue) => {
                  handleDateChange(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
        </LocalizationProvider>
        </Box>
        
        <Button variant="contained" color='success' style={{marginLeft : 10}} type="submit"> 
            Save
        </Button>
        <Button variant="contained" color='error' style={{marginLeft : 10}} onClick={() => navigate("/")}> 
            Cancel
        </Button>
     </form>
      

    </Container>
  )
}

export default EditTodo