import { useRouter } from "next/navigation";
import { Api } from "./api";

import { useDispatch } from "react-redux";
import { _set } from "@store/reducers/rootUser"


const middleware = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const auth = async () => {
      Api._user._authenticate().then(response => {
        console.log(response.status);
        if(response.status !== 200){
            router.push('/login')
        }
        else dispatch(_set(response.data));
      })
    }
  
    auth();
}


export default middleware;