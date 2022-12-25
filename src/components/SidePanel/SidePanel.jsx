import React from "react"
import { Button, Flex } from '@chakra-ui/react';
import { useDisplayStore } from "../../store/displayStore";

export default function SidePanel() {
    const switchRoute = useDisplayStore(state => state.switchRoute)
    return (
        <Flex flexDir='column' justifyContent={'space-around'} height='100%'>
            <Flex flexDir='column' gap={2} justifyContent='center' p='40px' width={'100%'}>
                <Button colorScheme='blue' onClick={() => switchRoute('CANDIDATE')}>Candidates</Button>
                <Button colorScheme='green' onClick={() => switchRoute('ACTIVE')}>Active</Button>
                <Button colorScheme='red' onClick={() => switchRoute('DUE')}>Due</Button>
                <Button colorScheme='yellow' onClick={() => switchRoute('TOEXPIRE')}>About to Expire</Button>
            </Flex>
            <Flex flexDir='column' p='40px' justifyContent='center'>
                <Button colorScheme='teal' onClick={() => switchRoute('REGISTRATION')}>New Registration</Button>
            </Flex>
        </Flex>
    )
}