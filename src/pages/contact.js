import { GoogleApiWrapper, Map, Marker } from "google-maps-react"
import React from "react"
import { Flex, Heading } from "rebass"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import mapStyles from "../utils/googlemap"

const MapContainer = styled.div`
  height: 60vh;
`
const style = {
  width: "95%",
  height: "60%",
}

const Contact = ({ google, location }) => {
  const pageTitle = `Наши координаты`

  return (
    <Layout location={location} title={pageTitle}>
      <SEO title={pageTitle} />
      <Heading color="primary" pb={3}>{pageTitle}</Heading>
      <Flex justifyContent="felx-start">
        <MapContainer>
          <Map
            styles={mapStyles}
            style={style}
            google={google}
            zoom={15}
            scrollwheel={false}
            streetViewControl={false}
            mapTypeControl={false}
            fullscreenControl={false}
            initialCenter={{
              lat: 55.715226,
              lng: 37.797472,
            }}
          >
            <Marker
              title={"Все Булочки Тут"}
              name={"Все Булочки Тут"}
              position={{ lat: 55.715226, lng: 37.797472 }}
            />
            <Marker />
          </Map>
        </MapContainer>
      </Flex>
    </Layout>
  )
}
export default GoogleApiWrapper({
  apiKey: process.env.GATSBY_GOOGLE_API,
})(Contact)
