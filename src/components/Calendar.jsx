import React from 'react'

const Calendar = () => {

    function getCalendar(){
        const ano = new Date().getFullYear();

        if ((ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0)){
            console.log("ano é bisexto: ", ano);
        }else{
            console.log("ano nao é bisexto: ", ano);
        }
        



    }





    return (
        <div>
            algo
            <button onClick={getCalendar}>teste</button>
        </div>
    )
}

export default Calendar;