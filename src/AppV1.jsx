import React, { useState } from "react"
import { NFTCard } from "./comp/NFTCard"

import CssBaseline from "@mui/material/CssBaseline"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { Box, Paper, TextField, FormControl, RadioGroup, FormControlLabel, Radio, Grid, Stack } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import SearchIcon from "@mui/icons-material/Search"
import alchemylogo from "./alchemylogo.svg"

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
  const [loading, setLoading] = useState(false)
  const [NFTs, setNFTs] = useState([])
  const { REACT_APP_ALCHEMY_MAINNET_KEY } = process.env

  const handleClick = () => {
    setLoading(true)
  }

  var requestOptions = {
    method: "GET"
  }

  const fetchPersonalNFTs = async () => {
    let collectedNFTs
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${REACT_APP_ALCHEMY_MAINNET_KEY}/getNFTs/`

    if (!collection.length) {
      console.log("searching NFTs owned by the wallet address")
      const fetchURL = `${baseURL}?owner=${walletAddr}`
      collectedNFTs = await fetch(fetchURL, requestOptions).then((data) => data.json())
    } else {
      console.log("searching NFTs in the collection owned by the wallet address")
      const fetchURL = `${baseURL}?owner=${walletAddr}&contractAddresses%5B%5D=${collection}`
      collectedNFTs = await fetch(fetchURL, requestOptions).then((data) => data.json())
    }

    if (collectedNFTs) {
      // console.log(collectedNFTs)
      setNFTs(collectedNFTs.ownedNfts)
    }

    setLoading(false)
  }

  const fetchCollection = async () => {
    if (collection.length) {
      console.log("searching the collection")
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${REACT_APP_ALCHEMY_MAINNET_KEY}/getNFTsForCollection/`
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`
      const collectedNFTs = await fetch(fetchURL, requestOptions).then((data) => data.json())

      if (collectedNFTs) {
        // console.log(collectedNFTs)
        setNFTs(collectedNFTs.nfts)
      }

      setLoading(false)
    } else {
      alert("A collection address is needed.")
      setLoading(false)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Paper sx={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "auto", width: 455 }}>
        <a href="https://docs.alchemy.com/alchemy/road-to-web3/weekly-learning-challenges/4.-how-to-create-an-nft-gallery-alchemy-nft-api">
          <img id="logo" src={alchemylogo} alt=""></img>
        </a>

        <Stack direction="column" spacing={1} alignItems="center">
          <TextField
            disabled={isCollection}
            onChange={(e) => {
              setWalletAddr(e.target.value)
            }}
            sx={{ width: 420 }}
            id="walletAddr"
            label="paste a wallet address here"
          />
          <TextField
            onChange={(e) => {
              setCollection(e.target.value)
            }}
            sx={{ width: 420 }}
            id="collection"
            label="paste a collection address here"
          />

          <Stack direction="row" spacing={5} alignItems="center">
            <FormControl>
              {/* <FormLabel></FormLabel> */}
              <RadioGroup
                onChange={(e) => {
                  if (e.target.value === "collection") {
                    setIsCollection(true)
                  } else {
                    setIsCollection(false)
                  }
                }}
              >
                <FormControlLabel control={<Radio />} value="wallet" label="Search Wallet NFTs" />
                <FormControlLabel control={<Radio />} value="collection" label="Search Contract NFTs" />
              </RadioGroup>
            </FormControl>

            <LoadingButton
              loading={loading}
              loadingPosition="start"
              startIcon={<SearchIcon />}
              onClick={() => {
                handleClick()
                if (isCollection) {
                  fetchCollection()
                } else fetchPersonalNFTs()
              }}
              size="large"
              variant="contained"
            >
              SEARCH
            </LoadingButton>
          </Stack>
        </Stack>
      </Paper>

      <Box sx={{ p: 2 }}>
        <Grid spacing={2} container>
          {NFTs.map((NFT) => (
            <NFTCard nft={NFT} key={NFT.media[0].gateway} />
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  )
}

export default App
