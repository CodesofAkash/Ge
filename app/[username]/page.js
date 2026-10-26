"use client"
import React, { useState, useEffect } from 'react';
import PaymentPage from "@/components/PaymentPage";
import { useParams } from 'next/navigation';
import { fetchProjects } from '@/actions/useractions';

const MyAccount = () => {
    const params = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const projects = await fetchProjects();
                const foundUser = projects.find(project => {
                    const normalizedCreator = project.creatorName.trim();
                    const normalizedParam = decodeURIComponent(params.username).trim();
                    return normalizedCreator === normalizedParam});
                
                if (foundUser) {
                    setUser(foundUser);
                } else {
                    console.error('User not found');
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (params.username) {
            fetchUserData();
        }
    }, [params.username]);

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <div>Loading user data...</div>
                </div>
            ) : user ? (
                <PaymentPage userData={user} />
            ) : (
                <div className="flex justify-center items-center min-h-screen">
                    <div>User not found</div>
                </div>
            )}
        </>
    );
}

export default MyAccount;
