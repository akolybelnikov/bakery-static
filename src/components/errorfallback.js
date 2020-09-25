import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { Link } from "gatsby"
import React from "react"

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

export default () => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Эта страница в данный момент недоступна в связи с техническим
          обслуживанием сайта. Мы приносим извинения за доставленные неудобства.
        </Typography>
        <Link to="/">
          <Button>В начало</Button>
        </Link>
      </CardContent>
    </Card>
  )
}


