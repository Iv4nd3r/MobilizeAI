import React from 'react';

// Import SVG Photos
import FathiaPhoto from '../src/assets/FathiaPhoto.svg';
import KaniaPhoto from '../src/assets/KaniaPhoto.svg';
import IvanderPhoto from '../src/assets/IvanderPhoto.svg';

// AboutUs Component
const AboutUs = () => {
    const creators = [
        {
            name: 'Ivander Wijaya',
            role: 'Backend Developer',
            year: "Comp. Eng '22",
            photo: IvanderPhoto,
        },
        {
            name: 'Fathia Zulfa Alfajr',
            role: 'Fullstack Developer',
            year: "Comp. Eng '22",
            photo: FathiaPhoto,
        },
        {
            name: 'Kania Aidilla Firka',
            role: 'Frontend Developer',
            year: "Comp. Eng '22",
            photo: KaniaPhoto,
        },
    ];

    return (
        <div className="min-h-screen bg-[#17202F] text-white px-6 md:px-16 py-12">
            {/* Wrapper with extra padding */}
            <div style={{ paddingTop: '120px' }}> {/* Adjust the value as needed */}
                {/* Header Section */}
                <div className="pt-32"> {/* Existing padding */}
                    <h1
                        className="text-center text-4xl md:text-5xl font-bold mb-6"
                        style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: '6rem', 
                            background: 'linear-gradient(to bottom, #D4D0AF, #EBEDEF)',
                            WebkitBackgroundClip: 'text', // Clip gradient to text
                            WebkitTextFillColor: 'transparent', // Transparent fill for gradient effect
                            lineHeight: '1.5', // Adjust line height for a compact look
                        }}
                    >
                        Meet the Creators
                    </h1>
                    <hr className="w-3/4 mx-auto border-t-2 border-gray-400 mt-2 mb-12" />
                </div>

                {/* Creators Section */}
                <div className="flex flex-wrap justify-center gap-8 mt-12">
                    {creators.map((creator, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 rounded-xl p-6 flex flex-col items-center shadow-md max-w-xs w-full"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                            {/* Creator Photo */}
                            <img
                                src={creator.photo}
                                alt={`${creator.name}'s photo`}
                                className="w-32 h-32 rounded-full mb-4"
                            />

                            {/* Creator Details */}
                            <div className="text-center">
                                <h2 className="text-xl font-bold">{creator.name}</h2>
                                <p className="text-sm italic text-gray-400">{creator.year}</p>
                                <p className="mt-2 px-4 py-1 border border-gray-400 rounded-full text-sm">
                                    {creator.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
