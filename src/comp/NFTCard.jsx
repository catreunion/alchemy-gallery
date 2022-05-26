import React from "react"
import { Grid, Card, CardMedia, CardContent, Typography, Stack, Button } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

export const NFTCard = ({ nft }) => {
  const identifier = parseInt(nft.id.tokenId, 16)
  const description = nft.description?.substr(0, 150)
  const openseaURL = `https://opensea.io/assets/ethereum/${nft.contract.address}/${identifier}`
  const etherscanURL = `https://etherscan.io/token/${nft.contract.address}?a=${identifier}`

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card sx={{ display: "flex", flexDirection: "column" }}>
        <CardMedia image={nft.media[0].gateway} sx={{ p: 1 }} component="img" alt="NFTs collected" />
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

          <Stack direction="row" spacing={2} alignItems="center">
            <Button href={openseaURL} startIcon={<SearchIcon />} target={"_blank"} variant="outlined">
              OpenSea
            </Button>
            <Button href={etherscanURL} startIcon={<SearchIcon />} target={"_blank"} variant="outlined" color="secondary">
              Etherscan
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  )
}

// console.log(nft.description?.substr(0, 150))
// console.log(nft.contract.address.substr(0, 4))
// console.log(nft.contract.address.substr(nft.contract.address.length - 4))
// console.log(nft.id.tokenId.substr(nft.id.tokenId.length - 4))
