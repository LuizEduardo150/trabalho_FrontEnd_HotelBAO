import { sendToastMessage } from "../components/ToastMensage";


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


export const getRoomByIdServer = async (id) => {
  return await fetch(`http://localhost:8080/room/${id}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  }).catch(() => {
    // erro de conexao com os ervidor
    sendToastMessage(1, "Desculpe! Estamos enfrentando problemas internos. Tente novamente mais tarde.")
    return null;
  }).then(response => {
      if(response === null)
        return null;
      if (response.status === 200){
        return response.json();
      }
      else{
        sendToastMessage(1, "Quarto não encontrado")
        return false
      }
  })
  .then(data => {
    if (data === null)
      return false;

    return data;
  })
}


export const deleteRoomsServer = async (id) => {
  return await fetch(`http://localhost:8080/room/${id}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
  }).catch(() => {
    // erro de conexao com os ervidor
    sendToastMessage(1, "Desculpe! Estamos enfrentando problemas internos. Tente novamente mais tarde.")
    return null;
  }).then(response => {
      if(response === null)
        return null;
      if (response.status === 200){
        sendToastMessage(0, "Quarto deletado")
        return true;
      } else{
        sendToastMessage(1, "Erro do sistema, considere atualizar a página")
        return false
      }
  })
}


export async function insertRoomServer(nameR, price, beds, score){
    return fetch('http://localhost:8080/room', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      
      body: JSON.stringify({
          name: nameR,
          price: price,
          numberOfBeds: beds,
          score: score
      })
    })
    .catch(() => { // erro de conexao com o servidor
        sendToastMessage(1, "Desculpe. Estamos enfrentando problemas internos! Volte mais tarde.", 10000);
        return null;
    })
    .then(response => {
        if (response == null){ return false;}
        
        if(response.status === 200){
            sendToastMessage(0, "Quarto registrado com sucesso.");
            //setMenu("main");
            return true;
        }
        else if(response.status === 400){
            sendToastMessage(1, "Dados Faltantes!", 10000);
            return false
        }
        else if(response.status === 500){
            sendToastMessage(1, "OPS!. Ocorreu um problema interno!", 10000);
            return false;
        }
    })
}

export async function updateRoomByIdServer(id, nameR, price, beds, score) {
  return fetch(`http://localhost:8080/room/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      
      body: JSON.stringify({
          name: nameR,
          price: price,
          numberOfBeds: beds,
          score: score
      })
    })
    .catch(() => { // erro de conexao com o servidor
        sendToastMessage(1, "Desculpe. Estamos enfrentando problemas internos! Volte mais tarde.", 10000);
        return null;
    })
    .then(response => {
        if (response == null){ return false;}
        
        if(response.status === 200){
            sendToastMessage(0, "Quarto Atualizado com sucesso.");
            return true;
        }
        else if(response.status === 400){
            sendToastMessage(1, "Dados Faltantes!", 10000);
            return false
        }
        else if(response.status === 500){
            sendToastMessage(1, "OPS!. Ocorreu um problema interno!", 10000);
            return false;
        }
    })  
}


export async function deleteAllRoomsServer() {
  return await fetch('http://localhost:8080/room/dltallsure0-0', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      }).catch(() => {
        // erro de conexao com o servidor
        sendToastMessage(1, "Desculpe! Estamos enfrentando problemas internos. Tente novamente mais tarde.");
        return null;
      })
      .then(response => {
        if(response === null)
          return null;
        
        if (response.status === 200){
          sendToastMessage(0, "OK! quartos deletados");
        }
        else if (response.status === 400){
          sendToastMessage(1, "Impossível executar comando");
        }
        else if (response.status === 404){
          sendToastMessage(1, "ERRo, rota bloqueada");
        }
        else{
          sendToastMessage(1, "Erro de integridade");
        }
      })
}