import React from 'react';
import CSV from '../utils/csv.min.js';
import FileSaver from 'file-saver';
import styled from 'styled-components';
import geojson from '../utils/neighborhoods.js';

const PageTitle = styled.h2`
  font-size: 38px;
`;

const Container = styled.div`
  text-align: center;
`;

const Instructions = styled.ol`
  font-size: 16px;
  text-align: left;

  code {
    font-size: 16px;
  }
`;

function translateToCensusFormat(csvText) {
  const originalCSV = new CSV(csvText, { header: true, cast: false });
  const originalJSON = originalCSV.parse();

  const mapped = originalJSON.map((data) => {
    const uniqueId = data['MLS Number'].trim();
    const street = data['Street Number'].trim() + ' ' + data['Street Name'].trim() + ' ' + data['Street Suffix'].trim();
    const city = data['City'].trim();
    const state = data['State'].trim();
    const zip = data['Zip5'].trim();

    return [uniqueId, street, city, state, zip];
  });

  const encoded = new CSV(mapped).encode();
  const blob = new Blob([encoded], { type: "text/csv"});

  FileSaver.saveAs(blob, "mls_geocode_intermediate_one.csv");

  return originalJSON;
}

function matchGeocodedResult(geocodeResult, originalJSON) {
  const geocodedCSV = new CSV(geocodeResult, { header: false, cast: false });
  const neighborhoods = readNeighborhoods();
  const mlsCache = {};

  geocodedCSV.forEach((data) => {
    if (data.length >= 2 && (data[2] !== 'No_Match' && data[2] !== 'Tie') && data[5] !== undefined && data[5].length > 0) {
      const mlsNumber = data[0];
      const latlng = data[5].split(',');

      const lat = latlng[1];
      const lng = latlng[0];
      const nei = identifyNeighborhood([lat, lng], neighborhoods);

      mlsCache[mlsNumber] = {
          lat,
          lng,
          nei,
      };
    }
  });

  merge(mlsCache, originalJSON);
}

function readNeighborhoods() {
  return geojson.features.map((feature) => ({
    name: feature.properties.slug,
    coordinates: feature.geometry.coordinates[0],
  }));
}

function identifyNeighborhood(latlong, neighborhoods) {
  let foundNeighborhood = '';

  neighborhoods.some((neighborhood) => {
    if (isLatlngInCoordinates(latlong, neighborhood.coordinates)) {
      foundNeighborhood = neighborhood.name;
      return true;
    }

    return false;
  });

  return foundNeighborhood;
}

function isLatlngInCoordinates(latlong, coordinates) {
  const polyPoints = coordinates;
  const x = latlong[0];
  const y = latlong[1];

  let inside = false;
  for (let i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
    var xi = polyPoints[i][1], yi = polyPoints[i][0];
    var xj = polyPoints[j][1], yj = polyPoints[j][0];

    var intersect = ((yi > y) != (yj > y))
    && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }

  return inside;
}

function merge(mlsCache, originalJSON) {
  const merged = originalJSON.map((data) => {
    const mlsNumber = data['MLS Number'];

    if (mlsCache[mlsNumber] !== undefined) {
      const { lat, lng, nei } = mlsCache[mlsNumber];
      return Object.assign({}, data, {
        latitude: lat,
        longitude: lng,
        neighborhood: nei,
      });
    } else {
      return Object.assign({}, data, {
        latitude: '',
        longitude: '',
        neighborhood: '',
      });
    }
  });

  const encoded = new CSV(merged, { header: true }).encode();
  const blob = new Blob([encoded], { type: "text/csv"});

  FileSaver.saveAs(blob, "mls_geocode_final.csv");
}

class IndexPage extends React.Component {
  render() {
    return (
      <Container>
        <PageTitle>MLS Geocoder</PageTitle>
        <Instructions>
          <li>Select the original MLS CSV File in the left file selector. A new file <code>mls_geocode_intermediate_one.csv</code> will be downloaded to your computer.</li>
          <li>Open Terminal: Open Spotlight (Command+Space) and type <code>Terminal</code> and press Enter.</li>
          <li>Assuming that file is saved to your mac in the <strong>Downloads</strong> folder, copy and paste the following text into the terminal:</li>
          <code>cd ~/Downloads && curl --form addressFile=@mls_geocode_intermediate_one.csv --form benchmark=9 https://geocoding.geo.census.gov/geocoder/locations/addressbatch --output mls_geocode_intermediate_two.csv</code>
          <li>That command will likely take more than a minute to run (scales with size of CSV) and will save an additional file to your Downloads folder: <code>mls_geocode_intermediate_two.csv</code></li>
          <li>Use the file selector on the right to select that file. That file will be merged with the MLS CSV uploaded earlier and the result will be downloaded as <code>mls_geocode_final.csv</code></li>
        </Instructions>
        <input type="file" onChange={(e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = (e) => {
            const originalJSON = translateToCensusFormat(e.target.result);

            this.setState({
              originalJSON,
            });
          };
          reader.readAsText(file);
        }}/>
        <input type="file" onChange={(e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = (e) => {
            matchGeocodedResult(e.target.result, this.state.originalJSON);
          };
          reader.readAsText(file);
        }}/>
      </Container>
    );
  }
}

export default IndexPage;
