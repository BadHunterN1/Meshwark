import TestmonialCard from "./TestmonialCard"
import { useState } from "react";
import Record from "./Record";

const Testmonials = () => {
    const testmonialsArray = [
        {
            p: '"التطبيق دا عبقري! بيوفر عليا وقت و مجهود كتير في اني اعرف احسن طريق للوصول لأي مكان في المنصورة"',
            emoji: '🧑🏻‍💻',
            name: 'محمود عبد الرحمن',
            title: 'طالب كلية الهندسة'
        },
        {
            p: '"افضل تطبيق استخدمته للمواصلات! المعلومات دقيقه و الواجهه سهله جدا. انصح كل طلاب المنصوره يجربوه"',
            emoji: '👩🏻‍💻',
            name: 'فاطمه حسن ابراهيم',
            title: 'طالب كلية الطب'
        },
        {
            p: '"التطبيق دا غير حياتي! بقيت اوصل الجامعه في نص الوقت اللي كنت باخده قبل كده. شكرا للفريق الرائع ده"',
            emoji: '🧔🏻🎓',
            name: 'أحمد محمد علي',
            title: 'طالب جامعة المنصورة'
        }
    ];

    let [testmonials, setTestmonials] = useState(testmonialsArray);

    const recordsArray = [
        {
            h4: '24/7',
            p: 'خدمه مستمره'
        },
        {
            h4: '+50',
            p: 'محطه مغطاه'
        },
        {
            h4: '+500',
            p: 'طريق متاح'
        },
        {
            h4: '+1000',
            p: 'طالب راضي'
        }
    ];
    let [records, setRecords] = useState(recordsArray);


    return (
        <section className='testmonials text-center  p-8 text-white'>
            <h2 className=" text-4xl font-bold">ماذا يقول طلاب المنصورة؟</h2>
            <p className="my-3">اراء حقيقية من طلاب جامعة المنصورة الذين يستخدمون التطبيق يوميا</p>
            <section className="testmonial-cards lg:flex p-3" >
                {
                    testmonials.map(testmonial => {
                        return (
                            <TestmonialCard p={testmonial.p} emoji={testmonial.emoji} name={testmonial.name} title={testmonial.title} />
                        )
                    })
                }
            </section>
            <section className="records lg:flex p-8 justify-around sm:grid grid-rows-2 grid-flow-col" >
                {
                    records.map(record => {
                        return (
                            <Record h4={record.h4} p={record.p} />
                        )
                    })
                }
            </section>
        </section>
    )
}

export default Testmonials