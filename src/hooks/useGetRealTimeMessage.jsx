import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((state) => state.socket);
  const { selectedUser } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (newMessage) => {
        // Only update the state if the message is for the selected user
        if (selectedUser?._id === newMessage.receiverId || selectedUser?._id === newMessage.senderId) {
          dispatch(setMessages((prevMessages) => [...prevMessages, newMessage]));
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('newMessage');
      }
    };
  }, [socket, dispatch, selectedUser, messages]);
};

export default useGetRealTimeMessage;
