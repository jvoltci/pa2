import React from "react"
import { useDisplayStore } from '../../store/displayStore'
import { Registration } from "../Registration/Registration"
import { Candidate } from "../Candidate/Candidate"
import { Profile } from "../Candidate/Profile/Profile"
import { Active } from "../Active/Active"
import { Due } from "../Due/Due"
import { AboutToExpire } from "../AboutToExpire.jsx/AboutToExpire"
import { Update } from "../Update/Update"

export const Display = () => {
    const route = useDisplayStore(state => state.route)
    switch(route) {
        case 'REGISTRATION':
            return <Registration />
        case 'PROFILE':
            return <Profile />
        case 'UPDATE':
            return <Update />
        case 'CANDIDATE':
            return <Candidate />
        case 'ACTIVE':
            return <Active />
        case 'DUE':
            return <Due />
        case 'TOEXPIRE':
            return <AboutToExpire />
        default:
            return <Candidate />
    }
}