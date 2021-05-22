import box1 from './images/box-03.png';
import box2 from './images/box-04.png';
import box3 from './images/box-05.png';
import box4 from './images/box-06.png';


import '../App.css'
function Main_Page(){
    return (
        <div>
            <div className="flexstyle">
            <img src={box1} alt="box1" className="boximages"/>
            <img src={box2} alt="box2" className="boximages" />
            </div>
            <div className="flexstyle">
            <img src={box3} alt="box3" className="boximages"/>
            <img src={box4} alt="box4" className="boximages" />
            </div>
        </div>
    )
}

export default Main_Page;