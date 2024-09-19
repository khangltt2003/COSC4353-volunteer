import React from 'react';

// Event data
const Dental1 = {
    event1: 'Dental Event 2022',
    role: '',
    description: 'Dental Care for the elderly',
    location: 'Sample Address',
    date: 'Sep 2022',
    urgent: 'Medium',
    participate : '10:00am - 15:00pm',
};

const Dental2 = {
    event1: 'Dental Event 2023',
    role: '',
    description: 'Dental Care for the elderly',
    location: 'Sample Address',
    date: 'Sep 2023',
    urgent: 'Low',
    participate: '12:00pm - 16:00pm',
};

const Dental3 = {
    event1: 'Dental Event 2024',
    role: '',
    description: 'Dental Care for the elderly',
    location: 'Sample Address',
    date: 'Sep 2024',
    urgent: 'High',
    participate: '11:00am - 14:00pm',
};

const Profile = {
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phone: '123-456-7890',
    username: 'alicejohnson',
    skill: 'Dental',
    events: [Dental1, Dental2, Dental3], // Example event data array
};

const History = () => {
    return (
        <div className="w-screen min-h-screen font-black bg-cyan-100 space-y-16 bg-cover bg-center">
            <p className="p-15 -mt-10 text-zinc-100 bg-stone-900 bg-cover bg-center w-screen h-32 text-5xl text-center flex items-center justify-center">
                Volunteer History
            </p>
            <div className="px-6 py-6 mt-[-2rem]">
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
                        <div id="events" className="flex flex-col gap-10">
                            {Profile.events.map((event, index) => (
                                <div key={index} className="flex flex-col">
                                    <label className="text-gray-600 font-medium">{event.event1}</label>

                                    <label className="text-gray-600 font-medium mb-2 text-left ml-2">Description </label>
                                    <input
                                        type="text"
                                        name={`description${index}`}
                                        value={event.description}
                                        readOnly
                                        className="w-full px-3 py-2 mt-2 font-light border rounded-lg shadow-sm focus:outline-none focus:border-sky-700"
                                    />
                                    <label className="text-gray-600 font-medium mb-2 mt-3 text-left ml-2">Address </label>
                                     <input
                                        type="text"
                                        name={`location${index}`}
                                        value={event.location}
                                        readOnly
                                        className="w-full px-3 py-2 mt-2 font-light border rounded-lg shadow-sm focus:outline-none focus:border-sky-700"
                                    />
                                    <label className="text-gray-600 font-medium mb-2 mt-3 text-left ml-2">Urgent </label>
                                    <input
                                        type="text"
                                        name={`urgent${index}`}
                                        value={event.urgent}
                                        readOnly
                                        className="w-full px-3 py-2 mt-2 font-light border rounded-lg shadow-sm focus:outline-none focus:border-sky-700"
                                    />
                                    <label className="text-gray-600 font-medium mb-2 mt-3 text-left ml-2">Date </label>
                                    <input
                                        type="text"
                                        name={`date${index}`}
                                        value={event.date}
                                        readOnly
                                        className="w-full px-3 py-2 mt-2 font-light border rounded-lg shadow-sm focus:outline-none focus:border-sky-700"
                                    />
                                    <label className="text-gray-600 font-medium mb-2 mt-3 text-left ml-2">Participation </label>
                                    <input
                                        type="text"
                                        name={`participate${index}`}
                                        value={event.participate}
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
