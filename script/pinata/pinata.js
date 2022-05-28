const axios = require("axios")

export const testAuthentication = () => {
  const url = `https://api.pinata.cloud/data/testAuthentication`
  return axios
    .get(url, {
      headers: {
        pinata_api_key: "8ef053fa1a883f8db0ea",
        pinata_secret_api_key: "7455764a5255ecf9d3e4e556485b98bc5d7c2d026aa5b844bbee1b5e4fbde7b1"
      }
    })
    .then(function (response) {
      //handle your response here
    })
    .catch(function (error) {
      //handle error here
    })
}
