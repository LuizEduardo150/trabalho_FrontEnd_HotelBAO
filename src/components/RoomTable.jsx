import React from 'react'
import './RoomTable.css'
import { FaStar, FaBed } from "react-icons/fa";

const RoomTable = ({name, price, capacidade, onClickfunct}) => {
    return (<button className='container' onClick={onClickfunct}>
        <div className='Innercontainer'>
            
            <img src="/src/assets/pictureIcon.png" className='imageContainer'/>

            <h1 className='title'>
                {name}
            </h1>
            
            <div className='stars'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar style={{color:"black"}}/>
                
            </div>


            <div>
                <span className='bedIcon'>{FaBed.apply()}</span>
                <span className='roonsize'>{capacidade}</span>
            </div>


            <p className='price'>
                R${price}
            </p>




        
        
        </div>
    </button>)
}

export default RoomTable;