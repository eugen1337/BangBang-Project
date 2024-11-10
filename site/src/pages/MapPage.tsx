import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapMarker,
  reactify,
} from "../lib/ymaps";
import type { YMapLocationRequest } from "ymaps3";
import MapMarker from "../assets/MapMarker.svg";
import { HandySvg } from "handy-svg";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;

  padding: 50px;

  gap: 30px;

  background-color: #292a2e;

  @media (min-width: 685px) {
    padding: 204px;
  }
`;

const MapContainer = styled.div`
  height: 50vh;
  width: 80vw;
`;

const LOCATION: YMapLocationRequest = {
  center: [86.09257631866721, 55.35066417106341],
  zoom: 13,
};

const MapPage: FC = () => {
  return (
    <Container>
      <MapContainer>
        <YMap location={reactify.useDefault(LOCATION)}>
          <YMapDefaultSchemeLayer />
          <YMapDefaultFeaturesLayer />

          <YMapMarker
            coordinates={reactify.useDefault(LOCATION.center)}
            draggable={true}
          >
            <HandySvg
              src={MapMarker}
              className="icon"
              width="25"
              height="37"
            />
          </YMapMarker>
        </YMap>
      </MapContainer>
    </Container>
  );
};

export { MapPage };
