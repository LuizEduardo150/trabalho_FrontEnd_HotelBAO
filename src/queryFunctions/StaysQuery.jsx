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


export async function getAllStaysDetailOfUserByEmailServer(user_email) {
  return await fetch(`http://localhost:8080/stays/UstaysBMail/${user_email}`, {
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
          
          if (response.status == 404){
            sendToastMessage(1, "Não há dados de estadias cadastrados para esse email");
            return [];
          }

          else if(response.status === 200){
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


export async function getAllStaysDetailOfUserByUserName(userName) {
  return await fetch(`http://localhost:8080/stays/UstaysBUname/${userName}`, {
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
          
          if (response.status == 404){
            sendToastMessage(1, "Não há dados de estadias cadastrados para esse usuário");
            return [];
          }

          else if(response.status === 200){
              sendToastMessage(0, "Dados do usuário carregados");
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


export async function getAllStaysDetailWTOTUserInfoServer(id) {
  return await fetch(`http://localhost:8080/stays/staysDWTOUserD/${id}`, {
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

export async function updateStayEndStartDateById(id, start, end) {
  return await fetch(`http://localhost:8080/stays/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},

        body: JSON.stringify({
          startStay: start,
          endStay: end
        })
      })
      .catch(() => { // erro de conexao com o servidor
        sendToastMessage(1, "Desculpe. Estamos enfrentando problemas internos! Volte mais tarde.", 10000);
        return null;
      })
      .then(response => {
          if (response == null)
            return null;
          
          if(response.status === 200){
              sendToastMessage(0, "A estadia foi atualizada");
          }
          else if(response.status === 400){
              sendToastMessage(1, "Erro com o cadastro do quarto.");
          }
          else if(response.status === 500){
              sendToastMessage(1, "OPS!. Ocorreu um problema interno!", 10000);
          }
      })
}

export async function deleteStayByIdServer(id) {
  return await fetch(`http://localhost:8080/stays/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      })
      .catch(() => { // erro de conexao com o servidor
        sendToastMessage(1, "Desculpe. Estamos enfrentando problemas internos! Volte mais tarde.", 10000);
        return null;
      })
      .then(response => {
          if (response == null)
            return null;
          
          if(response.status === 200){
              sendToastMessage(0, "A estadia foi cancelada e removida do sistema");
          }
          else if(response.status === 400){
              sendToastMessage(1, "Não é possível deletar estadia.");
          }
          else if(response.status === 500){
              sendToastMessage(1, "OPS!. Ocorreu um problema interno!", 10000);
          }
      })
}


export async function deleteAllStaysServer() {
  return await fetch('http://localhost:8080/stays/dltallsure0-0', {
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
          sendToastMessage(0, "OK! estadias deletas");
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


export async function getMostExpensiveStayUserServer(userName) {
  return await fetch(`http://localhost:8080/stays/usrMExStay/${userName}`, {
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
          else if(response.status === 404){
              sendToastMessage(1, "Usuário não encontrado", 10000);
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

export async function getLessExpensiveStayUserServer(userName) {
  return await fetch(`http://localhost:8080/stays/usrLExStay/${userName}`, {
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
          else if(response.status === 404){
              sendToastMessage(1, "Usuário não encontrado", 10000);
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