import axios from "axios";
import CONFIG from "../config";

const REQUEST_PARAMS = {
    outputFormat: 'application/json',
    //maxFeatures: 250,
    request: 'GetFeature',
    service: 'WFS',
    typeName: CONFIG.LAYER_WFS_EXAMPLE,
    version: '1.1.0',
    //access_token: CONFIG.GEOSERVER_TOKEN,
  };

const requestWFS = async () => {
  
    // Fetch WFS data from GeoServer
    const wfsResponse = await axios.get(`${CONFIG.BASE_URL_BACKEND}/geoserver/ows`, {
      params: REQUEST_PARAMS,
    });
    //console.log(wfsResponse.data)
    return wfsResponse.data
    
};

export default requestWFS;