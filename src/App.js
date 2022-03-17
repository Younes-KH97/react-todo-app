import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import CreateTodos from "./pages/CreateTodos";
import EditTodo from "./pages/EditTodo";
import Todos from "./pages/Todos";



function App() {

  return (
    <BrowserRouter>
      <Layout>
      <Routes>
          <Route exact path="/" element={<Todos />} />
          <Route path="/create" element={<CreateTodos />} />
          <Route path="/edit/todo/:id" element={<EditTodo />} />
      </Routes>
    </Layout>

    </BrowserRouter>
  );
}

export default App;
