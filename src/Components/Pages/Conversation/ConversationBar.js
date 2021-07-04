import React, {useEffect,useState} from 'react'
import Conversation from './Conversation'
import db from "../firebase"
import { useStateValue } from '../StateProvider';
function ConversationBar() {

    const[rooms,setRooms] = useState([]);
    const [{user},dispatch]=useStateValue();

    useEffect(() => {
       const unsubscribe = db.collection('rooms').onSnapshot((snapshot) => 
                setRooms(snapshot.docs.map((doc) =>
                    ({
                        id: doc.id,
                        data: doc.data(),
                    }))
            )
        );
        return() =>{
            unsubscribe();
        }
    }, []);
    return (
        <div>
           <div className="chat_menu_wrapper">
            
            <Conversation addNewChat/>
            {rooms.map(room => (
                <Conversation key={room.id} id={room.id} name={room.data.name}/>
            ))}
           
          </div>  
        </div>
    )
}

export default ConversationBar
