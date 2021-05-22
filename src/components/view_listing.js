import {useEffect, useState} from "react";
import DataTable from 'react-data-table-component';
import "../App.css"
import { useTable, usePagination, useGlobalFilter } from "react-table";
import MyTable from "./mytable";


let url_listing = 'http://127.0.0.1:5000/';

function View_Listing(){
    const [filter,setFilter] = useState("")
    const [temp,setTemp] = useState(false)
    const [data,setData] = useState([{"apparment":"H.1.1.1","package_owner":"resee","email":"a@gmail.com",
    "name":"Jay","more_information":"abcdef","received":false},{"apparment":"H.1.1.2","package_owner":"resee","email":"a@gmail.com",
    "name":"Jay","more_information":"abcdef"}])
    const [radio,setRadio] = useState("Create Listing")
    const [checked1,setChecked1] = useState(true)
    const [checked2,setChecked2] = useState(false)
    const [columns,setColumns] = useState([{Header:"Appartment",accessor:"apparment"},
    {Header:"Email",accessor:"email"},
    {Header:"package_owner",accessor:"package_owner"},
    {Header:"more_information",accessor:"more_information"},
    {Header:"name",accessor:"name"}])
    
         
    //console.warn("jason",JSON.parse(data))



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
    }

    function handleRadio(event){
        event.stopPropagation()
        
        setTemp(!temp)
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
   

    useEffect(()=>getData(),[temp]);
    return(
        <div>
        <div className="main-form-flex-table">
        
        <div className="radio-button component-form-radio-flex">
            <input onClick={(event)=>handleRadio(event)} type="radio" value="Create Listing" name="listing" checked={checked1}/>
                <label for="Create Listing" className="radiolabel" style={{marginRight:"2rem"}}>View Listing</label>
            <input  onClick={(event)=>handleRadio(event)}  type="radio" value="Find Package" name="listing" checked={checked2}/>
                <label for="Find Package" className="radiolabel">View Package</label>
                </div>
                
                
        <MyTable data={data} cols={columns} filtervalue={filter}></MyTable>
        {/*<table id="data">
            <thead>
                <tr>{renderHeader()}</tr>
            </thead>
            <tbody>
                   {renderBody()}
            </tbody>
        </table>*/}
        </div>
        </div>
        
    )
}
export default View_Listing;


