import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Robot from "../assets/robot.gif"

export default function Welcome({}) {
    const [userName, setUserName] = useState("")

    const getUserName = ()=>{
        setUserName ( JSON.parse(localStorage.getItem("chat-app-user")).username)
    }
    console.log("WELCOME")
    useEffect(()=>{
        getUserName()
    },[])

  return (
    <>
        <Container>
          
            <h1>
                    Welcome, <span>{userName}</span>
            </h1>
            <h3>
                Please select a chat
            </h3>
        </Container>
      
    </>
  )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: white;
    img{
        height: 20rem;
    }
    span{
        color: #4e0eff;
    }
`
