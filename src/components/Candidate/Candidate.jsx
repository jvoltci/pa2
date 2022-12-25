import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import axios from "axios"
import React, { useEffect } from "react"
import { useDisplayStore } from "../../store/displayStore"

export const Candidate = () => {
    const [candidates, setCandidates] = React.useState([])
    const getCandidates = async () => {
        const response = await axios.get(' https://liber.herokuapp.com/liber/v1/candidate')
        const sortedData = response.data.sort((a, b) => {
            if (a['name'].toUpperCase() > b['name'].toUpperCase()) return 1;
            if (a['name'].toUpperCase() < b['name'].toUpperCase()) return -1;
            return 0;
        })
        if (response) setCandidates(sortedData)
    }
    useEffect(() => {
        getCandidates()
    }, [])
    const switchRoute = useDisplayStore(state => state.switchRoute)
    const setLibraryId = useDisplayStore(state => state.setLibraryId)
    const handleOnClick = (id) => {
        setLibraryId(id)
        switchRoute('PROFILE')
    }
    return (
        <TableContainer>
            <Table variant='striped' colorScheme='gray'>
                <Thead>
                    <Tr>
                        <Th>Serial</Th>
                        <Th>Name</Th>
                        <Th isNumeric>Registration ID   </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        candidates.map((candidate, id) => (
                            <Tr key={id}>
                                <Td cursor='pointer'>{id + 1}</Td>
                                <Td cursor='pointer' fontWeight='semibold' onClick={() =>handleOnClick(candidate.libraryId)}>{candidate.name.toUpperCase()}</Td>
                                <Td cursor='pointer' isNumeric>{candidate.libraryId}</Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}