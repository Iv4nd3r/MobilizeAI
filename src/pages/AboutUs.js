import React from 'react';

// Import SVG Photos
import FathiaPhoto from '../assets/FathiaPhoto.svg';
import KaniaPhoto from '../assets/KaniaPhoto.svg';

// AboutUs Component
const AboutUs = () => {
    const creators = [
        {
            name: 'Ivander Wijaya',
            role: 'Backend Developer',
            year: "Comp. Eng '22",
            photo: KaniaPhoto,
        },
        {
            name: 'Fathia Zulfa Alfajr',
            role: 'Frontend Developer',
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
        <div className="min-h-screen bg-gray-900 text-white px-6 md:px-16 py-12">
            {/* Navbar Offset */}
            <div className="pt-16">
                {/* Header Section */}
                <h1
                    className="text-center text-8xl md:text-5xl font-bold mb-6"
                    style={{
                        fontFamily: "'Montserrat', sans-serif",
                        backgroundImage: 'linear-gradient(to bottom, #D4D0AF, #EBEDEF)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Meet the Creators
                </h1>
                <hr className="w-3/4 mx-auto border-t-2 border-gray-400 mt-2 mb-12" />
            </div>

            {/* Creators Section */}
            <div className="flex flex-wrap justify-center gap-10">
                {creators.map((creator, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 rounded-xl p-6 flex flex-col items-center shadow-md max-w-xs"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                        {/* Creator Photo */}
                        <img
                            src={creator.photo}
                            alt={`${creator.name}'s photo`}
                            className="w-32 h-32 rounded-full mb-4"
                        />

                        {/* Creator Details */}
                        <h2 className="text-lg font-bold">{creator.name}</h2>
                        <p className="text-sm italic text-gray-400">{creator.year}</p>
                        <p className="mt-2 px-4 py-1 border border-gray-400 rounded-full text-sm">
                            {creator.role}
                        </p>
                    </div>
                ))}
            </div>

            {/* Footer Section */}
            <footer className="mt-12 text-center">
                <a
                    href="/contact"
                    className="text-xl font-semibold bg-clip-text text-transparent"
                    style={{
                        backgroundImage: 'linear-gradient(to bottom, #D4D0AF, #EBEDEF)',
                        fontFamily: "'Montserrat', sans-serif",
                    }}
                >
                    Contact Us
                </a>
            </footer>
        </div>
    );
};

export default AboutUs;
