import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@material-ui/core";
import Todo from "../components/Todo";
import SearchBar from "../components/SearchBar";
import { Box } from "@mui/material";

const Todos = () => {
    const [todos, setTodos] = useState([])
    const [searchText, setSearchText] = useState("") // We put this state here because
                                                    // we need the searchText value in
                                                    // both todos and the search component.

    const deleteTodo = (id) => {
      axios.delete(`http://localhost:3030/todos/${id}`)
      .then(() => getTodos());
    }

    const getTodoById = async (id) => {
      const res = await axios.get(`http://localhost:3030/todos/${id}`);
      return  res.data
    } 

    const updateTodoReminder = async (id) => {
      const todo = await getTodoById(id)
      let todo_ = {...todo, reminder: !todo.reminder}

      axios.put(`http://localhost:3030/todos/${id}`, todo_).then(
          setTodos(todos.map((todo) => todo.id === id ? {...todo, reminder: todo_.reminder} : todo))
      )
    }

    function getTodos() {
        axios.get('http://localhost:3030/todos')
       .then(function (response) {
        // handle success
        setTodos(response.data)
      })
      .catch(function (error) {
        // handle error
        window.alert(error);
      })
    }

    useEffect(()=>{
      getTodos() 
    }, [])


  return (
        <Container>   
          <Box     sx={{
                      flexGrow : 1,
                      p: 1,
                      m: 1,
                      bgcolor: 'background.paper',
                      borderRadius: 1,
                    }}>
                  <SearchBar  searchText={searchText} 
                       onSearchTextChange={setSearchText}
                  />      
          </Box> 

            {todos.map((todo) => 
              (searchText !== "" && todo.title.indexOf(searchText) === -1) ? null :
              (<Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} updateTodoReminder={updateTodoReminder} getTodos={getTodos} />) 
              
            )}
        </Container>
  )
}

export default Todos