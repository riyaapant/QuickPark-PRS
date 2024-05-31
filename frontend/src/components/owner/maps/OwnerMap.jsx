import { APIProvider, Map, Marker, useMap } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCred } from '../../../features/credSlice';

const OwnerMaps = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const isOwnerVerified = useSelector((state)=> state.ownerDocumentsVerified)

  const apikey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;
  // const map = useMap('fetchUserLocation');

  const [locationFetched, setLocationFetched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [message, setMessage] = useState(true);

  const fetchUserLocation = () => {
    console.log("Getting user location...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        setLocationFetched(true);
        setMessage(true);
        setErrorMessage('');
      },
      (error) => {
        setErrorMessage("Error getting location. Please try again.");
      }
    );
  };

  useEffect(() => {
    // if (location) {
    //   console.log(location);
    //   // navigate('owner/dashboard/addparking')
    // }
    console.log("owner verified: ", isOwnerVerified)
    console.log(location)
    // if(location != null){
    //   console.log(location)
    //   // setLocationFetched(true)
    //   navigate('dashboard/maps/viewparking')
    // }
  },[]);

  // const onMapClick = (e) => {
  //   const newLocation = {
  //     lat: e.detail.latLng.lat(),
  //     lng: e.detail.latLng.lng(),
  //   };
  //   setUserLocation(newLocation);
  //   // console.log(newLocation);
  // };

  const onMarkerDrag = (e) => {
    const newLocation = {
      lat: parseFloat(e.latLng.lat().toFixed(7)),
      lng: parseFloat(e.latLng.lng().toFixed(7))
    };
    setUserLocation(newLocation);
    console.log(newLocation);
  };

  const handleLocationConfirm = () => {
    dispatch(setCred({ userLocation: userLocation }))
    console.log('confirm')
    navigate('/owner/dashboard/addparking');
  }

  return (
    <main className='flex flex-col justify-center items-center h-screen'>
      {isOwnerVerified ? (
        <>
          {!locationFetched ? (
            <>
              <button
                className="w-48 rounded-md bg-indigo-600 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={fetchUserLocation}
              >
                Get your location
              </button>
              {errorMessage && (
                <p className='mt-4 text-red-600'>{errorMessage}</p>
              )}
            </>
          ) : (
            <>
              <APIProvider apiKey={apikey}>
                <Map
                  id='fetchUserLocation'
                  center={userLocation}
                  defaultZoom={15}
                  // onClick={onMapClick}
                >
                  <Marker
                    position={userLocation}
                    draggable={true}
                    onDragEnd={onMarkerDrag}
                  />
                </Map>
              </APIProvider>
              {message && (
                <>
                  <p className='text-lg'>Drag the marker to change your location. Click
                    <button className='text-qp underline px-1' onClick={handleLocationConfirm}>confirm</button> once you're done.</p>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <p>You need to be verified before you can list your parking land</p>
      )
      }
    </main>
  );
};

export default OwnerMaps;
