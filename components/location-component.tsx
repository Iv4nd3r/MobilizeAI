// LocationComponent.jsx

import React, { useEffect, useState } from 'react';

interface LocationComponentProp {
    onLocationChange: (lat: number, lon: number) => Promise<void>;
}

export default function LocationComponent({ onLocationChange }: LocationComponentProp) {
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
    const [manualLocation, setManualLocation] = useState('');

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                if (position && position.coords) {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                    onLocationChange(latitude, longitude);
                }
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    const handleManualLocationChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredLocation = event.target.value;
        setManualLocation(enteredLocation);

        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(enteredLocation)}&key=YOUR_API_KEY`);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const { lat, lng } = data.results[0].geometry.location;
                setLocation({ latitude: lat, longitude: lng });
                onLocationChange(lat, lng);
            }
        } catch (error) {
            console.error('Error occurred while geocoding:', error);
        }
    };

    useEffect(() => {
        getLocation();
    });

    return null;
}

/*<div>
<input
type="text"
placeholder="Not the right location ?"
value={manualLocation}
onChange={handleManualLocationChange}
/>
</div> */