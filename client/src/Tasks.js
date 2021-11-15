import React, {useEffect,useState} from "react";
import {getToken} from "./Utils/SetToken";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import axios from "axios";
// import Modal from  "./Modals/Modal"
import {Button,Modal,Form}  from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const Tasks  =()=>{
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const[id,setId]= useState('');
    const[tasks,setTasks] = useState([]);
    const [list,setList]= useState([]);
    const [show,setShow]= useState(false);

    const [taskId,setTaskId] = useState('');
    const [taskTitleId,getTaskTitleId] =useState('');
    const [taskDescriptionId,getTaskDescriptionId] =useState('');
    const [taskDateId,getTaskDateId] =useState('');
    const [taskListId,getTaskListId] =useState({});
    const [complete,setComplete]= useState(false);

    const [showST,setShowST]= useState(false);
    const [subTasks,setSubtasks] = useState([]);
    const [subTitle,setSubTitle] =useState('');
    const [subDescription,setSubDescription] =useState('');
    const [subDate,setSubDate] =useState(new Date());


    const [subtaskTitle,setSubtaskTitle] = useState('');
    const [subtaskDescription,setSubtaskDescription] = useState('');
    const [subtaskDate,setSubtaskDate] = useState(new Date());
    const [showSTU,setShowSTU]= useState(false);
    const [subtaskId,setSubtaskId] = useState('');

    useEffect(() => {
        const config = {
            method: 'get',
            url: 'http://localhost:8000/api/user/tasks',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        };

        axios(config).then(res=>{
            const data = res.data.data;

            const isCompleted = res.data;
            const mapCom = data.map(d=>{
                if(d.completed ===1){
                    return true;
                }
                else{
                    return false
                }
            })
            console.log(mapCom)

            const options = data.map(d => ({"value" : d._id, "title" : d.title,"completed":mapCom,"description":d.description}))
             setTasks(options)
            console.log(data,"sd")




        }).catch(e=>{
            console.log(e)
        })
        const configList = {
            method: 'get',
            url: 'http://localhost:8000/api/user/lists',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        };
        axios(configList).then(res=>{
                const data = res.data;
                const options = data.map(d => ({"value" : d._id, "label" : d.name}))
                setList(options);

            })
            .catch(e=>{

            })

    }, []);

    const createTask =()=>{
        // e.preventDefault();
        const data ={
            "title": title,
            "description": description,
            "due_date":startDate,
            "list_id": id
        };




        var config = {
            method: 'post',
            url: 'http://localhost:8000/api/user/add-task',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            },
            data
        };


        axios(config).then(data=>{
            window.location.reload(false);

        }).catch(e=>{
            console.log(e,"eee")
        })
    }

    const handleChange =(e) =>{
        setId(e.value);

    }
    const showModal = () =>{
        setShow(true);
    }
    const hideModal = () =>{
        setShow(false);
    }

    const showModalST = () =>{
        setShowST(true);
    }
    const hideModalST = () =>{
        setShowST(false);
    }
    const showModalSTU = () =>{
        setShowSTU(true);
    }
    const hideModalSTU = () =>{
        setShowSTU(false);
    }


    const getTask = (e)=>{

        const configList = {
            method: 'get',
            url: `http://localhost:8000/api/user/task/${e.value}`,
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        };
        axios(configList).then(res=>{
            const data = res.data.task_data;

            getTaskTitleId(data.title);
            getTaskDescriptionId(data.description);
            getTaskDateId(res.data.task_date);
            setTaskId(data._id);


            const list_data = res.data.list_data;
            const isObject = (value) => typeof value === "object" && value !== null
            if(  isObject(list_data)  ){
                const op ={"value" : list_data._id, "label" : list_data.name};
                getTaskListId(op);
            }



        })
            .catch(e=>{

            })
    }

    const updateTasks =()=>{

        const data = {
            "title":taskTitleId,
            "description":taskDescriptionId,
            "task_id": taskId,
            "list_id":id,
            "due_date": taskDateId
        };




        var config = {
            method: 'post',
            url: 'http://localhost:8000/api/user/update-task',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            },
            data
        };


        axios(config).then(data=>{
            window.location.reload(false);

        }).catch(e=>{
            console.log(e,"eee")
        })
    }
    const handleChangeId =(e)=>{
        getTaskListId(e.value);
    }
    const checkTask =()=>{

    }
    const handleCheck =(e) =>{


        let com ;

        if(!e.completed){
            console.log(!e.completed,"test")
            com =1;
        }
        else{
            com =0;
        }

        console.log(e.value)
        const data = {
            "task_id": e.value,
            "completed":com
        };


        var config = {
            method: 'post',
            url: 'http://localhost:8000/api/user/complete-task',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            },
            data
        };

let res;
        axios(config).then(res=>{

            res =[...tasks].map(todo=>{
                if(todo.value === e.value){

                    if(res.data.completed == 1){

                        todo.completed = true;
                    }
                    else {
                        todo.completed = false;
                    }
                }
                return todo
            })
            console.log(res)
            setTasks(res);

             //window.location.reload(false);

        }).catch(e=>{
            console.log(e,"eee")
        })

    }

    const handleDelete =(e) =>{



        const data = {
            "task_id": e.value,
        };


        var config = {
            method: 'post',
            url: 'http://localhost:8000/api/user/delete-task',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            },
            data
        };


        axios(config).then(res=>{

            window.location.reload(false);

        }).catch(e=>{
            console.log(e,"eee")
        })

    }

    const subtasks =(e) =>{

        const configList = {
            method: 'get',
            url: `http://localhost:8000/api/user/subtasks/${e.value}`,
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        };
        axios(configList).then(res=>{
            const data = res.data;

            const options = data.map(d => ({"value" : d._id, "title" : d.title,"description":d.description}))
            setSubtasks(options)



        })
            .catch(e=>{

            })
    }


    const createSubtasks =()=>{

        const data = {
            "title":subTitle,
            "description":subDescription,
            "task_id": taskId,
            "due_date": subDate
        };




        const config = {
            method: 'post',
            url: 'http://localhost:8000/api/user/create-subtask',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            },
            data
        };


        axios(config).then(data=>{
            window.location.reload(false);

        }).catch(e=>{
            console.log(e,"eee")
        })
    }

    const handleDeleteSubtask =(e) =>{



        const data = {
            "subtask_id": e.value,
        };


        var config = {
            method: 'post',
            url: 'http://localhost:8000/api/user/delete-subtask',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            },
            data
        };


        axios(config).then(res=>{

            window.location.reload(false);

        }).catch(e=>{
            console.log(e,"eee")
        })

    }


    const getSubtask = (e)=>{

        const configList = {
            method: 'get',
            url: `http://localhost:8000/api/user/subtask/${e.value}`,
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        };

        axios(configList).then(res=>{
            const data = res.data.task_data;

            setSubtaskTitle(data.title);
            setSubtaskDescription(data.description);
            setSubtaskDate(res.data.res_date);
            setSubtaskId(data._id);

        })
            .catch(e=>{

            })
    }


    const updateSubtasks =()=>{

        const data = {
            "title":subtaskTitle,
            "description":subtaskDescription,
            "subtask_id": subtaskId,
            "due_date": subtaskDate
        };




        const config = {
            method: 'post',
            url: 'http://localhost:8000/api/user/update-subtask',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            },
            data
        };


        axios(config).then(data=>{
            window.location.reload(false);

        }).catch(e=>{
            console.log(e,"eee")
        })
    }
    return(
        <div>
            <div>
                <h4>Create Task</h4>
            </div>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={title}  onChange={e=>{setTitle(e.target.value)}} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={description}  onChange={e=>{setDescription(e.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Due Date</Form.Label>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Select List</Form.Label>
                    <Select options={list} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={createTask}>
                    Submit
                </Button>
            </Form>


            <div className="users">
                <p>Tasks List:</p>
                <ul>

                {tasks.map((el,user) => (

                    <li className="user" key={user}><input name="cb" type="checkbox" checked={el.completed}  onChange={()=>handleCheck(el)} /><span>{el.title} </span><span> {el.description}</span><Button    onClick={(e) => { showModal(); getTask(el); subtasks(el)}}   variant="primary">...</Button> <Button variant="danger" onClick={()=>handleDelete(el)}>X</Button></li>
                ))}
                </ul>
            </div>

            <Modal show={show} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={taskTitleId} onChange={e=>{getTaskTitleId(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={taskDescriptionId}  onChange={e=>{getTaskDescriptionId(e.target.value)}} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Due Date</Form.Label>
                           <DatePicker selected={taskDateId} onChange={(date) => getTaskDateId(date)}  />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Select List</Form.Label>
                            <Select options={list} onChange={handleChange} defaultValue={taskListId} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick = {showModalST}>
                        Subtask
                    </Button>
                    <Button variant="secondary" onClick={hideModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateTasks}>
                        Save Changes
                    </Button>

                </Modal.Footer>
                <div className="users">
                    <p>Subtasks:</p>
                    <ul>

                        {subTasks.map((el,user) => (

                            <li className="user" key={user}><input name="cb" type="checkbox" checked={el.completed}  onChange={()=>handleCheck(el)} /><span>{el.title} </span><span> {el.description}</span><Button    onClick={(e) => { showModalSTU(); getSubtask(el);}}   variant="primary">...</Button> <Button variant="danger" onClick={()=>handleDeleteSubtask(el)}>X</Button></li>
                        ))}
                    </ul>
                </div>
            </Modal>


            <Modal show={showST} onHide={hideModalST}>
                <Modal.Header closeButton>
                    <Modal.Title>Create SubTask</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={subTitle} onChange={e=>{setSubTitle(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={subDescription}  onChange={e=>{setSubDescription(e.target.value)}} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Due Date</Form.Label>
                            <DatePicker selected={subDate} onChange={(date) => setSubDate(date)}  />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideModalST}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={createSubtasks}>
                        Create
                    </Button>

                </Modal.Footer>
            </Modal>

            <Modal show={showSTU} onHide={hideModalSTU}>
                <Modal.Header closeButton>
                    <Modal.Title>Update SubTask</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={subtaskTitle} onChange={e=>{setSubtaskTitle(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={subtaskDescription}  onChange={e=>{setSubtaskDescription(e.target.value)}} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Due Date</Form.Label>
                            <DatePicker selected={subtaskDate} onChange={(date) => setSubtaskDate(date)}  />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideModalSTU}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateSubtasks}>
                        Update
                    </Button>

                </Modal.Footer>
            </Modal>

        </div>
    )
}


export default Tasks;