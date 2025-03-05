import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import moment from "moment";
import Alert from 'react-bootstrap/Alert';


const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);

    const getUserData = async () => {
        try {
            const res = await axios.get("http://localhost:8005/getdata", {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (res.data && res.data.getuser) {
                setData(res.data.getuser);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const dltuser = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:8005/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res.status === 201) {
                setData(prevData => prevData.filter(user => user._id !== id));
                setShow(true);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <>      
            {show ? (
                <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                     deleted successfully 
                </Alert>
            ):" "
            }
            
            <div className='container mt-2'>
                <h1 className='text-center' style={{ fontSize: "20px" }}>MERN Image Upload Project</h1>
                <div className='text-end'>
                    <Button variant="primary" onClick={() => navigate('/register')}>Add User</Button>
                </div>
                <div className='row d-flex justify-content-center align-items-center mt-5'>
                    {data.length > 0 ? (
                        data.map((user, index) => (
                            <Card key={index} style={{ width: '22rem', height: '18rem' }} className='mb-3'>
                                <Card.Img
                                    variant="top"
                                    style={{ width: "100px", textAlign: 'center', margin: '10px auto' }}
                                    src={user.imgpath ? `http://localhost:8005/uploads/${user.imgpath}` : "https://via.placeholder.com/100"}
                                    alt="User"
                                />
                                <Card.Body>
                                    <Card.Title>User Name: {user.name}</Card.Title>
                                    <Card.Text>Date Added: {moment(user.date).format("L")}</Card.Text>
                                    <Button variant="danger" onClick={() => dltuser(user._id)}>Delete</Button>
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <p className='text-center mt-3'>No users found</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Home;
