import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, CardHeader, Collapse, Container, IconButton, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

import KeyboardArrowDownIcon from 
    "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from 
    "@mui/icons-material/KeyboardArrowUp";

const Task = () => {
    //adding lists starts
    const [taskList, setTaskList] = useState('')
    const [taskLists, setTaskLists] = useState([])

    const addTaskList = () => {
        axios.post('http://119.235.112.154:3003/api/v1/lists', {name: taskList})
        .then(res => {
         const result = axios.put(`http://119.235.112.154:3003/api/v1/lists/${res.data.uuid}`)
         console.log(result)
        })
        .catch(error=>{
          console.log("this is in the catch" + error)
        })
        setTaskList('');
        console.log(taskLists)
    }

    const deleteTaskList = (uuid) => {
        axios.delete(`http://119.235.112.154:3003/api/v1/lists/${uuid}`)
    }

        //getting the lists
        axios.get('http://119.235.112.154:3003/api/v1/lists').then(res => {
            setTaskLists(res.data)
        }).catch(error => {
            console.log(error)
        })
    //adding lists ends

    //adding tasks starts
    const [task, setTask] = useState('')
    const [taskArray, setTaskArray] = useState([])

    const addTask = () =>{
        axios.post('http://119.235.112.154:3003/api/v1/tasks', {text: task})
        .then(res => {
         const result = axios.put(`http://119.235.112.154:3003/api/v1/tasks/${res.data.uuid}`)
         console.log(result)
        })
        .catch(error=>{
          console.log("this is in the catch" + error)
        })
        setTask('');
        console.log(taskArray)
    }

    const deleteTaskArray = (uuid) => {
        axios.delete(`http://119.235.112.154:3003/api/v1/tasks/${uuid}`)
        console.log(uuid)
    }
            //getting the tasks
            axios.get('http://119.235.112.154:3003/api/v1/tasks').then(res => {
                setTaskArray(res.data)
            }).catch(error => {
                console.log(error)
            })
    //adding tasks ends

    
  const buttonClick = e => {
    if (e.key === "Enter") {
        addTaskList()
    }}

  return (
    <div className='task-style'>

        <div className="content">
            <input type="text" id="input-todo" placeholder="new task list" value={taskList} 
            onChange={e=>{setTaskList(e.target.value)}} onKeyDown={e=>buttonClick(e)}/>
            <button className="button-add" onClick={addTaskList}>add</button>
            <div className="list-container">
                <ul className="item-list">
                    {taskLists.map((item) => {
                        return (
                        <li className="item" key={item.uuid}>
                            <img src="/Images/Screenshot.png" width="20px" height="20px" 
                            onClick={() => {deleteTaskList(item.uuid), console.log(item.uuid)}}/><input type="checkbox"/>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id={item.uuid}
                                    >
                                    <Typography>{item.name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <input type="text" id="input-todo" placeholder="new task" value={task} 
                                    onChange={e=>{{setTask(e.target.value), console.log(task)}}} />
                                    <button className="button-add" onClick={addTask}>add</button>
                                 {taskArray.map(item => {
                                    return (
                                        <Typography key={item.uuid} sx={{
                                            display: "flex", justifyContent: "left", alignItems:'center'
                                        }}><IconButton onClick={()=>deleteTaskArray(item.uuid)}>
                                            <DeleteIcon color='warning'/>  
                                        </IconButton>{item.text}  
                                        </Typography>
                                    )
                                 })}
                                </AccordionDetails>
                            </Accordion>
                        </li>
                        )
                    })}
                </ul>
                {/* <button className="clear-button">Clear</button> */}
            </div>
        </div>

    </div>
  )
}

export default Task