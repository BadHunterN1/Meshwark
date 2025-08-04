import React from 'react'

const Record = ({ h4, p }) => {
    return (
        <section className='record'>
            <h4 className='text-4xl font-extrabold'>
                {h4}
            </h4>
            <p>
                {p}
            </p>
        </section>
    )
}

export default Record;