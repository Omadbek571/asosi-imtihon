import React, { useEffect, useState } from 'react'
import data from "../data/data.json"
import img1 from "../images/img1.svg"
import Filter from '../components/Filter'
import { MdArrowForwardIos } from "react-icons/md";
import bgImg from "../images/bgImg.png"
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

function Home() {
    const [jsonData, setJsonData] = useState([])
    const navigate = useNavigate()
    const cards = useStore((state) => state.cards);
    const addCard = useStore((state) => state.addCard);

    useEffect(() => {
        setJsonData(data)
    }, [])

    const idGeneratorFn = () =>
        `XM-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;




    return (
        <div className='lg:flex lg:justify-center md:ml-2 mt-2'>
            <div className='gap-2 flex flex-col items-center w-[100%] lg:whitespace-nowrap lg:w-[45rem] '>
                <div className='flex items-center w-[90%] justify-between lg:w-[95%] md:w-[95%]'>
                    <div>
                        <h2 className='font-bold'>Invoices</h2>
                        <h3 className='text-gray-400'>{jsonData?.length} invoices</h3>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Filter />
                        <img src={img1} alt="img1" />
                    </div>
                </div>

                {cards?.length > 0 ? (
                    <div className='gap-5 flex flex-col'>
                        {cards?.map((value, index) => (
                            <div
                                onClick={() => navigate(`/detailes/${value.id}`)}
                                key={index}
                                className='shadow-lg hover:border-purple-500 hover:border flex items-center gap-5 justify-between rounded-md p-4 w-full max-w-[850px]'
                            >
                                <div className='flex flex-col md:flex-row md:gap-10 lg:gap-20'>
                                    <h2 className='text-gray-400'>
                                        #<span className='text-black font-bold'>{value.id}</span>
                                    </h2>
                                    <h2 className='text-gray-400 whitespace-nowrap'>Due {value.paymentDue}</h2>
                                    <h2>£ <b>{value.items[0].price}</b></h2>
                                </div>
                                <div className='flex flex-col md:flex-row items-center gap-2'>
                                    <h3 className='text-gray-400 whitespace-nowrap '>{value.clientName}</h3>
                                    <div className="flex justify-between items-center gap-2">
                                        <div
                                            className={`flex items-center w-24  gap-2 px-3 py-2 rounded-md text-sm text-center
                                                ${value.status === "paid"
                                                    ? "bg-green-100 text-green-500"
                                                    : value.status === "pending"
                                                        ? "bg-yellow-100 text-yellow-500"
                                                        : "bg-gray-200 text-black"
                                                }`}
                                        >
                                            <span className="w-2 h-2 bg-current rounded-full" />
                                            <span>
                                                {value.status.charAt(0).toUpperCase() + value.status.slice(1)}
                                            </span>
                                        </div>
                                        <div className='hidden md:block text-purple-500 '><MdArrowForwardIos /></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <img className='mt-44' src={bgImg} alt="" />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home
