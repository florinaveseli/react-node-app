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
             console.log(options)




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

    const createTask =(e)=>{
        e.preventDefault();
        const data ={
            "title": title,
            "description": description,
            "due_date":startDate,
            "list_id": id
        };


        console.log(data,"data")

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

                    <li className="user" key={user}><span>{el.title} </span><span> {el.description}</span><Button onClick={showModal} variant="primary">...</Button><button></button><button></button></li>
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
                            <Form.Control type="text" placeholder="Title" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Description" />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Due Date</Form.Label>
                           <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Select List</Form.Label>
                            <Select options={list} onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={hideModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}


export default Tasks;