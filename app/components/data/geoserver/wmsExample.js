const REQUEST_PARAMS = {
    SERVICE: 'WMS',
    VERSION: '1.3.0',
    REQUEST: 'GetMap',
    FORMAT: 'image/png',
    TRANSPARENT: true,
    STYLES: 'geonode:us_states_dd12ca07117989e94d85bf9e226532fed01282f71927a',
    LAYERS: 'geonode:us_states_dd12ca07117989e94d85bf9e226532fed01282f71927a',
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
    `https://stable.demo.geonode.org/geoserver/ows?${params}&bbox={bbox-epsg-3857}`,
    ];

export {WMSExample}


