import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import axios from "axios"
import moment from "moment/moment"
import React from "react"
import { useDisplayStore } from "../../store/displayStore"

export const Due = () => {
    const [candidates, setCandidates] = React.useState([])
    const getCandidates = async () => {
        const response = await axios.get(' https://liber.herokuapp.com/liber/v1/candidate')
        const sortedData = response.data.sort((a, b) => {
            if (a['name'].toUpperCase() > b['name'].toUpperCase()) return 1
            if (a['name'].toUpperCase() < b['name'].toUpperCase()) return -1
            return 0;
        })
        const activeCandidates = sortedData.filter(data => {
            const cycleDate = data.cycleDate
            const nextCycleData = moment(cycleDate).add(1, 'M')
            const currentDate = new Date()
            const diff = moment(currentDate).diff(nextCycleData, 'days')
            if(diff > 0) {
                data['dueDays'] = diff
                return true
            }
            return false
        })
        if (response) setCandidates(activeCandidates)
    }
    React.useEffect(() => {
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
            <Table variant='striped' colorScheme='red'>
                <Thead>
                    <Tr>
                        <Th>Serial</Th>
                        <Th>Name</Th>
                        <Th isNumeric>Registration ID</Th>
                        <Th isNumeric>Due Days</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        candidates.map((candidate, id) => (
                            <Tr key={id}>
                                <Td cursor='pointer'>{id + 1}</Td>
                                <Td cursor='pointer' fontWeight='semibold' onClick={() => handleOnClick(candidate.libraryId)}>{candidate.name.toUpperCase()}</Td>
                                <Td cursor='pointer' isNumeric>{candidate.libraryId}</Td>
                                <Td cursor='pointer' isNumeric>{candidate.dueDays}</Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}