'use client'

import { Map } from 'react-map-gl'

import { useRef } from 'react';

import { Marker, Source, Layer } from 'react-map-gl'

import { geoJsonExample } from '../data/geojsonExample'
import { tilesExample } from '../data/tileExample'
import { WMSExample } from '../data/geoserver/wmsExample'

import requestWFS from '@/app/api/wfsRequest'

import CONFIG from '../../config'
import { useEffect, useState } from 'react'

import { getFeatureInfo } from '@/app/api/wmsInfoRequest';

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
    paint: {}
}

const layerStylePolygon = {
    "id": "example_wfs",
    "type": "fill",
    "paint": {
        "fill-color": "#00ffff"
    }
}

const MapCanvas = () => {

    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData = await requestWFS();
                setData(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    /*
    if (!data) {
        return null
    }
    */

    //console.log(data)


    const initialViewport = {
        longitude: -103,
        latitude: 44,
        zoom: 4
    }

    const [viewport, setViewport] = useState(initialViewport)

    const mapRef = useRef();

    const [bbox, setBBOX] = useState(null)
    const [widhtPix, setWidthPix] = useState(null)
    const [heightPix, setHeightPix] = useState(null)
    const [xPix, setXpix] = useState(null)
    const [yPix, setYpix] = useState(null)
    const [lonMarker, setLonMarker] = useState(null)
    const [latMarker, setLatMarker] = useState(null)

    const handleMapLoadFeature = (e) => {


        const latitude = e.lngLat.lat;
        setLatMarker(latitude)
        const longitude = e.lngLat.lng;
        setLonMarker(longitude)
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

        const point = e.point;
        console.log(point)
        setXpix(point.x)
        setYpix(point.y)

        const mapInstance = mapRef.current.getMap();
        const bounds = mapInstance.getBounds();
        const canvas = mapInstance.getCanvas();
        setWidthPix(canvas.width / window.devicePixelRatio)
        setHeightPix(canvas.height / window.devicePixelRatio)

        //console.log('min_x: ',  bounds._sw.lng, 'min_y: ', bounds._sw.lat, 'max_x: ', bounds._ne.lng, 'max_y:', bounds._ne.lat  )
        setBBOX([bounds._sw.lng, bounds._sw.lat, bounds._ne.lng, bounds._ne.lat])
        console.log(canvas)

    }

    const handleMove = (e) => {
        setViewport(e.viewState)
    }

    console.log(bbox);

    if (bbox) {
        getFeatureInfo(bbox, widhtPix, heightPix, xPix, yPix)
    }

    const handleMapLoad = () => {
        if (mapRef.current) {
            const mapInstance = mapRef.current.getMap();
            const canvas = mapInstance.getCanvas();
            console.log(canvas.width / window.devicePixelRatio)
            console.log(canvas.height / window.devicePixelRatio)
            //here about the resolution scale
            console.log(window.devicePixelRatio)
        }
    }


    return (
        <Map
            mapboxAccessToken={CONFIG.API_MAPBOX}
            {...viewport}
            ref={mapRef}

            style={{ width: '100vw', height: '100vh' }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            onClick={handleMapLoadFeature}
            onMove={handleMove}
            onLoad={handleMapLoad}

            on
        >
            <Marker key='marker_example' longitude={103} latitude={-1} color='red' >
            </Marker>

            {lonMarker && (<Marker key='marker_wms_example' longitude={lonMarker} latitude={latMarker} color='red' >
            </Marker>)}



            <Source
                key='example_wms'
                type='raster'
                tiles={tilesExample}
                tileSize={256}

            >

                <Layer
                    {...layerStyleWMS}
                    layout={{ visibility: 'visible' }}
                >

                </Layer>
            </Source>

            <Source key='example_source'
                type='geojson'
                data={geoJsonExample}
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
                    layout={{ visibility: 'visible' }}
                >

                </Layer>
            </Source>

            <Source
                key='example_wms_geoserver'
                type='raster'
                tiles={WMSExample()}
                tileSize={256}

            >

                <Layer
                    id='example_wms_geoserver'
                    type='raster'
                    paint={{}}
                    layout={{ visibility: 'visible' }}
                >

                </Layer>
            </Source>



            {data && (
                <Source key='example_wfs_source' type='geojson' data={data}>
                    <Layer {...layerStylePolygon}
                        layout={{ visibility: 'none' }}
                    />
                </Source>
            )}


        </Map>

    )
}

export default MapCanvas

