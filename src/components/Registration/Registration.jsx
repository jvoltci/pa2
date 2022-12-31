import { Button, Radio, Input, RadioGroup, Select, Stack, Table, TableContainer, Tbody, Td, Textarea, Tr, Box } from "@chakra-ui/react"
import axios from "axios"
import React, { useEffect } from "react"

const initialValues = {
    name: '',
    fatherName: '',
    motherName: '',
    dob: '',
    gender: '',
    contactNumber: '',
    email: '',
    localAddress: '',
    permanentAddress: '',
    aadhaar: '',
    localGuardianName: '',
    relation: '',
    guardianAddress: '',
    guardianContactNumber: '',
    instituteName: '',
    educationQualification: '',
    preparingFor: '',
    batchTiming: '',
    seat: '',
    doj: '',
}


export const Registration = () => {
    const [values, setValues] = React.useState(initialValues)
    const [seats, setSeats] = React.useState({})
    const [load, setLoad] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const getSeats = async () => {
        const response = await axios.get(' https://pa2-api.onrender.com/liber/v1/seats')
        if(response.data) {
            setSeats(JSON.parse(response.data.data))
        }
    }
    useEffect(() => {
        getSeats()
    }, [])
    const handleInputChange = (data) => {
        const { name, value } = data

        setValues({
            ...values,
            [name]: value,
        })
    }
    const handleSubmit = async () => {
        const notFilled = Object.values(values).filter(val => val === '')
        if (notFilled.length !== 0) return
        setLoad(true)
        const response = await axios.post(' https://pa2-api.onrender.com/liber/v1/candidate/add', {
            values: values
        }).finally(() => {
            setLoad(false)
            reset()
        })
        if(response.data['message'] === 'success') {
            setSuccess(true)
            setTimeout(() => setSuccess(false), 5000)
        }
    }
    const reset = () => {
        const currentValues = values
        Object.keys(currentValues).forEach(key => (currentValues[key] = ''))
        setValues(currentValues)
        getSeats()
    }
    const showVacantSeats = () => {
        let allSeats = []
        Object.keys(seats).forEach(seat => {
            if (values.batchTiming.length === 2) {
                const time1 = values.batchTiming[0]
                const time2 = values.batchTiming[1]
                if (seats[seat][time1] === 0 && seats[seat][time2] === 0) {
                    allSeats.push(seat)
                }
            }
            else if(values.batchTiming === 'F') {
                if (seats[seat]['M'] === 0 && seats[seat]['A'] === 0 && seats[seat]['E'] === 0) {
                    allSeats.push(seat)
                }
            }
            else {
                if (seats[seat][values.batchTiming] === 0) {
                    allSeats.push(seat)
                }
            }
        })
        return (
            allSeats.map(seat => (<option key={seat}>{seat}</option>))
        )
    }
    return (
        <TableContainer>
            <Table variant='unstyled'>
                <Tbody>
                    <Tr>
                        <Td>Name</Td>
                        <Td><Input name="name" value={values.name} onChange={(e) => handleInputChange(e.target)} borderColor='blue.400' width={300} /></Td>
                    </Tr>
                    <Tr>
                        <Td>Father's Name</Td>
                        <Td><Input name="fatherName" value={values.fatherName} onChange={(e) => handleInputChange(e.target)} borderColor='blue.400' width={300} /></Td>
                    </Tr>
                    <Tr>
                        <Td>Mother's Name</Td>
                        <Td><Input name="motherName" value={values.motherName} onChange={(e) => handleInputChange(e.target)} borderColor='blue.400' width={300} /></Td>
                    </Tr>
                    <Tr>
                        <Td>Date of Birth</Td>
                        <Td><Input name="dob" type={'date'} value={values.dob} onChange={(e) => handleInputChange(e.target)} borderColor='blue.400' width={300} /></Td>
                    </Tr>
                    <Tr>
                        <Td>Gender</Td>
                        <Td>
                            <RadioGroup name='gender' value={values.gender} onChange={(e) => handleInputChange({ value: e, name: 'gender' })} defaultValue=''>
                                <Stack spacing={5} direction='row'>
                                    <Radio value='Male'>
                                        Male
                                    </Radio>
                                    <Radio value='Female'>
                                        Female
                                    </Radio>
                                </Stack>
                            </RadioGroup>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>Contact Number</Td>
                        <Td>
                            <Input
                                name="contactNumber"
                                onWheel={(e) => e.target.blur()}
                                type='number'
                                value={values.contactNumber}
                                onChange={(e) => handleInputChange(e.target)} borderColor='blue.400'
                                width={300} />
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>Email</Td>
                        <Td><Input name="email" type='email' value={values.email} onChange={(e) => handleInputChange(e.target)} borderColor='blue.400' width={300} /></Td>
                    </Tr>
                    <Tr>
                        <Td>Local Address</Td>
                        <Td><Textarea name="localAddress" value={values.localAddress} onChange={(e) => handleInputChange(e.target)} borderColor='blue.400' width={400} /></Td>
                    </Tr>
                    <Tr>
                        <Td>Permanent Address</Td>
                        <Td><Textarea name="permanentAddress" value={values.permanentAddress} onChange={(e) => handleInputChange(e.target)} borderColor='blue.400' width={400} /></Td>
                    </Tr>
                    <Tr>
                        <Td>Aadhaar Number</Td>
                        <Td><Input name="aadhaar" onWheel={(e) => e.target.blur()} type='number' value={values.aadhaar} onChange={(e) => handleInputChange(e.target)} borderColor='blue.400' width={300} /></Td>
                    </Tr>
                    <Tr>
                        <Td>Local Guardian's Name</Td>
                        <Td><Input name="localGuardianName" value={values.localGuardianName} onChange={(e) => handleInputChange(e.target)} borderColor='blue.400' width={300} /></Td>
                    </Tr>
                    <Tr>
                        <Td>Relation</Td>
                        <Td><Input name="relation" value={values.relation} onChange={(e) => handleInputChange(e.target)} borderColor='blue.400' width={300} /></Td>
                    </Tr>
                    <Tr>
                        <Td>Guardian Address</Td>
                        <Td><Textarea name="guardianAddress" value={values.guardianAddress} onChange={(e) => handleInputChange(e.target)} borderColor='blue.400' width={400} /></Td>
                    </Tr>
                    <Tr>
                        <Td>Guardian Contact Number</Td>
                        <Td><Input name="guardianContactNumber" onWheel={(e) => e.target.blur()} type='number' value={values.guardianContactNumber} onChange={(e) => handleInputChange(e.target)} borderColor='blue.400' width={300} /></Td>
                    </Tr>
                    <Tr>
                        <Td>Institute Name</Td>
                        <Td><Input name="instituteName" value={values.instituteName} onChange={(e) => handleInputChange(e.target)} borderColor='blue.400' width={300} /></Td>
                    </Tr>
                    <Tr>
                        <Td>Education Qualification</Td>
                        <Td><Input name="educationQualification" value={values.educationQualification} onChange={(e) => handleInputChange(e.target)} borderColor='blue.400' width={300} /></Td>
                    </Tr>
                    <Tr>
                        <Td>Preparing for</Td>
                        <Td><Input name="preparingFor" value={values.preparingFor} onChange={(e) => handleInputChange(e.target)} borderColor='blue.400' width={300} /></Td>
                    </Tr>
                    <Tr>
                        <Td>Batch Timing</Td>
                        <Td>
                            <Select name="batchTiming" value={values.batchTiming} onChange={(e) => handleInputChange(e.target)} borderColor='blue.400' width={300} placeholder='Shift'>
                                <option value='M'>Morning</option>
                                <option value='A'>Afternoon</option>
                                <option value='E'>Evening</option>
                                <option value='MA'>Morning + Afternoon</option>
                                <option value='AE'>Afternoon + Evening</option>
                                <option value='ME'>Morning + Evening</option>
                                <option value='F'>Full Day</option>
                            </Select>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>Seat</Td>
                        <Td>
                            <Select disabled={values.batchTiming ? false : true} name="seat" value={values.seat} onChange={(e) => handleInputChange(e.target)} borderColor='blue.400' width={300} placeholder='Seat'>
                                {showVacantSeats()}
                            </Select>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>Date of Joining</Td>
                        <Td><Input name="doj" type={'date'} value={values.doj} onChange={(e) => handleInputChange(e.target)} borderColor='blue.400' width={300} /></Td>
                    </Tr>
                    <Tr>
                        <Td></Td>
                        <Td><Button isLoading={load} onClick={handleSubmit} colorScheme='cyan' width={200}>Submit</Button><Box display='inline' textColor={'green'}>{success ? '     Success' : ''}</Box></Td>
                    </Tr>

                </Tbody>
            </Table>
        </TableContainer>
    )
}