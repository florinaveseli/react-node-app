import React, {useEffect,useState} from "react";
import {getToken} from "./Utils/SetToken";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import axios from "axios";


const Tasks  =()=>{
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const[id,setId]= useState('');
    const [list,setList]= useState([]);



    useEffect(() => {
        const config = {
            method: 'get',
            url: 'http://localhost:8000/api/user/tasks',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        };

        axios(config).then(res=>{
            console.log(res.data)


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
    return(
        <div>
            <div>
              <p>Title</p>
            <input type="text" value={title}  onChange={e=>{setTitle(e.target.value)}}/>
            </div>
            <div>
                <p>Description</p>
            <input type="text" value={description}  onChange={e=>{setDescription(e.target.value)}}/>
            </div>
            <div>
                <p>Select Due date</p>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <div style={{width: '175px'}}>
                <p>Select List</p>
            <Select options={list} onChange={handleChange} />
            </div>
            <br/>
            <div>
                <input type="button" value="Create tasks" onClick={createTask}/>
            </div>
            <p>{id} : fsdfs</p>
        </div>
    )
}


export default Tasks;