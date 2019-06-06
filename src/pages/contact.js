import { GoogleApiWrapper, Map, Marker } from "google-maps-react"
import React from "react"
import { Heading } from "rebass"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import mapStyles from "../utils/googlemap"
import { rhythm } from "../utils/typography"

const MapContainer = styled.div`
  height: 70vh;
  div:nth-child(1) {
    max-width: 96% !important;
    @media all and (min-width: 600px) and (orientation: portrait) {
      margin: 0 auto !important;
    }
    @media all and (orientation: landscape) {
      margin: 0 auto !important;
    }
    @media all and (min-width: 1000px) {
      max-width: ${rhythm(33)} !important;
      margin: 0 auto !important;
    }
  }
`
const style = {
  maxWidth: rhythm(35),
  width: "96%",
  height: "70%",
}

const Contact = ({ google, location }) => {
  const pageTitle = `Наши координаты`

  return (
    <Layout location={location} title={pageTitle}>
      <SEO title={pageTitle} />
      <Heading color="primary" pb={3}>
        {pageTitle}
      </Heading>
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
    </Layout>
  )
}
export default GoogleApiWrapper({
  apiKey: process.env.GATSBY_GOOGLE_API,
})(Contact)
