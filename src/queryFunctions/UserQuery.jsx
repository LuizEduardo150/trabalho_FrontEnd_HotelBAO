import { sendToastMessage } from "../components/ToastMensage";

export async function getAllUsersServer() {
    
    return await fetch('http://localhost:8080/client', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      }).catch(() => {
        // erro de conexao com o servidor
         sendToastMessage(1, "Desculpe! Estamos enfrentando problemas internos. Tente novamente mais tarde.");
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


export async function getUserIdByUserNameServer(name) {
  return await fetch(`http://localhost:8080/client/gt/${name}`, {
        method: 'GET',
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
          return response.json();
        }
        else if (response.status === 400){
          sendToastMessage(1, "Impossível executar esse serviço");
          return false;
        }
        else if (response.status === 404){
          sendToastMessage(1, "Usuário não encontrado");
          return false;
        }
        else{
          sendToastMessage(1, "Erro de integridade");
          return false;
        }
        
      })
      .then(data => {
        if (data == null){ return null;}
          return data;
      })
}


export async function getUserByIdServer(id) {
  return await fetch(`http://localhost:8080/client/${id}`, {
        method: 'GET',
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
          sendToastMessage(0, "Usuário encontrado");
          return response.json();
        }
        else if (response.status === 400){
          sendToastMessage(1, "Impossível executar esse serviço");
          return false;
        }
        else if (response.status === 404){
          sendToastMessage(1, "Usuário não encontrado");
          return false;
        }
        else{
          sendToastMessage(1, "Erro de integridade");
          return false;
        }
        
      })
      .then(data => {
        if (data == null){ return null;}
          return data;
      })
}


export async function updateUserByIdServer(id, name, email, phone, realName, adress, adressNumber, district) {
  return await fetch(`http://localhost:8080/client/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          userName: name,
          password: '',
          email: email,
          phone: phone,
          realName: realName,
          address: adress,
          addressNumber: adressNumber,
          district: district
        })

      }).catch(() => { // erro de conexao com o servidor
        sendToastMessage(1, "Desculpe. Estamos enfrentando problemas internos! Volte mais tarde.", 10000);
        return null;
      })
      .then(response => {
          if (response == null){ return false;}
          
          if(response.status === 200){
              sendToastMessage(0, "Dados alterados com sucesso.");
              return true;
          }
          else if(response.status === 400){
              sendToastMessage(1, "Dados Faltantes ou inconsistntes", 10000);
              return false
          }
          else if(response.status === 500){
              sendToastMessage(1, "OPS!. Ocorreu um problema interno!", 10000);
              return false;
          }
      })
}

export const deleteUserServer = async (id) => {
  return await fetch(`http://localhost:8080/client/${id}`, {
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
        sendToastMessage(0, "Usuário deletado");
        return true;
      }else{
        sendToastMessage(1, "Erro de integridade");
        return false;
      }
  })
}


export async function getUserByRealNameServer(name) {
  return await fetch(`http://localhost:8080/client/name/${name}`, {
        method: 'GET',
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
          sendToastMessage(0, "Usuário encontrado");
          return response.json();
        }
        else if (response.status === 400){
          sendToastMessage(1, "Impossível executar esse serviço");
          return false;
        }
        else if (response.status === 404){
          sendToastMessage(1, "Usuário não encontrado");
          return false;
        }
        else{
          sendToastMessage(1, "Erro de integridade");
          return false;
        }
      })
      .then(data => {
        if (data == null){ return null;}
          return data;
      })
}

export async function getUserByUserNameServer(name) {
  return await fetch(`http://localhost:8080/client/byUserName/${name}`, {
        method: 'GET',
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
          sendToastMessage(0, "Usuário encontrado");
          return response.json();
        }
        else if (response.status === 400){
          sendToastMessage(1, "Impossível executar esse serviço");
          return false;
        }
        else if (response.status === 404){
          sendToastMessage(1, "Usuário não encontrado");
          return false;
        }
        else{
          sendToastMessage(1, "Erro de integridade");
          return false;
        }
      })
      .then(data => {
        if (data == null){ return null;}
          return data;
      })
}

export async function getUserByEmailServer(email) {
  return await fetch(`http://localhost:8080/client/byEmail/${email}`, {
        method: 'GET',
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
          sendToastMessage(0, "Usuário encontrado");
          return response.json();
        }
        else if (response.status === 400){
          sendToastMessage(1, "Impossível executar esse serviço");
          return false;
        }
        else if (response.status === 404){
          sendToastMessage(1, "Usuário não encontrado");
          return false;
        }
        else{
          sendToastMessage(1, "Erro de integridade");
          return false;
        }
      })
      .then(data => {
        if (data == null){ return null;}
          return data;
      })
}