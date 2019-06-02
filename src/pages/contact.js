import { GoogleApiWrapper, Map, Marker } from "google-maps-react"
import React from "react"
import { Box, Heading } from "rebass"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import mapStyles from "../utils/googlemap"
import withSizes from "react-sizes"

const MapContainer = styled.div`
  height: 60vh;
  div {
    max-width: 95% !important;
  }
  div:nth-child(1) {
    @media all and (min-width: 769px) {
      margin: 0 auto !important;
    }
  }
`
const style = {
  width: "100%",
  height: "60%",
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 767,
})

const Contact = ({ google, location, isMobile }) => {
  const pageTitle = `Наши координаты`

  return (
    <Layout location={location} title={pageTitle}>
      <SEO title={pageTitle} />
      <Heading color="primary" pb={3}>
        {pageTitle}
      </Heading>
      <Box>
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
      </Box>
    </Layout>
  )
}
export default GoogleApiWrapper({
  apiKey: process.env.GATSBY_GOOGLE_API,
})(withSizes(mapSizesToProps)(Contact))
