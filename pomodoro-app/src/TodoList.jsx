import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog"; // Importando o Dialog do PrimeReact
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import styles from "./todolist.module.css"; // Importando o arquivo de estilos
import "primeicons/primeicons.css"; // Importando PrimeIcons

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [todoText, setTodoText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [newTodo, setNewTodo] = useState("");

  // Carregar tarefas do localStorage ao montar o componente
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos)); // Carregar os dados do localStorage
    }
  }, []);

  // Atualizar localStorage sempre que 'todos' mudar
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const openDialog = (index) => {
    setTodoText(todos[index].text);
    setEditIndex(index);
    setIsDialogVisible(true);
  };

  const closeDialog = () => {
    setIsDialogVisible(false);
    setTodoText("");
    setEditIndex(null);
  };

  const handleSaveTodo = () => {
    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex].text = todoText;
      setTodos(updatedTodos);
    }
    closeDialog();
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodoCompletion = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  return (
    <div className={styles.todoListContainer}>
      <h2>Tasks</h2>
      <div className={styles.insert_container}>
        <InputText
          id="newTodo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New Task"
        />
        <Button
          icon="pi pi-plus"
          onClick={handleAddTodo}
          className={styles.add_button}
        />
      </div>

      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`${styles.todoItem} ${
              todo.completed ? styles.completed : ""
            }`}
          >
            <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodoCompletion(index)}
              />
              {todo.text}
            </div>
            <div>
              <Button
                icon="pi pi-pencil"
                className="p-button-text"
                onClick={() => openDialog(index)}
              />
              <Button
                icon="pi pi-trash"
                className="p-button-text"
                onClick={() => handleDeleteTodo(index)}
              />
            </div>
          </li>
        ))}
      </ul>

      {/* Dialog for editing todo */}
      <Dialog
        header="Edit Task"
        visible={isDialogVisible}
        style={{ width: "30vw" }}
        modal
        onHide={closeDialog}
      >
        <div className={styles.dialogContent}>
          <span className="p-float-label">
            <InputText
              id="todo"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
            />
            <label htmlFor="todo">Task</label>
          </span>
        </div>

        <div className={styles.dialogActions}>
          <Button
            label="Cancel"
            icon="pi pi-times"
            onClick={closeDialog}
            className="p-button-text"
          />
          <Button
            label="Save"
            icon="pi pi-check"
            onClick={handleSaveTodo}
            autoFocus
          />
        </div>
      </Dialog>
    </div>
  );
};

export default TodoList;
