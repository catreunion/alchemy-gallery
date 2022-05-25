import React from "react"
import { Stack, Grid, Card, CardContent, Typography, CardMedia, Button } from "@mui/material"
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
          <Typography variant="h5" gutterBottom>
            Title: {nft.title}
          </Typography>

          <Typography variant="h5" gutterBottom>
            Token ID: {identifier}
          </Typography>

          <Typography variant="h5" gutterBottom>
            {description}
          </Typography>

          <Stack spacing={2}>
            <Button variant="contained" startIcon={<SearchIcon />} href={openseaURL}>
              OpenSea
            </Button>

            <Button variant="contained" startIcon={<SearchIcon />} href={etherscanURL}>
              Etherscan
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  )
}
