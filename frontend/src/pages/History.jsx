import React from 'react';

// Event data
const Dental1 = {
    event1: 'Dental Event 2022',
    role: '',
    description: '',
    location: 'Sample Address',
    date: 'Sep 2022',
};

const Dental2 = {
    event1: 'Dental Event 2023',
    role: '',
    description: '',
    location: 'Sample Address',
    date: 'Sep 2023',
};

const Dental3 = {
    event1: 'Dental Event 2024',
    role: '',
    description: '',
    location: 'Sample Address',
    date: 'Sep 2024',
};

const Profile = {
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phone: '123-456-7890',
    username: 'alicejohnson',
    skill: 'Dental',
    events: [Dental1, Dental2, Dental3], // Example event data
};

const History = () => {
    return (
        <div className="w-screen min-h-screen font-black bg-cyan-100 space-y-16 bg-cover bg-center">
            <p className="p-15 -mt-10 text-zinc-100 bg-stone-900 bg-cover bg-center w-screen h-32 text-5xl text-center flex items-center justify-center">
                Volunteer History
            </p>
            <div className="px-6 -mt-9">
                <form className="flex flex-wrap gap-6">
                    {/* First input section */}
                    <div className="flex-1 min-w-[200px]">
                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                            Volunteer Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={Profile.name}
                            readOnly
                            className="w-full px-3 py-2 font-light border rounded-lg shadow-sm focus:outline-none focus:border-sky-700"
                        />
                    </div>
                    
                    {/* Second input section */}
                    <div className="flex-1 min-w-[200px]">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={Profile.email}
                            readOnly
                            className="w-full px-3 py-2 font-light border rounded-lg shadow-sm focus:outline-none focus:border-sky-700"
                        />
                    </div>

                    {/* Third input section */}
                    <div className="flex-1 min-w-[200px]">
                        <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={Profile.phone}
                            readOnly
                            className="w-full px-3 py-2 font-light border rounded-lg shadow-sm focus:outline-none focus:border-sky-700"
                        />
                    </div>

                    {/* Fourth input section */}
                    <div className="flex-1 min-w-[200px]">
                        <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={Profile.username}
                            readOnly
                            className="w-full px-3 py-2 font-light border rounded-lg shadow-sm focus:outline-none focus:border-sky-700"
                        />
                    </div>

                    {/* Fifth input section */}
                    <div className="flex-1 min-w-[200px]">
                        <label htmlFor="skill" className="block text-gray-700 font-semibold mb-2">
                            Skill
                        </label>
                        <input
                            type="text"
                            id="skill"
                            name="skill"
                            value={Profile.skill}
                            readOnly
                            className="w-full px-3 py-2 font-light border rounded-lg shadow-sm focus:outline-none focus:border-sky-700"
                        />
                    </div>
                    
                    {/* Event History Section */}
                    <div className="w-full">
                        <label htmlFor="events" className="block text-gray-700 font-semibold mb-2">
                            Event History
                        </label>
                        <div id="events" className="flex flex-col gap-4">
                            {Profile.events.map((event, index) => (
                                <div key={index} className="flex flex-col">
                                    <label className="text-gray-600 font-medium">Event {index + 1}</label>
                                    <input
                                        type="text"
                                        name={`event${index}`}
                                        value={event.event1}
                                        readOnly
                                        className="w-full px-3 py-2 font-light border rounded-lg shadow-sm focus:outline-none focus:border-sky-700"
                                    />
                                    <input
                                        type="text"
                                        name={`location${index}`}
                                        value={event.location}
                                        readOnly
                                        className="w-full px-3 py-2 mt-2 font-light border rounded-lg shadow-sm focus:outline-none focus:border-sky-700"
                                    />
                                    <input
                                        type="text"
                                        name={`date${index}`}
                                        value={event.date}
                                        readOnly
                                        className="w-full px-3 py-2 mt-2 font-light border rounded-lg shadow-sm focus:outline-none focus:border-sky-700"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default History;
