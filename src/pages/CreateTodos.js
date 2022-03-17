import React, { useState } from 'react'
import { Box, Container, makeStyles, TextField, Typography } from '@material-ui/core';
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { format, intlFormat, setDate } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const styles = makeStyles((theme)=>{

  return {
    label : {
      marginTop : theme.spacing(1),
      fontSize : 17,
      minWidth : 110
    }
  }
})

const addTodo = async (todo) => {
  // const history = useHistory()
            await axios({
              method: 'post',
              url: 'http://localhost:3030/todos',
              data: {
                  "title" : todo.title,
                  "interval" : todo.interval,
                  "date" : todo.date,
                  "reminder" : todo.reminder
              }
            })
}

const CreateTodos = () => {
  const [date, setDate] = useState(new Date('2022-08-18T21:11:54'))
  const handleDateChange = (val) => {
    setDate(val)
  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async data =>  {
    data["date"] = format(date,'PPpp')
    await addTodo(data)
    navigate("/")
  }

  const navigate = useNavigate()
  const classes = styles()

  return (
    
    <Container>
       <form onSubmit={handleSubmit(onSubmit)}>

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

          <TextField required  name="title" label="Outlined" variant="outlined" 
                      size = "small"
                      style={{backgroundColor: 'white', width:"50%"}}
                      {...register("title")} 
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

          <TextField required  name="interval" label="Outlined" variant="outlined" 
                      size = "small"
                      style={{backgroundColor: 'white', width:"50%"}}
                      {...register("interval")} 
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

        <LocalizationProvider  dateAdapter={AdapterDateFns}>
          
              <DateTimePicker
                required
                label="Date&Time picker"
                value={date}
                onChange={(newValue) => {
                  handleDateChange(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
        </LocalizationProvider>
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
          <Typography name="reminder" style={{fontSize: 17, marginTop: 7}} variant="h6">
            Set reminder
          </Typography>
          <Checkbox {...register("reminder")} />
        </Box>
        <Button variant="contained" color='success' style={{marginLeft : 10}} type="submit"> 
            Submit
        </Button>
     </form>
      

    </Container>
  );
};

export default CreateTodos