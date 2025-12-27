import {toast} from 'react-toastify';

export  const handleSuccess=(message)=> {
    toast.success(message),{
        positon:"top-right"

    }
 }

 export  const handleError=(message)=> {
    toast.error(message),{
        positon:"top-right"

    }
 }
