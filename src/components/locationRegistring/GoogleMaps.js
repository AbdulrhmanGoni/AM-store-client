import { LoadingCircle } from '@abdulrhmangoni/am-store-library'
// import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

export default function GoogleMaps() {

    // const { isLoaded } = useLoadScript({
    //     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    // })

    return <iframe
        title='Google Maps'
        src="https://maps.google.com/maps?q=Mecca+Saudi+Arabia&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
        width={"100%"}
        height={"100%"}
        allowFullScreen
    />
    // return isLoaded ?
    //     <GoogleMap
    //         zoom={10}
    //         center={{ lng: -80, lat: 44 }}
    //         mapContainerStyle={{
    //             width: "100%",
    //             height: "100%"
    //         }}
    //     >

    //     </GoogleMap>
    //     : <LoadingCircle
    //         style={{
    //             position: "relative",
    //             minHeight: undefined
    //         }}
    //     />
}