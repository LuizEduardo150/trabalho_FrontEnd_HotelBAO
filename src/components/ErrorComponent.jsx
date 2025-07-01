import React from 'react'

function ErrorComponent() {
  return (
    <div style={styles.container}>
        <h1>
            {":("}
        </h1>

        <div>
            Desculpe! Estamos enfrentado problemas internos.
        </div>

        <div>
            Volte novamente mais tarde.
        </div>

    </div>
  )
}

const styles = {
    container:{
        display: 'flex',
        position: 'absolute',
        flexDirection: 'column',
        alignItems: 'center',
        width: '80%',
        borderRadius: '20px',
        backgroundColor: 'rgb(131, 20, 0)',
        paddingTop: '120px',
        paddingBottom: '120px',
        fontSize: 'x-large'
    }

}


export default ErrorComponent