import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import jsonData from "../data/data.json";
import { GoChevronLeft } from "react-icons/go";

function Detailes() {
  const { id } = useParams();
  const [detalData, setDetalData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const data = jsonData.find((val) => val.id === id);
    setDetalData(data);
  }, [id]);

  console.log(17, detalData?.status);

  return (
    <div className='border-2 container lg:w-[800px]'>
      <div className='flex items-center gap-5 p-5' onClick={() => navigate(-1)}>
        <div className='text-purple-500'><GoChevronLeft /></div>
        <h3><b>Go back</b></h3>
      </div>

      <div className='flex flex-col shadow-2xl md:flex-row justify-between items-center p-8 rounded-md'>
        <div className='flex items-center gap-3 justify-between w-[100%] md:w-auto'>
          <h2 className='text-gray-400'>Status</h2>
          <div className={`px-3 py-2 rounded-md flex items-center gap-2
            ${detalData?.status === "paid" ? "bg-green-100 text-green-500" : 
              detalData?.status === "pending" ? "bg-yellow-100 text-yellow-500" : 
              "bg-gray-200 text-black"}`}>
            
            <span className={`w-3 h-3 rounded-full 
              ${detalData?.status === "paid" ? "bg-green-500" : 
                detalData?.status === "pending" ? "bg-yellow-500" : 
                "bg-gray-400"}`}>
            </span>

            {detalData?.status}
          </div>
        </div>

        <div className='hidden md:flex gap-2'>
          <button className='p-2 border-2 rounded-2xl'>Edit</button>
          <button className='p-2 border-2 rounded-2xl'>Delete</button>
          <button className='p-2 border-2 rounded-2xl'>Mark as Paid</button>
        </div>
      </div>
    </div>
  );
}

export default Detailes;
