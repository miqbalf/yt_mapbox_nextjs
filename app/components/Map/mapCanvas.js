'use client'

import { Map } from 'react-map-gl'

import { Marker, Source, Layer } from 'react-map-gl'

const geoJsonExample = {
    type: 'FeatureCollection',
    id: 0,
    features: [
        {
            type: 'Feature', geometry: { type: 'Point', 
                                        coordinates: [102, -3]}
        }
    ]
};

const layerStylePoint = {
    id: 'example_layer',
    type: 'circle',
    paint: {
        'circle-radius': 20,
        'circle-color': 'yellow'
    }
}

const layerStyleWMS = {
    id: 'example_wms',
    type: 'raster',
    paint : {}
}

const MapCanvas = () => {
    return (
        <Map
            mapboxAccessToken="pk.eyJ1IjoibXVoZmlyZGF1c2lxYmFsIiwiYSI6ImNrZDVqMmVtczFmNG4ycm8zNjQ3bTZnanIifQ.rY8EemTRu60WjZrXH-oxdQ"
            initialViewState={{
                longitude: 102.4,
                latitude: -2,
                zoom: 6
            }}
            style={{ width: '100vw', height: '100vh' }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        >

            <Source key='example_source' 
                    type = 'geojson' 
                    data = {geoJsonExample}
                    >
                {/*
                <Layer
                    id = 'example_layer'
                    type = 'circle'
                    paint = {{
                        'circle-radius': 20,
                        'circle-color': 'blue'
                    }}
                >

                </Layer>
                 */}

                <Layer
                    {...layerStylePoint}
                    layout = {{visibility: 'visible'}}
                    >

                </Layer>


                
            </Source>

            <Source
             key= 'example_wms'
                type = 'raster'
                tiles={[' http://tile.openstreetmap.org/{z}/{x}/{y}.png']}
                tileSize={256}

            >
            
                 <Layer 
                    {...layerStyleWMS}
                    layout={{visibility: 'visible'}}
                 >

                 </Layer>
            </Source>

            <Marker key='marker_example' longitude={103} latitude={-1} color='red' >
            </Marker>
        </Map>

    )
}

export default MapCanvas

