"use client"
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { newProject } from '@/actions/useractions';
import { useSession } from 'next-auth/react';



const Project = () => {
    const { data: session } = useSession();
    
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [info, setinfo] = useState({ projectName: "", creatorName: "", description: "", profilePic: "", coverPic: ""});
    const [fileUrl, setFileUrl] = useState("");


    const onSubmit = async (data) => {
        newProject(info, session.user.email);
    }

  return (
    <div>
        {session?
        <div className='flex justify-start items-center flex-col mb-32'>      
        <h3 className='text-xl font-bold text-center my-10 tracking-tight text-gray-900 md:text-2xl dark:text-white'>Croudfund Your Project</h3>
        <div className='w-1/2 rounded-lg bg-gray-800'>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full p-10 gap-5 flex justify-start items-center flex-col">
                <div className="mb-5 w-full">
                <label htmlFor="projectName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project&apos;s Name</label>
                    <input 
                        {...register("projectName", { required: true })} 
                        value={info.name} 
                        onChange={(e) => setinfo({ ...info, projectName: e.target.value })} 
                        type="text" 
                        id="projectName" 
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                        placeholder="Project name" 
                        required 
                    />
                </div>
                <div className="mb-5 w-full">
                    <label htmlFor="creatorName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                    <input 
                        {...register("creatorName", { required: true })} 
                        value={info.username} 
                        onChange={(e) => setinfo({ ...info, creatorName: e.target.value })} 
                        type="text" 
                        id="creatorName" 
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                        placeholder="Your Name" 
                        required 
                    />
                </div>
                <div className="mb-5 w-full">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project&apos;s Description</label>
                    <input 
                        {...register("description", { required: true })} 
                        value={info.username} 
                        onChange={(e) => setinfo({ ...info, description: e.target.value })} 
                        type="text" 
                        id="description" 
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                        placeholder="Project's description" 
                        required 
                    />
                </div>
                <div className="mb-5 w-full">
                    <label htmlFor="profilePic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
                    <input
                        {...register("profilePic", { required: true })}
                        onChange={async (e) => {
                            const selectedFile = e.target.files[0];
                            if (selectedFile) {
                                const url = URL.createObjectURL(selectedFile);
                                setFileUrl(url);
                                
                                // Upload file to server
                                const formData = new FormData();
                                formData.append('file', selectedFile);
                                
                                try {
                                    const response = await fetch('/api/upload', {
                                        method: 'POST',
                                        body: formData,
                                    });
                                    const result = await response.json();
                                    
                                    if (result.success) {
                                        setinfo({ ...info, profilePic: result.filename });
                                    } else {
                                        console.error('Upload failed:', result.message);
                                        setinfo({ ...info, profilePic: selectedFile.name });
                                    }
                                } catch (error) {
                                    console.error('Upload error:', error);
                                    setinfo({ ...info, profilePic: selectedFile.name });
                                }
                            }
                        }}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="user_avatar_help"
                        id="user_avatar"
                        type="file"
                    />
                </div>
                <div className="mb-5 w-full">
                    <label htmlFor="coverPic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Picture</label>
                    <input
                        {...register("coverPic")}
                        onChange={async (e) => {
                            const selectedFile = e.target.files[0];
                            if (selectedFile) {
                                const url = URL.createObjectURL(selectedFile);
                                setFileUrl(url);
                                
                                // Upload file to server
                                const formData = new FormData();
                                formData.append('file', selectedFile);
                                
                                try {
                                    const response = await fetch('/api/upload', {
                                        method: 'POST',
                                        body: formData,
                                    });
                                    const result = await response.json();
                                    
                                    if (result.success) {
                                        setinfo({ ...info, coverPic: result.filename });
                                    } else {
                                        console.error('Upload failed:', result.message);
                                        setinfo({ ...info, coverPic: selectedFile.name });
                                    }
                                } catch (error) {
                                    console.error('Upload error:', error);
                                    setinfo({ ...info, coverPic: selectedFile.name });
                                }
                            }
                        }}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="user_avatar_help"
                        id="user_avatar"
                        type="file"
                    />
                </div>
                <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-center p-3 px-52 mt-4 text-xl'>Save</button>
            </form>
        </div>
        </div>
        :
            <div>Loading Resources</div>
        }
    
</div>
  )
}

export default Project
