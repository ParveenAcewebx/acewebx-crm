"use client";
import SkillApi from '@/services/cadidateApis/settings/SkillApi';
import React, { useEffect, useState } from 'react';

function GlobelLocalStoreData() {
    const [data, setData] = useState(null);

    // Save data to localStorage when it changes
    useEffect(() => {
        if (typeof window !== "undefined" && data !== null) {
            localStorage.setItem("skills", JSON.stringify(data));
        }
    }, [data]);

    const handleSaveData = async () => {
        try {
            const response = await SkillApi.globalSkillGetApi();
            if (response.status === 200) {
                const skills = response?.data?.data?.skills || [];
                setData(skills);
                localStorage.setItem("skills", JSON.stringify(skills));
            }
        } catch (error) {
            console.error('Error fetching skills:', error);
        }
    };

    useEffect(() => {
        // if (typeof window !== "undefined") {
        //     const localSkills = localStorage.getItem("skills");
        //     if (localSkills) {
        //         setData(JSON.parse(localSkills));
        //     } else {
        handleSaveData();
        // }
        // }
    }, []);

    return <div></div>;
}

export default GlobelLocalStoreData;
