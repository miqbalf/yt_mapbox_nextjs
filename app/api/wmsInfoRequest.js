import axios from "axios"
import CONFIG from "../config"

const getFeatureInfo = async (bbox, widhtPix, heightPix,xPix,yPix) => {
    const REQUEST_PARAMS = {
        INFO_FORMAT: 'application/json',
        FORMAT: 'image/png',
        REQUEST: 'GetFeatureInfo',
        EXCEPTIONS: 'application/vnd.ogc.se_xml',
        SERVICE: 'WMS',
        VERSION: '1.1.1',
        LAYERS: CONFIG.LAYER_WMS_EXAMPLE,
        BBOX: `${bbox[0]}, ${bbox[1]}, ${bbox[2]}, ${bbox[3]}`,
        QUERY_LAYERS: CONFIG.LAYER_WMS_EXAMPLE,
        TRANSPARENT:true,
        LAYERS: CONFIG.LAYER_WMS_EXAMPLE,
        FEATURE_COUNT: 50,
        SRS: 'EPSG:4326',
        WIDTH:widhtPix,
        HEIGHT:heightPix,
        TILED: true,
        X:xPix,
        Y:yPix,
        
    }


    // Fetch WFS data from GeoServer
    const wmsInfoResponse = await axios.get(`${CONFIG.BASE_URL_BACKEND}/geoserver/ows`, {
        params: REQUEST_PARAMS,
    });
    console.log(wmsInfoResponse.data)
    return wmsInfoResponse.data

}

export { getFeatureInfo }