import {useEffect, useState} from "react";
import DataTable from 'react-data-table-component';
import "../App.css";
import MyTable from "./mytable";


let url_listing = 'http://127.0.0.1:5000/';

function View_Package(){
    const [temp,setTemp] = useState(false)
    const [data,setData] = useState([{"apparment":"H.1.1.1","delivered_name":"resee","email":"a@gmail.com",
    "name":"Jay","more_information":"abcdef","received":false}])
    const [radio,setRadio] = useState("Find Package")
    const [checked1,setChecked1] = useState(false)
    const [checked2,setChecked2] = useState(true)
    const data1 = [{"title":["a","b","c"],"year":["e","f","g"]}];
    const [columns,setColumns] = useState([{Header:"Appartment",accessor:"apparment"},
    {Header:"Email",accessor:"email"},
    {Header:"delivered_name",accessor:"delivered_name"},
    {Header:"more_information",accessor:"more_information"},
    {Header:"name",accessor:"name"}])

    function renderHeader(){
        if (radio=="Create Listing"){
            var headerElement = ["apparment","package_owner","email","more_information","name"]
         }
         else{
            var headerElement = ["apparment","delivered_name","email","more_information","name"]
         }
        return headerElement.map((key,index)=>{
        return <th key={index}>{key.toUpperCase()}</th>})
    }

    function renderBody(){
        if (radio=="Create Listing"){
            return data && data.map(({index,apparment,package_owner,email,more_information,name})=>{
                return (<tr key={index}>
                <td>{apparment}</td>
                <td>{package_owner}</td>
                <td>{email}</td>
                <td>{more_information}</td>
                <td>{name}</td>
                </tr>);
                })}
         else{
            return data && data.map(({index,apparment,delivered_name,email,more_information,name})=>{
                return (<tr key={index}>
                <td>{apparment}</td>
                <td>{delivered_name}</td>
                <td>{email}</td>
                <td>{more_information}</td>
                <td>{name}</td>
                </tr>);
                })
         }
    }

    async function getData() {
        if (radio=="Create Listing"){
            setColumns([{Header:"Appartment",accessor:"apparment"},
            {Header:"Email",accessor:"email"},
            {Header:"package_owner",accessor:"package_owner"},
            {Header:"more_information",accessor:"more_information"},
            {Header:"name",accessor:"name"}]);
            }
            else{
            setColumns([{Header:"Appartment",accessor:"apparment"},
            {Header:"Email",accessor:"email"},
            {Header:"delivered_name",accessor:"delivered_name"},
            {Header:"more_information",accessor:"more_information"},
            {Header:"name",accessor:"name"}]);
            }
         if (radio=="Create Listing"){
            var ext = "/create_listing"
         }
         else{
            var ext = "/post_enquiry"
         }
         const response = await fetch(url_listing.concat(ext))
         const response_json = await response.json()
         setData(response_json)
         console.log(response_json)
    }

    function handleRadio(event){
        setTemp(!temp)
        event.stopPropagation()
        console.warn(event)
        setRadio(event.target.value)
        
        if (radio=="Create Listing"){
            setChecked1(false)
            setChecked2(true)
        }
        else{
            setChecked1(true)
            setChecked2(false)
        }
    }
    useEffect(()=>{getData()},[temp])
    return(
        <div>
        <div className="main-form-flex-table">
        <div className="radio-button component-form-radio-flex">
            <input onClick={(event)=>handleRadio(event)} type="radio" value="Create Listing" name="listing" checked={checked1}/>
                <label for="Create Listing" className="radiolabel" style={{marginRight:"2rem"}}>View Listing</label>
            <input  onClick={(event)=>handleRadio(event)}  type="radio" value="Find Package" name="listing" checked={checked2}/>
                <label for="Find Package" className="radiolabel">View Package</label>
                </div>
                <MyTable data={data} cols={columns}></MyTable>
        </div>
        </div>
        
    )
}
export default View_Package;


