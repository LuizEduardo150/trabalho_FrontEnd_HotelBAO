import { sendToastMessage } from "../components/ToastMensage";


export async function getAllStaysServer() {
  return await fetch(`http://localhost:8080/stays`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
      .catch(() => { // erro de conexao com o servidor
        sendToastMessage(1, "Desculpe. Estamos enfrentando problemas internos! Volte mais tarde.", 10000);
        return null;
      })
      .then(response => {
          if (response == null)
            return false;
          
          if(response.status === 200){
              sendToastMessage(0, "Dados alterados com sucesso.");
              return response.json();
          }
          else if(response.status === 400){
              sendToastMessage(1, "Erro", 10000);
              return false
          }
          else if(response.status === 500){
              sendToastMessage(1, "OPS!. Ocorreu um problema interno!", 10000);
              return false;
          }
      })
      .then(data => {
        if (data === null || data === false){
             return null;
        }
          return data;
      })
}

export async function getAllStaysDetailedServer() {
  return await fetch(`http://localhost:8080/stays/det`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
      .catch(() => { // erro de conexao com o servidor
        sendToastMessage(1, "Desculpe. Estamos enfrentando problemas internos! Volte mais tarde.", 10000);
        return null;
      })
      .then(response => {
          if (response == null)
            return false;
          
          if(response.status === 200){
              sendToastMessage(0, "Dados carregados");
              return response.json();
          }
          else if(response.status === 400){
              sendToastMessage(1, "Erro", 10000);
              return false
          }
          else if(response.status === 500){
              sendToastMessage(1, "OPS!. Ocorreu um problema interno!", 10000);
              return false;
          }
      })
      .then(data => {
        if (data === null || data === false){
             return null;
        }
          return data;
      })
}


export async function insertNewStayServer(userId, roomId, startStay, endStay) {
  return await fetch(`http://localhost:8080/stays`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userId: userId,
            roomId: roomId,
            startStay: startStay,
            endStay: endStay,
        })  
    })
    .catch(() => { // erro de conexao com o servidor
        sendToastMessage(1, "Desculpe. Estamos enfrentando problemas internos! Volte mais tarde.", 10000);
        return null;
    })
    .then(response => {
        if (response == null)
        return false;
        
        if(response.status === 200){
            sendToastMessage(0, "Estadia cadastrada com sucesso.");
            return true;
        }
        else if(response.status === 400){
            sendToastMessage(1, "Erro", 10000);
            return false
        }
        else if(response.status === 500){
            sendToastMessage(1, "OPS!. Ocorreu um problema interno!", 10000);
            return false;
        }
    })
    
}



export async function getAllStaysOfARoomByRoomIdServer(id) {
  return await fetch(`http://localhost:8080/stays/Rstays/${id}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
      .catch(() => { // erro de conexao com o servidor
        sendToastMessage(1, "Desculpe. Estamos enfrentando problemas internos! Volte mais tarde.", 10000);
        return null;
      })
      .then(response => {
          if (response == null)
            return false;
          
          if(response.status === 200){
              return response.json();
          }
          else if(response.status === 400){
              sendToastMessage(1, "Erro", 10000);
              return false
          }
          else if(response.status === 500){
              sendToastMessage(1, "OPS!. Ocorreu um problema interno!", 10000);
              return false;
          }
      })
      .then(data => {
        if (data === null || data === false){
             return null;
        }
          return data;
      })
}