import React from 'react'

function Hero() {
    return (
        <section className="bg-black text-white">
            <div className="mx-auto max-w-screen-xl px-4 py-20 lg:flex  lg:items-center">
                <div className="mx-auto max-w-3xl text-center">
                    <div className='flex items-baseline justify-center p-10'>
                        <h2 className='text-white border px-3 p-4 rounded-full '>See what’s new |
                           <span className='text-sky-400'> AI Diagrams</span>
                        </h2>
                    </div>
                    <h1
                        className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
                    >
                        Documents & diagrams

                         <span className="text-white"> for engineering teams </span>
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                        All-in-one markdown editor, collaborative canvas, and diagram-as-code builder


                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <a
                            className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                            href="#"
                        >
                            Learn More
                        </a>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
