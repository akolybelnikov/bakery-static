import Typography from "@material-ui/core/Typography"
import React from "react"
import { Flex } from "rebass"
import CakeIcon from "@material-ui/icons/Cake"

export default ({ title, description, error }) => (
  <Flex
    style={{ margin: "0 auto" }}
    flexDirection="column"
    justifyItems="center"
    justifyContent="center"
    alignItems="center"
    minHeight={["50vh"]}
    width={[1, 2 / 3]}
  >
    <Typography
      component="h5"
      variant="h5"
      color={error ? "error" : "primary"}
      paragraph
    >
      {title}
    </Typography>
    <Typography color="primary" align="center" paragraph>
      {description}
    </Typography>
    {!error && (
      <Flex mt={[3]}>
        <CakeIcon color="primary" fontSize="large" />
      </Flex>
    )}
  </Flex>
)
