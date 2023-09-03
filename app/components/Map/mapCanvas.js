'use client'

import { Map } from 'react-map-gl'

import { Marker, Source, Layer } from 'react-map-gl'

import { geoJsonExample } from '../data/geojsonExample'
import { tilesExample } from '../data/tileExample'
import { WMSExample } from '../data/geoserver/wmsExample'

import requestWFS from '@/app/api/wfsRequest'

import CONFIG from '../../config'
import { useEffect, useState } from 'react'

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

const layerStylePolygon = {
    "id": "example_wfs",
    "type": "fill",
    "paint": {
      "fill-color": "#00ffff"
    }
}

const geoJSONConstructor = ''

const MapCanvas = () => {

    const [data, setData ] = useState(null)

    useEffect (async () =>  {
        const responseData = await requestWFS();
        setData(responseData)

    }, [] )

    if (!data) {
        return null
    }

    console.log(data)

    return (
        <Map
            mapboxAccessToken={CONFIG.API_MAPBOX}
            initialViewState={{
                longitude: -103,
                latitude: 44,
                zoom: 4
            }}
            style={{ width: '100vw', height: '100vh' }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        >
            <Marker key='marker_example' longitude={103} latitude={-1} color='red' >
            </Marker>


            <Source
             key= 'example_wms'
                type = 'raster'
                tiles={tilesExample}
                tileSize={256}

            >
            
                 <Layer 
                    {...layerStyleWMS}
                    layout={{visibility: 'visible'}}
                 >

                 </Layer>
            </Source>

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
             key= 'example_wms_geoserver'
                type = 'raster'
                tiles={WMSExample}
                tileSize={256}

            >
            
                 <Layer 
                    id = 'example_wms_geoserver'
                    type = 'raster'
                    paint = {{}}
                    layout={{visibility: 'visible'}}
                 >

                 </Layer>
            </Source>

            <Source  
                key = 'example_wfs_source'
                type = 'geojson'
                data = {data}
                >
                 <Layer {...layerStylePolygon}>

                 </Layer>
            </Source>
            

        </Map>

    )
}

export default MapCanvas

