import { toast } from 'react-toastify';


export const sendToastMessage = (code, message, time=3000) => {
        if (code === 1){
          toast.error(message, {
            autoClose: time,
            style:{
               backgroundColor: '#222',
                color: '#fff',
                fontWeight: 'bold'
            }
          });
    
        }else if (code === 0){
    
          toast.success(message, {
            autoClose: time,
            style:{
                backgroundColor: '#222',
                color: '#fff',
                fontWeight: 'bold'
            }
          
          });
    
        }
};