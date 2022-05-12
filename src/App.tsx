import React, {useReducer} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./components/ToDoList";
import {v1} from 'uuid';
import {AddItem} from './components/AddItem';
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTaskAC, addTasksArrayAC, changeStatusAC, changeTaskTitleAC,
    removeTaskAC, removeTasksArrayAC, tasksReducer
} from './state/tasks-reducer';
import {
    addTDListAC, changeFilterAC, changeTDLTitleAC, removeTDListAC, todolistReducer
} from './state/todolist-reducer';

export type FilterType = 'all' | 'active' | 'done'

export type ToDoListType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksListType = {
    [key: string]: Array<TaskType>
}

function App() {
    let [toDoLists, toDoListsDispatch] = useReducer(todolistReducer, [
        {id: v1(), title: 'What to learn ', filter: 'all'},
        {id: v1(), title: 'What to buy ', filter: 'active'},
        {id: v1(), title: 'Films to watch ', filter: 'done'},
    ])

    let [tasks, tasksDispatch] = useReducer(tasksReducer, {
        [toDoLists[0]?.id]: [
            {id: v1(), title: "HTML/CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "TS", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Python", isDone: true},
            {id: v1(), title: "Django", isDone: true},
        ],
        [toDoLists[1]?.id]: [
            {id: v1(), title: "Хлеб", isDone: true},
            {id: v1(), title: "Молоко", isDone: false},
            {id: v1(), title: "Сок", isDone: false},
            {id: v1(), title: "Витамины", isDone: true},
        ],
        [toDoLists[2]?.id]: [
            {id: v1(), title: "Дориан Грей", isDone: true},
            {id: v1(), title: "Зеленая миля", isDone: true},
            {id: v1(), title: "Знакомьтесь, Джо Блэк", isDone: true},
        ]
    })
    // @ts-ignore
    window.tdl = toDoLists
    // @ts-ignore
    window.tasks = tasks

    function removeTask(toDoListId: string, taskId: string) {
        tasksDispatch(removeTaskAC(toDoListId, taskId))
    }
    function addTask(toDoListId: string, title: string) {
        if (title && toDoListId) tasksDispatch(addTaskAC(toDoListId, title))
    }
    function changeStatus(toDoListId: string, taskId: string) {
        tasksDispatch(changeStatusAC(toDoListId, taskId))
    }
    function changeTaskTitle(toDoListId: string, taskId: string, newTitle: string) {
        tasksDispatch(changeTaskTitleAC(toDoListId, taskId, newTitle))
    }

    function removeList(toDoListId: string) {
        tasksDispatch(removeTasksArrayAC(toDoListId))
        toDoListsDispatch(removeTDListAC(toDoListId))
    }
    function addToDoList(title: string) {
        if (title) {
            let toDoListId = v1()
            toDoListsDispatch(addTDListAC(toDoListId, title))
            tasksDispatch(addTasksArrayAC(toDoListId))
        }
    }
    function changeToDoListTitle(toDoListId: string, newTitle: string) {
        toDoListsDispatch(changeTDLTitleAC(toDoListId, newTitle))
    }
    function changeFilter(toDoListId: string, filter: FilterType) {
        toDoListsDispatch(changeFilterAC(toDoListId, filter))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ToDoLists
                    </Typography>

                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Grid sx={{ marginTop: 3, marginLeft: 3 }}>
                <AddItem addItem={ (title: string) => addToDoList(title) }
                         defaultTitle={'Новый ToDoList'}
                />
            </Grid>

            <Container maxWidth="xl" sx={{ marginTop: 3 }}>
                <Grid container spacing={5} justifyContent={'space-evenly'}>
                    {toDoLists.map(el => {
                        let filteredTasks = tasks[el.id]
                        if (el.filter === 'active') filteredTasks = tasks[el.id].filter(task => !task.isDone)
                        if (el.filter === 'done') filteredTasks = tasks[el.id].filter(task => task.isDone)

                        return <ToDoList
                            key={el.id}
                            id={el.id}
                            title={el.title}
                            tasks={filteredTasks}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            changeTaskTitle={changeTaskTitle}
                            filter={el.filter}
                            removeList={removeList}
                            changeToDoListTitle={changeToDoListTitle}
                        />
                        }
                    )}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
