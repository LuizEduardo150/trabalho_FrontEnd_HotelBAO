import React from 'react'
import './RoomTable.css'
import { FaStar, FaBed } from "react-icons/fa";

const RoomTable = ({name, price, capacidade, score=0, onClickfunct}) => {
    
    function getStairsIcon(){
        switch(score){
            case 0:
                return(<div className='stars'>
                    <FaStar style={{color:"black"}}/>
                    <FaStar style={{color:"black"}}/>
                    <FaStar style={{color:"black"}}/>
                    <FaStar style={{color:"black"}}/>
                    <FaStar style={{color:"black"}}/>
                </div>)

            case 1:
                return(<div className='stars'>
                    <FaStar />
                    <FaStar style={{color:"black"}}/>
                    <FaStar style={{color:"black"}}/>
                    <FaStar style={{color:"black"}}/>
                    <FaStar style={{color:"black"}}/>
                </div>)
            
            case 2:
                return(<div className='stars'>
                    <FaStar />
                    <FaStar />
                    <FaStar style={{color:"black"}}/>
                    <FaStar style={{color:"black"}}/>
                    <FaStar style={{color:"black"}}/>
                </div>)
            
            case 3:
                return(<div className='stars'>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar style={{color:"black"}}/>
                    <FaStar style={{color:"black"}}/>
                </div>)
            
            case 4:
                return(<div className='stars'>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar style={{color:"black"}}/>
                </div>)
            
            default:
                return(<div className='stars'>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </div>)
        }
    }
    
    
    return (<button className='container' onClick={onClickfunct}>
        <div className='Innercontainer'>
            
            <img src="/src/assets/pictureIcon.png" className='imageContainer'/>

            <h1 className='title'>
                {name}
            </h1>
            
            <div className='stars'>
                {getStairsIcon()}
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