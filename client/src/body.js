import { useEffect, useState, Fragment, useRef } from "react";
import ActionDropdown from "./action_dropdown";
import { Dialog, Transition } from '@headlessui/react';
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";

// import { useForm } from 'react-hook-form';
// import Pagination from "./Pagination";

import { NavLink } from "react-router-dom";


export default function Body(props) {




    // const [actionType, setActionType] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);


    // const indexOfLastPost = currentPage * postsPerPage;
    // const indexOfFirstPost = indexOfLastPost - postsPerPage;









    useEffect(() => {
        getAllData();
    }, []);


    function getAllData(offsetPage = 1) {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer my-token',
            },
            body: JSON.stringify({ 'data': '' })
        };
        fetch(window.$apiUrl + "getList", requestOptions)
            .then(
                async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();

                    if (!response.ok) {

                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                    setIsLoaded(true);
                    // console.log(data);

                    if (data.status === "ok") {
                        setItems(data.data);


                    } else {

                    }



                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            ).catch(error => {
                setIsLoaded(true);
                setError(error);
                console.error('There was an error!', error);
            });

    }






    return (
        <>
            <div className="header bg-bluestarbg">

                <header className="body-font">

                    <div className=" mx-0 flex flex-wrap p-4 flex-col md:flex-row items-center">
                        <NavLink activeClassName="active" to="/add-new" className=" mx-2  pl-4  uppercase  cursor-pointer title-font font-semibold items-center mb-1 md:mb-0">
                            <img alt="addnew" width={24} src="https://img.icons8.com/android/50/000000/plus.png" />

                        </NavLink>



                        <div className="md:m-auto flex-col   items-center  justify-center">


                            <h2 className="text-2xl" >

                                Content Galery
                            </h2>

                        </div>


                    </div>
                </header>




            </div>
            <div className="flex flex-col bg-white min-w-full mx-1">
                <div className=" overflow-x-auto lg:mx-4">

                    <div >

                        {items.map((poster) => (

                            <div key={poster._id} class="flex flex-row w-100">


                                <div className="flex w-2/5 m-4 p-5 items-center  justify-center">

                                    <img alt="poster" width={280} src={window.$apiUrl + "uploads/" + poster.image} />

                                </div>

                                <div className="flex flex-col   justify-center w-3/5">
                                    <div>
                                        {poster.title}
                                    </div>
                                    <br />
                                    <div>
                                        {poster.desc}
                                    </div>
                                </div>

                                {/* <hr /> */}

                            </div>

                        ))}

                    </div>

                </div>

            </div >
        </>

    )

}