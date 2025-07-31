"use client"
import SkillApi from '@/services/cadidateApis/settings/SkillApi';
import React, { useEffect, useState } from 'react'

function GlobelLocalStoreData() {
    const [data, setData] = useState(null);

    useEffect(() => {
        // This effect runs whenever 'data' changes and stores it
        if (typeof window !== "undefined" && window.localStorage && data !== null) {
            localStorage.setItem("skills", JSON.stringify(data)); // Stringify for JSON
        }
    }, [data]); // Dependency array includes 'data'

    const handleSaveData = async () => {
        try {
            const response = await SkillApi.globalSkillGetApi()
            if (response.status === 200) {
                setData(response?.data?.data?.skills);
            }
        } catch (error) {
            console.log('error', error);
        }
    };
    useEffect(() => {
        handleSaveData()
    }, [])

    return (
        <div></div>
    )
}

export default GlobelLocalStoreData