"use client";
import SkillApi from '@/services/settings/SkillApi';
import React, { useEffect, useState } from 'react';

function GlobelLocalStoreData() {
    const [data, setData] = useState(null);

    // Save data to localStorage when it changes
    useEffect(() => {
        if (typeof window !== "undefined" && data !== null) {
            localStorage.setItem("globalSettings", JSON.stringify(data));
        }
    }, [data]);

    const handleSaveData = async () => {
        try {
            const response = await SkillApi.globalSkillGetApi();
            if (response.status === 200) {
                const globalSettings = response?.data?.data || [];
                setData(globalSettings);
                localStorage.setItem("globalSettings", JSON.stringify(globalSettings));
            }
        } catch (error) {
            console.error('Error fetching globalSettings:', error);
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const localSkills = localStorage.getItem("globalSettings");
            if (localSkills) {
                setData(JSON.parse(localSkills));
            } else {
                handleSaveData();
            }
        }
    }, []);

    return <div></div>;
}

export default GlobelLocalStoreData;
