import React, { useState } from "react"
import { NFTCard } from "./comp/NFTCard"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Box, Container, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid, Paper } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"

import SearchIcon from "@mui/icons-material/Search"

const theme = createTheme()

theme.typography.h3 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem"
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem"
  }
}

const App = () => {
  const [walletAddr, setWalletAddr] = useState("")
  const [collection, setCollection] = useState("")
  const [isCollection, setIsCollection] = useState(false)
  const [NFTs, setNFTs] = useState([])
  const { REACT_APP_ALCHEMY_MAINNET_KEY } = process.env

  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
  }

  const fetchPersonalNFTs = async () => {
    let collectedNFTs
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${REACT_APP_ALCHEMY_MAINNET_KEY}/getNFTs/`

    if (!collection.length) {
      var requestOptions = {
        method: "GET"
      }

      console.log("searching NFTs owned by the wallet address")
      const fetchURL = `${baseURL}?owner=${walletAddr}`
      collectedNFTs = await fetch(fetchURL, requestOptions).then((data) => data.json())
    } else {
      console.log("searching NFTs in the collection owned by the wallet address")
      const fetchURL = `${baseURL}?owner=${walletAddr}&contractAddresses%5B%5D=${collection}`
      collectedNFTs = await fetch(fetchURL, requestOptions).then((data) => data.json())
    }

    if (collectedNFTs) {
      console.log(collectedNFTs)
      setNFTs(collectedNFTs.ownedNfts)
    }

    setLoading(false)
  }

  const fetchCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: "GET"
      }

      console.log("searching the collection")
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${REACT_APP_ALCHEMY_MAINNET_KEY}/getNFTsForCollection/`
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`
      const collectedNFTs = await fetch(fetchURL, requestOptions).then((data) => data.json())
      // setLoading(false)

      if (collectedNFTs) {
        console.log(collectedNFTs)
        setNFTs(collectedNFTs.nfts)
      }

      setLoading(false)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[900]),
          overflow: "auto",
          flexGrow: 1
        }}
      >
        <Paper sx={{ width: 700, display: "flex", margin: "auto", p: 1 }}>
          <Box
            sx={{
              "& > :not(style)": { m: 1 }
            }}
            autoComplete="off"
            component="form"
            noValidate
          >
            <TextField
              disabled={isCollection}
              label="paste your wallet address here"
              id="walletAddr"
              onChange={(e) => {
                setWalletAddr(e.target.value)
              }}
              sx={{ width: 420 }}
            />

            <FormControl>
              <FormLabel></FormLabel>
              <RadioGroup
                onChange={(e) => {
                  if (e.target.value === "collection") {
                    setIsCollection(true)
                  } else {
                    setIsCollection(false)
                  }
                }}
              >
                <FormControlLabel control={<Radio />} value="wallet" label="search for wallet address" />
                <FormControlLabel control={<Radio />} value="collection" label="search collection" />
              </RadioGroup>
            </FormControl>

            <TextField
              label="paste the collection address here"
              id="collection"
              onChange={(e) => {
                setCollection(e.target.value)
              }}
              sx={{ width: 420 }}
            />

            <LoadingButton
              size="large"
              onClick={() => {
                handleClick()
                if (isCollection) {
                  fetchCollection()
                } else fetchPersonalNFTs()
              }}
              loading={loading}
              variant="contained"
              loadingPosition="start"
              startIcon={<SearchIcon />}
            >
              SEARCH
            </LoadingButton>
          </Box>
        </Paper>
      </Box>

      <Container sx={{ py: 1 }}>
        <Grid spacing={2} container>
          {NFTs.map((NFT) => (
            <NFTCard nft={NFT} key={NFT.media[0].gateway} />
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default App
