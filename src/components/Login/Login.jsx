import { Box, Button, Card, Flex, Input } from "@chakra-ui/react"
import bgImage from '../index.jpg'
import React from "react"
import axios from "axios"
import { useDisplayStore } from "../../store/displayStore"

export const Login = () => {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [errorMessage, setErrorMessage] = React.useState('')
    const updateAuth = useDisplayStore(state => state.updateAuth)
    const setMainUsername = useDisplayStore(state => state.setUsername)
    const handleLogin = async () => {
        if(username.length && password.length) {
            const response = await axios.post(' https://liber.herokuapp.com/liber/v1/user/validate', {
                username: username,
                password: password
            })
            if(response && response.data.message === 'success') {
                setMainUsername(username)
                updateAuth(true)
            }
            else {
                setErrorMessage(response.data.message)
                setTimeout(() => setErrorMessage(''), 6000)
            }
        }
    }
    return (
        <Box backgroundSize='cover' backgroundRepeat='no-repeat' backgroundImage={bgImage} h='100vh' w='100vw'>
            <Flex height={'100%'} alignItems='center' justifyContent={'center'}>
                <Flex flexDir='column' gap={6} align={'center'} height={'350px'} p='80px 0 80px 0' w='350px' bgColor={'blackAlpha.700'} borderRadius='10px'>
                    <Input onChange={(e) => setUsername(e.target.value)} textColor={'white'} width='70%' placeholder='Username' />
                    <Input onChange={(e) => setPassword(e.target.value)} textColor={'white'} type='password' width='70%' placeholder='Password' />
                    <Button onClick={handleLogin} colorScheme={'green'}>Login</Button>
                    <Box color={'red'}>{errorMessage.length ? errorMessage: null}</Box>
                </Flex>
            </Flex>
        </Box>
    )
}