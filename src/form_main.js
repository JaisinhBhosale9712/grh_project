import "../App.css";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useState} from "react";
import { Redirect,useHistory } from "react-router-dom";

let url = "http://127.0.0.1:5000/"
export default function Form_main(){
    const [radio,setRadio] = useState("Create Listing")
    let history = useHistory();
    const [checked1,setChecked1] = useState(true)
    const [checked2,setChecked2] = useState(false)
    const [data1,setData1] = useState({apparment:"",name:"",package_owner:"",more_information:"",email:""})
    const [data2,setData2] = useState({apparment:"",name:"",delivered_name:"",more_information:"",email:""})
    function handleRadio(event){
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

    function handleNameOnPackage(event){
        setData1((previous)=>({...previous,package_owner:event.target.value}));
        console.warn(data1)
    }

    function handleFullName(event){
        setData1((previous)=>({...previous,name:event.target.value}));
        setData2((previous)=>({...previous,name:event.target.value}));
        console.warn(data1)
    }

    function handleAppartment(event){
        setData1((previous)=>({...previous,apparment:event.target.value}));
        setData2((previous)=>({...previous,apparment:event.target.value}));
        console.warn(data1)
    }

    function handleEmail(event){
        setData1((previous)=>({...previous,email:event.target.value}));
        setData2((previous)=>({...previous,email:event.target.value}));
        console.warn(data1)
    }

    function handleDeliveredTo(event){
        setData2((previous)=>({...previous,delivered_name:event.target.value}));
    }

    function handleMoreInformation(event){
        setData1((previous)=>({...previous,more_information:event.target.value}));
        setData2((previous)=>({...previous,more_information:event.target.value}));
        console.warn(data1)
    }

    async function handleSubmit(event){
        console.log("HIII")
        event.preventDefault();
        if (radio=="Create Listing"){
            console.log(data1)
            const send_data = data1;
            console.log(send_data)
            let response = await fetch(url.concat("/create_listing"),{
                method:"post",
                body:JSON.stringify({send_data}),
                headers:{
                    'Content-type':'application/json'
                }
            });
        }
        else{
            const send_data = data2;
            let response = await fetch(url.concat("/post_enquiry"),{
                method:"post",
                body:JSON.stringify({send_data}),
                headers:{
                    'Content-type':'application/json',
                }
            });
            
        }
        console.warn("redirect")
        history.push("/listings")

                
        
    }


    return(
        <div className="formclass">
               
            <form onSubmit={(event)=>handleSubmit(event)}>
            <div className="main-form-flex">
            <div className="radio-button component-form-radio-flex">
            <input onClick={(event)=>handleRadio(event)} type="radio" value="Create Listing" name="listing" checked={checked1}/>
                <label for="Create Listing" className="radiolabel" style={{marginRight:"2rem"}}>Create Listing</label>
            <input  onClick={(event)=>handleRadio(event)}  type="radio" value="Find Package" name="listing" checked={checked2}/>
                <label for="Find Package" className="radiolabel">Find Package</label>
                </div>
            
            {radio=="Create Listing"&&<div className="component-form-flex">
            <h2 style={{marginBottom:"3rem"}}>
                {radio}
            </h2><label>
                Package owner<span className="asteriks-flex">*</span>
            </label>
            <input placeholder="Name on Package" onChange={(event)=>handleNameOnPackage(event)} value={data1.package_owner} required/>
            </div>}
            {radio=="Find Package"?<div className="component-form-flex"><h2 style={{marginBottom:"3rem"}}>
                {radio}
            </h2>
            <label>
                Full Name<span className="asteriks-flex">*</span>
            </label>
            <input placeholder="Your Name" onChange={(event)=>handleFullName(event)} value={data1.name} required/></div>:<div className="component-form-flex"><label>
                Full Name<span className="asteriks-flex">*</span>
            </label>
            <input placeholder="Your Name" onChange={(event)=>handleFullName(event)} value={data1.name} required/></div>}
            

            <div className="component-form-flex">
            <label>
                Appartment<span className="asteriks-flex">*</span>
            </label>
            <input placeholder="Appartment Number" onChange={(event)=>handleAppartment(event)} value={data1.appartment} required/>
            </div>

            <div className="component-form-flex">
            <label>
                Email<span className="asteriks-flex">*</span>
            </label>
            <input placeholder="Your Email Address" type="email" onChange={(event)=>handleEmail(event)} value={data1.email} required/>
            </div>
            {radio=="Find Package"&&<div className="component-form-flex">
            <label>
                Delivered to?
            </label>
            <input placeholder="Optional" onChange={(event)=>handleDeliveredTo(event)} value={data2.delivered_name} />
            </div>}
            <div className="component-form-flex">
            <label>
                More Information
            </label>
            <input onChange={(event)=>handleMoreInformation(event)} value={data1.more_information} placeholder="Preffered Pick up time etc?"/>
            </div>
            <div className="component-form-flex">
            <button type="submit"  className="button">SUBMIT</button>
            </div>
            </div>
            </form>
        </div>


    )
}

