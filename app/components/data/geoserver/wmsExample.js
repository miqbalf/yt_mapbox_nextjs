import CONFIG from "@/app/config";

const REQUEST_PARAMS = {
    SERVICE: 'WMS',
    VERSION: '1.3.0',
    REQUEST: 'GetMap',
    FORMAT: 'image/png',
    TRANSPARENT: true,
    STYLES: CONFIG.LAYER_WMS_EXAMPLE,
    LAYERS: CONFIG.LAYER_WMS_EXAMPLE,
    //FORMAT_OPTIONS: 'dpi:180',
    //exceptions: 'application/vnd.ogc.se_inimage',
    //SRS: 'EPSG:4326',
    SRS: 'EPSG:3857',
    CRS: 'EPSG:3857',
    WIDTH: 256,
    HEIGHT: 256,
    TILED: true,
  };

const params = new URLSearchParams(REQUEST_PARAMS).toString();

const WMSExample = [
    `${CONFIG.BASE_URL_BACKEND}/geoserver/ows?${params}&bbox={bbox-epsg-3857}`,
    ];

export {WMSExample}


