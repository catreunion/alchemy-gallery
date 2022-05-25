import React from "react"
import { Box, Grid, Card, CardContent, Typography, CardMedia, Button } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

export const NFTCard = ({ nft }) => {
  const identifier = parseInt(nft.id.tokenId, 16)
  const openseaURL = `https://opensea.io/assets/ethereum/${nft.contract.address}/${identifier}`
  const etherscanURL = `https://etherscan.io/token/${nft.contract.address}?a=${identifier}`
  const description = nft.description?.substr(0, 150)

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <CardMedia sx={{ pt: "10%" }} component="img" image={nft.media[0].gateway} alt="random" />
        {/* <CardContent sx={{ flexGrow: 1 }}> */}
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& > *": {
              m: 1
            }
          }}
        >
          <Typography variant="h6">Title: {nft.title}</Typography>
          <Typography variant="h7">Token ID: {identifier}</Typography>
          <Typography variant="h5">{description}</Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              "& > *": {
                m: 1
              }
            }}
          >
            <Button href={openseaURL} startIcon={<SearchIcon />} variant="contained" target={"_blank"}>
              OpenSea
            </Button>

            <Button href={etherscanURL} startIcon={<SearchIcon />} variant="contained" target={"_blank"}>
              Etherscan
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}
