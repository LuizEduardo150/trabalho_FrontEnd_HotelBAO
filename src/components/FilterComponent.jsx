import React from 'react'
import './FilterComponent.css'
import { FaCoins, FaUser, FaStar} from "react-icons/fa";
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';


const FilterComponent = () => {
  return (
    <div className='bodyFilter'>
        
        <button className='buttonfilter'>
            <span className='iconT'><FaCoins /></span>
            Valor da estadia
            <div className='buttonMP'>
                <FiChevronUp className='individualButton'/>
                <FiChevronDown className='individualButton'/>
            </div>
        </button>

        <button className='buttonfilter'>
            <span className='iconT'> <FaStar /> </span>
            Nota do quarto
            <div className='buttonMP'>
                <FiChevronUp className='individualButton'/>
                <FiChevronDown className='individualButton'/>
            </div>
        </button>

        <button className='buttonfilter'>
            <span className='iconT'><FaUser /></span>
            Número de pessoas
            <div className='buttonMP'>
                <FiChevronUp className='individualButton'/>
                <FiChevronDown className='individualButton'/>
            </div>
            
        </button>

        
        <div className="tooltip">Filtro de exibição</div>

    </div>
  )
}

export default FilterComponent;