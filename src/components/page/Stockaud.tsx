import React from 'react';
import { Sidebar } from '../Imports';
import ConditionSelector from '../elements/ConditionSelector';
import But from '../elements/But'; 

const Stockaud = () => {
  const Content = "Submit";
  return (
    <div className="flex">
      <Sidebar />
      <div className=' w-full '>
        <div className='flex'>
          <div className='ml-20 mt-10 border-slate-200 rounded-full bg-slate-200 h-44 w-44'></div>
          <div>
         <div className='mt-28 ml-5 flex '>
         <h1 className=' text-3xl font-semibold mt-1'>SYSTEM : </h1>
            <span>
    <textarea id="small-input" className="block w-64 ml-3 p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-slate-200 text-xs focus:ring-blue-500 focus:border-blue-500"></textarea>
</span>
         </div>
            <h2 className='mt-10 ml-5 text-xl font-semibold'>Details :</h2>
            <div className="mb-6">
              <textarea id="message" rows={4} className="block p-3 mt-5 ml-3 w-[34rem] text-sm text-gray-900 bg-slate-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Description here...."></textarea>
            </div>
          </div>
        </div>
        <h1 className='ml-[270px] mb-2 text-xl font-semibold'>Condition :</h1>
        <div className='ml-[265px] p-5 flex border bg-slate-200 rounded-lg w-[34rem]'>
          <ConditionSelector/>
        </div>
        <div className='mt-4 ml-[480px]'>
          <But  content={Content} />
        </div>
      </div>
    </div>
  );
}

export default Stockaud;
