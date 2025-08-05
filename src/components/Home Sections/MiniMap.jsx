export default function   MiniMap() {

const routes = [
  {
    title: 'المنصورة الجديدة',
    subtitle: 'إلى الوسط',
    color: 'bg-cyan-600'
  },
  {
    title: 'شارع الجمهورية',
    subtitle: 'إلى طلخا',
    color: 'bg-green-600'
  },
  {
    title: 'الجامعة',
    subtitle: 'إلى المحطة',
    color: 'bg-blue-600'
  }
];
	  return (
    <div className="text-center font-sans rtl">
      <header className="bg-[#eaf4fd] py-8 border-b border-gray-200">
        <h1 className="text-gray-800 text-3xl font-bold mb-2">
          خريطة المنصورة التفاعلية
        </h1>
        <p className="text-gray-600 text-xl">
          استكشف جميع الطرق والمحطات المتاحة في المنصورة والمناطق المجاورة
        </p>

       <div >
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-6  ">
      {routes.map((route, id) => (
        <div
          key={id}
          className="relative w-72 p-4 bg-white rounded-xl shadow-sm text-right" >

          <h2 className="text-md font-semibold text-gray-800">{route.title}</h2>
          <div
            className={` w-3 h-3 rounded-full  ${route.color}`}>
          </div>
          <p className="text-sm text-gray-600">{route.subtitle}</p>
        </div>
      ))}
    </div>

       </div>
      </header>

      

    </div>

    
    

    
    
  );

}