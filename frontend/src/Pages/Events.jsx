import React, { useState } from 'react';

const Events = () => {
    // Sample event data
    const event = [
        {
            name: 'Dental Event 2024',
            image:'/dental.png',
            date: 'Sep 2024',
            location: 'Sample Address, City, State',
            description: 'Dental Care for the elderly',
        },
        {
            name: 'Nurse Event 2024',
            image: '/nurse.png',
            date: 'Oct 2024',
            location: 'Sample Address, City, State',
            description: 'Nursing services for senior citizens',
        },
        {
            name: 'Pharmacy Tech Event 2024',
            image: '/pharmacy.png',
            date: 'Nov 2024',
            location: 'Sample Address, City, State',
            description: 'Pharmacy technician assistance program',
        }
    ]; // event array

    const [searchTerm, setSearchTerm] = useState('');

    const filteredEvents = [];
    for (const eventItem of event) { 
      if (
        eventItem.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        eventItem.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        filteredEvents.push(eventItem);
      }
    }
    
    return (
        <div className="w-screen min-h-screen font-black bg-yellow-50 space-y-16 bg-cover bg-center">
            <div className="w-screen h-48 bg-teal-700 bg-cover bg-center flex items-center justify-center text-slate-50 -mt-10">
                <p className="text-5xl mr-4">Volunteers Events</p>
            </div>

            <div className="p-6">
                <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 font-medium rounded-lg"
                />

            </div>

            <div className="flex flex-col space-y-6 p-6 max-w-screen-xl mx-auto">
                {filteredEvents.map((eventItem, index) => ( // file item base on the searching
                    <div key={index} className="bg-white shadow-lg rounded-lg p-6 flex w-full max-w-2xl mx-auto">
                        <img
                            src={eventItem.image}
                            alt={eventItem.name}
                            className="w-48 h-48 object-cover rounded-md"
                        />
                        <div className="ml-6 flex flex-col justify-center"> 
                            <h3 className="text-2xl font-bold">{eventItem.name}</h3> {/* event details */}
                            <p className="text-gray-600">Date: {eventItem.date}</p>
                            <p className="text-gray-600 mt-2">{eventItem.description}</p>
                            <p className="text-gray-600 mt-2 font-light">Location: {eventItem.location}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;


