import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getToken, removeUserSession} from "./Utils/SetToken";
import axios from "axios";
import {Button, Form, Modal} from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";


const Lists  = () =>{

    const [name,setName]= useState('');
    const [description,setDescription]= useState('');
    const [lists,setLists] = useState([]);
    const [show,setShow]= useState(false);
    const [listName,setListName] = useState('');
    const [listDescription,setListDescription] = useState('');
    const [listId,setListId] = useState('');

    // const [email,setEmail]= useState('');


    useEffect(() => {
        const config = {
            method: 'get',
            url: 'http://localhost:8000/api/user/lists',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        };

        axios(config).then(res=>{

            const data = res.data;

            const options = data.map(d => ({"value" : d._id, "name" : d.name,"description":d.description}))
            setLists(options)


        }).catch(e=>{
            console.log(e)
        })

    }, []);

    const createList =(e)=>{
        e.preventDefault();
        const data ={
            "name": name,
            "description": description
        };


        console.log(data,"data")

        var config = {
            method: 'post',
            url: 'http://localhost:8000/api/user/create-list',
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

    const showModal = () =>{
        setShow(true);
    }
    const hideModal = () =>{
        setShow(false);
    }
    const handleDelete =(e) =>{


        console.log(e.value)
        const data = {
            "list_id": e.value,
        };


        var config = {
            method: 'post',
            url: 'http://localhost:8000/api/user/delete-list',
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

    const getList =(e) =>{

        const configList = {
            method: 'get',
            url: `http://localhost:8000/api/user/list/${e.value}`,
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        };
        axios(configList).then(res=>{
            const data = res.data;

            setListName(data.name);
            setListDescription(data.description);
            setListId(data._id);




        })
            .catch(e=>{

            })
    }

    const editList =() =>{
        const data ={
            name: listName,
            description:listDescription,
            list_id: listId
        }
        const configList = {
            method: 'post',
            url: `http://localhost:8000/api/user/edit-list`,
            headers: {
                'Authorization': `Bearer ${getToken()}`
            },
            data
        };
        axios(configList).then(res=>{

            window.location.reload(false);

        })
            .catch(e=>{

            })
    }

    return(
        <div>
            <div>
               <h4>Create List</h4>
            </div>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name}  onChange={e=>{setName(e.target.value)}} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={description}  onChange={e=>{setDescription(e.target.value)}}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={createList}>
                    Submit
                </Button>
            </Form>
            <div className="users">
                <p>Tasks List:</p>
                <ul>

                    {lists.map((el,user) => (

                        <li className="user" key={user}><span>{el.name} </span><span> {el.description}</span><Button  onClick={(e) => { showModal();getList(el); }}     variant="primary">...</Button><Button variant="danger" onClick={()=>handleDelete(el)} >X</Button></li>
                    ))}
                </ul>
            </div>
            <Modal show={show} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={listName} onChange={e=>{setListName(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={listDescription}  onChange={e=>{setListDescription(e.target.value)}} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideModal}>
                        Close
                    </Button>
                    <Button variant="primary"  onClick={editList}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}


export default Lists;