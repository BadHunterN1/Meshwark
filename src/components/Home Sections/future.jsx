
import {  Clock4, Shield ,Map } from 'lucide-react';

const futureItems = [
  {i:<Map className="w-9 h-10"/> , h1:'تغطية شاملة' , p:'جميع انحاء المنصوره  والقرى فى تطبيق واحد', style: {
     background: 'linear-gradient(135deg, #3bbaf2 0%, #47e085 100%)'
  }},
  {i:<Shield className="w-9 h-10"/> ,h1:'مواصلات موثوقة' , p:'معلومات محدثه عن الاتوبيسات      والميكروباصات والمحطات', style: {
      background:  'linear-gradient(135deg, #4be173ff 0%, #a1eda6ff 100%)'  
    }},
  {i:<Clock4 className="w-9 h-10"/> ,h1:'اسرع الطرق' , p:'خوارزميه ذكيه تحدد افضل الطرق واقصرها لتوفير وقتك', style:{
    background: 'linear-gradient(135deg, #3ba9f2 0%, #78c9fa 100%)'
  }}
]


function Future() {
  return (
    <div className='text-center py-20 px-30   '>

     <h1 className='text-[40px] font-medium mb-3'>لماذا تختار تطبيقنا ؟</h1>
     <p className='mb-15 font-medium text-[20px] text-[#838584]'>نقدم لك افضل تجربه نقل فى المنصوره مع ميزات حصريه تجعل رحلتك اسهل واسرع</p>
      
     <div className='grid  md:grid-cols-3 gap-2 place-items-center mx-auto'>
       {futureItems.map((item, index) => (
      <div key={index} className=' h-full  sm:grid-cols-2 w-96 md:grid-cols-1 bg-white py-7 px-[30px] rounded-lg shadow-md'>
       <div className={`  mx-auto text-white w-16 h-16 flex items-center justify-center mb-4 rounded-xl `} style={item.style} >
    {item.i}
  </div> 
        <h1 className='my-3 font-semibold text-[27px]'> {item.h1} </h1>
        <p className='text-[#838584] text-[17px] my-2'> {item.p} </p>
      </div>
        ))}
     </div>
    
    </div>
  )
}

export default Future

