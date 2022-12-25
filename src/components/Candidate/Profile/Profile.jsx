import { Box, Button, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react"
import { DeleteIcon } from '@chakra-ui/icons'
import axios from "axios"
import moment from "moment"
import React, { useEffect } from "react"
import { useDisplayStore } from "../../../store/displayStore"

export const Profile = () => {
    const [data, setData] = React.useState({})
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
    const [isPaid, setIsPaid] = React.useState(false)
    const [unpdaidMonth, setUnpdaidMonth] = React.useState(0)
    const [password, setPassword] = React.useState('')
    const [errorMessage, setErrorMessage] = React.useState('')
    const [paidTime, setPaidTime] = React.useState(0)
    const username = useDisplayStore(state => state.username)
    const libraryId = useDisplayStore(state => state.libraryId)
    const switchRoute = useDisplayStore(state => state.switchRoute)
    const handlePassword = (t) => setPassword(t.value)
    const getProfileData = async () => {
        const response = await axios.post(' https://liber.herokuapp.com/liber/v1/candidate/profile', {
            libraryId: libraryId
        })
        if (response) {
            setData(response.data)
            const cycleDate = response.data.cycleDate
            const nextCycleData = moment(cycleDate).add(1, 'M')
            const currentDate = new Date()
            const diff = moment(currentDate).diff(nextCycleData, 'days')
            if (diff <= 0) {
                setPaidTime(parseInt(Math.abs(diff) / 30))
                setIsPaid(true)
            }
            else {
                setIsPaid(false)
                setUnpdaidMonth(parseInt(diff / 30 + 1))
            }
        }
    }
    const handlePayment = () => {
        setIsModalOpen(true)
    }
    const handleDelete = () => {
        setIsDeleteModalOpen(true)
    }
    const handleDeleteClick = async () => {
        const response = await axios.post(' https://liber.herokuapp.com/liber/v1/candidate/delete', {
            libraryId,
            username,
            password
        })
        if (response && response.data.message === 'success') {
            setIsDeleteModalOpen(false)
            switchRoute('CANDIDATE')
        }
        else if (response) {
            setErrorMessage(response.data.message)
            setTimeout(() => setErrorMessage(''), 6000)
        }
    }
    const handleUpdate = () => {
        setIsModalOpen(true)
        switchRoute('UPDATE')
    }
    useEffect(() => {
        getProfileData()
    }, [])
    const handlePayClick = async () => {
        const response = await axios.post(' https://liber.herokuapp.com/liber/v1/user/validate/pay', {
            libraryId,
            username,
            password
        })
        if (response && response.data.message === 'success') {
            getProfileData()
            setIsModalOpen(false)
        }
        else if (response) {
            setErrorMessage(response.data.message)
            setTimeout(() => setErrorMessage(''), 6000)
        }
    }
    return (
        <TableContainer backgroundColor={'#E5E4E2'}>
            <Table variant='unstyled' size='sm'>
                <Tbody>
                    <Tr>
                        <Td>Name</Td>
                        <Td>{data.name}</Td>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                    </Tr>
                    <Tr>
                        <Td>Father's Name</Td>
                        <Td>{data.fatherName}</Td>
                    </Tr>
                    <Tr>
                        <Td>Mother's Name</Td>
                        <Td>{data.motherName}</Td>
                    </Tr>
                    <Tr>
                        <Td>Date of Birth</Td>
                        <Td>{data.dob}</Td>
                    </Tr>
                    <Tr>
                        <Td>Gender</Td>
                        <Td>{data.gender}</Td>
                    </Tr>
                    <Tr>
                        <Td>Contact Number</Td>
                        <Td>{data.contactNumber}</Td>
                    </Tr>
                    <Tr>
                        <Td>Email</Td>
                        <Td>{data.email}</Td>
                    </Tr>
                    <Tr>
                        <Td>Local Address</Td>
                        <Td>{data.localAddress}</Td>
                    </Tr>
                    <Tr>
                        <Td>Permanent Address</Td>
                        <Td>{data.permanentAddress}</Td>
                    </Tr>
                    <Tr>
                        <Td>Aadhaar Number</Td>
                        <Td>{data.aadhaar}</Td>
                    </Tr>
                    <Tr>
                        <Td>Local Guardian's Name</Td>
                        <Td>{data.localAddress}</Td>
                    </Tr>
                    <Tr>
                        <Td>Relation</Td>
                        <Td>{data.relation}</Td>
                    </Tr>
                    <Tr>
                        <Td>Guardian Address</Td>
                        <Td>{data.guardianAddress}</Td>
                    </Tr>
                    <Tr>
                        <Td>Guardian Contact Number</Td>
                        <Td>{data.guardianContactNumber}</Td>
                    </Tr>
                    <Tr>
                        <Td>Institute Name</Td>
                        <Td>{data.instituteName}</Td>
                    </Tr>
                    <Tr>
                        <Td>Education Qualification</Td>
                        <Td>{data.educationQualification}</Td>
                    </Tr>
                    <Tr>
                        <Td>Preparing for</Td>
                        <Td>{data.preparingFor}</Td>
                    </Tr>
                    <Tr>
                        <Td>Batch Timing</Td>
                        <Td>{data.batchTiming}</Td>
                    </Tr>
                    <Tr>
                        <Td>Seat</Td>
                        <Td>{data.seat}</Td>
                    </Tr>
                    <Tr>
                        <Td>Date of Joining</Td>
                        <Td>{data.doj}</Td>
                    </Tr>
                    <Tr>
                        <Td><Button onClick={handlePayment} textColor={isPaid ? 'green' : 'red'}>{isPaid ? (paidTime ? `PAID | ${paidTime}` : `PAID`) : `PAY | ${unpdaidMonth}`}</Button></Td>
                        <Td><Button onClick={handleUpdate} colorScheme={'yellow'} variant={'solid'}>Update</Button></Td>
                        <Td></Td>
                        <Td></Td>
                        <Td><IconButton onClick={handleDelete}><DeleteIcon /></IconButton></Td>
                    </Tr>
                    <Modal isOpen={isModalOpen}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Secure</ModalHeader>
                            <ModalCloseButton onClick={() => setIsModalOpen(false)} />
                            <ModalBody>
                                <Input onChange={(e) => handlePassword(e.target)} borderColor={'blue'} type='password' />
                            </ModalBody>

                            <ModalFooter>
                                {errorMessage.length ? <Box style={{ display: 'inlineBlock', textColor: 'red' }}>{errorMessage}</Box> : null}
                                <Button onClick={handlePayClick} colorScheme={'red'} variant='solid'>Pay</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    <Modal isOpen={isDeleteModalOpen}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Secure</ModalHeader>
                            <ModalCloseButton onClick={() => setIsDeleteModalOpen(false)} />
                            <ModalBody>
                                <Input onChange={(e) => handlePassword(e.target)} borderColor={'blue'} type='password' />
                            </ModalBody>

                            <ModalFooter>
                                {errorMessage.length ? <Box style={{ display: 'inlineBlock', color: 'red' }}>{errorMessage}</Box> : null}
                                <Button onClick={handleDeleteClick} colorScheme={'red'} variant='solid'>Delete</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Tbody>
            </Table>
        </TableContainer>
    )
}