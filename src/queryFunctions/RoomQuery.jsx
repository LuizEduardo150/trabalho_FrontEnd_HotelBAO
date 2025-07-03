

export const getAllRooms = async () => {
    
    return await fetch('http://localhost:8080/room', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      }).catch(() => {
        // erro de conexao com o servidor
        return null;
      })
      .then(response => {
        if (response == null){ return null;}  
        return response.json()
      })
      .then(data => {
        if (data == null){ return null;}
          return data;
      })
}
