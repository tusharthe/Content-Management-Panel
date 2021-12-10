import { useEffect, useState, Fragment, useRef } from "react";
// import ActionDropdown from "./action_dropdown";
// import { Dialog, Transition } from '@headlessui/react';
// import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";

// import { useForm } from 'react-hook-form';
// import Pagination from "./Pagination";

import { useForm } from 'react-hook-form';



export default function AddNewPoster(props) {



    // 
    // const [actionType, setActionType] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isDone, setIsDone] = useState(false);
    // const [items, setItems] = useState([]);


    // const indexOfLastPost = currentPage * postsPerPage;
    // const indexOfFirstPost = indexOfLastPost - postsPerPage;



    const { register, handleSubmit, reset, formState: { errors } } = useForm();







    useEffect(() => {

    }, []);


    const onSubmit = data => {
        console.log(data);


        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('desc', data.desc)
        formData.append('file', data.file[0])

        const requestOptions = {
            method: 'POST',

            body: formData
        };
        setIsLoaded(true);
        setIsDone(false);

        fetch(window.$apiUrl + "savePoster", requestOptions)
            .then(
                async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                    setIsLoaded(false);
                    // console.log(data);

                    if (data.status === "success") {

                        reset({});
                        setIsDone(true);

                    } else {

                    }



                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(false);
                    setIsDone(false);
                    setIsDone(true);
                    setError(error);
                }
            ).catch(error => {
                setIsLoaded(false);
                setError(error);
                setIsDone(true);
                console.error('There was an error!', error);
            });
    };




    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data" action="/search" >

                <div className="header bg-bluestarbg">

                    <header className="body-font">

                        <div className=" mx-0 flex flex-wrap p-4 flex-col md:flex-row items-center">


                            <div className="md:m-auto flex-col   items-center  justify-center">


                                <h2 className="text-2xl" >

                                    Add New image
                                </h2>

                            </div>
                            <div>



                                <div className=" mx-2  pl-4  uppercase  cursor-pointer title-font font-semibold items-center mb-1 md:mb-0">
                                    {!isLoaded ? (
                                        <button type="submit" className="bg-green-400 text-white  py-2 px-4 border-b-4  rounded-full" >Save</button>
                                    ) :
                                        <button type="button" className="bg-green-400 text-white  py-2 px-4 border-b-4  rounded-full" >Uploading...</button>
                                    }

                                </div>

                            </div>

                        </div>
                    </header>




                </div>
                <div className="flex flex-col bg-white min-w-full mx-1">
                    <div className=" overflow-x-auto lg:mx-4">

                        {isDone ? (
                            <div className="text-xl "><br />
                                Successfully Uploaded <br /><br />

                            </div>
                        ) :
                            ""
                        }


                        <div className="w-1/2">
                            <div className=" ">

                                <lable>

                                    Title
                                </lable>
                                <input type="text" required style={{ border: '1px solid black' }} {...register("title")} name="title" className="w-full p-2" />

                            </div>


                        </div>

                        <div className="w-1/2">

                            <div className="">

                                <lable>

                                    Description
                                </lable>
                                <textarea type="text" required style={{ border: '1px solid black' }} {...register("desc")} name="desc" className="w-full p-2" ></textarea>

                            </div>
                        </div>

                        <div className="w-1/2">

                            <div className=" ">

                                <lable>

                                    File
                                </lable>
                                <input type="file" required style={{ border: '1px solid black' }} {...register("file")} name="file" className="w-full p-2" />

                            </div>
                        </div>
                    </div>


                </div >
            </form>
        </>

    )

}