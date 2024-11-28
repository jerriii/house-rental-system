import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import useUserAuthStore from "../contexts/useUserAuthContext.tsx";

const socket = io('http://localhost:5000'); // Connect to the backend server

const Chat = ({ propertyRentalUnitId, receiverId }) => {

    const {user} = useUserAuthStore();
    const senderId = user?._id;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Join the chat room (property rental unit)
        socket.emit('joinRoom', propertyRentalUnitId);

        // Listen for new messages
        socket.on('newMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('newMessage');
        };
    }, [propertyRentalUnitId]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const messageData = {
                senderId: senderId,
                receiverId: receiverId,
                message: newMessage,
                propertyRentalUnitId: propertyRentalUnitId,
            };

            // Emit the message to the backend
            socket.emit('sendMessage', messageData);
            setNewMessage('');
        }
    };

    return (
        <div>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <strong>{msg.sender_id.name}:</strong> {msg.message}
                    </div>
                ))}
            </div>

            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default Chat;
