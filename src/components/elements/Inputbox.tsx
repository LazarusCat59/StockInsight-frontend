import React from 'react';

interface InputboxProps {
  ph: string;
  tag:string; 
  type:string;
  setType:any;
}

function Inputbox({ tag,ph, type, setType }: InputboxProps) { 
  return (
    <div>
       <div className='flex flex-wrap items-center mt-5'>
       <h1 className='  text-xl font-semibold'>{tag}</h1>
       <input
      type="text"
      id="input-group-1"
      value={type}
      onChange={(e) => setType(e.target.value)}
      className="bg-gray-50 border mx-5  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-12 w-56 p-5 " placeholder={ph}/>
       </div>
     
    </div>
  );
}

export default Inputbox;
