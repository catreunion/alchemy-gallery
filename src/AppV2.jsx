// catreunion : 0xA99B4eCA5929CF2999EBaf638357fc805795CBeA
// Mandycat's Wardrobe : 0xD2109D2E8b7EcBa9290Ef339D8cFB93b10e8ef07
// https://opensea.io/assets/ethereum/0xd2109d2e8b7ecba9290ef339d8cfb93b10e8ef07/9106

import React, { useState } from "react"
import { NFTCard } from "./comp/NFTCard"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Box, Container, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid, Paper } from "@mui/material"
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
  const [hasMetamask, setHasMetamask] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [myAddr, setMyAddr] = useState("")
  const [walletAddr, setWalletAddr] = useState("")
  const [collection, setCollection] = useState("")
  const [isInsideCollection, setIsInsideCollection] = useState(false)
  const [NFTs, setNFTs] = useState([])

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true)
    }
  }, [])

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const [account] = await window.ethereum.request({ method: "eth_requestAccounts" })
        setMyAddr(account)
        setIsConnected(true)
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log("Please install MetaMask")
    }
  }

  const fetchPersonalNFTs = async () => {
    let collectedNFTs
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_MAINNET_KEY}/getNFTs/`

    if (!collection.length) {
      var requestOptions = {
        method: "GET"
      }

      console.log("fetching NFTs owned by the wallet address")
      const fetchURL = `${baseURL}?owner=${walletAddr}`
      collectedNFTs = await fetch(fetchURL, requestOptions).then((data) => data.json())
    } else {
      console.log("fetching NFTs in the collection owned by the wallet address")
      const fetchURL = `${baseURL}?owner=${walletAddr}&contractAddresses%5B%5D=${collection}`
      collectedNFTs = await fetch(fetchURL, requestOptions).then((data) => data.json())
    }

    if (collectedNFTs) {
      console.log("NFTs:", collectedNFTs)
      setNFTs(collectedNFTs.ownedNfts)
      console.log(NFTs)
    }
  }

  const fetchCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: "GET"
      }

      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_MAINNET_KEY}/getNFTsForCollection/`
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`
      const collectedNFTs = await fetch(fetchURL, requestOptions).then((data) => data.json())

      if (collectedNFTs) {
        console.log("NFTs in the collection:", collectedNFTs)
        setNFTs(collectedNFTs.nfts)
      }
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
        {/* <Container maxWidth="lg" sx={{ my: 2 }}> */}
        {/* <Grid container spacing={1}> */}
        <img id="logo" src={alchemylogo} alt=""></img>
        <button id="walletButton" onClick={connectWallet}>
          {hasMetamask ? (isConnected ? "Connected " + String(myAddr).substring(0, 6) + "..." + String(myAddr).substring(38) : "Connect MetaMask") : "Please install MetaMask"}
        </button>

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
              disabled={isInsideCollection}
              label="paste your wallet address here"
              id="walletAddr"
              onChange={(e) => {
                setWalletAddr(e.target.value)
              }}
              sx={{ width: 420 }}
            />

            <FormControl>
              <FormLabel>Fetch for Collection</FormLabel>
              <RadioGroup
                onChange={(e) => {
                  if (e.target.value === "yes") {
                    setIsInsideCollection(true)
                  } else {
                    setIsInsideCollection(false)
                  }
                }}
              >
                <FormControlLabel control={<Radio />} value="yes" label="Yes" />
                <FormControlLabel control={<Radio />} value="no" label="No" />
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

            <Button
              onClick={() => {
                if (isInsideCollection) {
                  fetchCollection()
                } else fetchPersonalNFTs()
              }}
              variant="contained"
            >
              SEARCH
            </Button>
          </Box>
        </Paper>
        {/* </Grid> */}
        {/* </Container> */}
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
