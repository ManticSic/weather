export interface IOpenStreetMapFormat {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string
  display_name: string;
  address: {
    common: string;
    pedestrian: string;
    city: string;
    county: string;
    state: string;
    postcode: string;
    country: string;
    country_code: string;
  };
  boundingbox: string[];
}
