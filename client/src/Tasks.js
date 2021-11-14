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

    useEffect(() => {
        const config = {
            method: 'get',
            url: 'http://localhost:8000/api/user/tasks',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        };

        axios(config).then(res=>{
            const data = res.data;
            const options = data.map(d => ({"value" : d._id, "title" : d.title,"completed":d.completed,"description":d.description}))
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

        if(!complete){
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


        axios(config).then(res=>{
            if(res.data.completed === 1){
                setComplete(true);
            }
            else{
                setComplete(false);
            }
             window.location.reload(false);

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

    return(
        <div>
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

                    <li className="user" key={user}><span>{el.title} </span><span> {el.description}</span><Button    onClick={(e) => { showModal(); getTask(el);}}   variant="primary">...</Button> <input name="cb" type="checkbox" checked={complete}  onChange={()=>handleCheck(el)} /><Button variant="danger" onClick={()=>handleDelete(el)}>X</Button></li>
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
                    <Button variant="secondary" onClick={hideModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateTasks}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}


export default Tasks;