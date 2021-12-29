
import { useState, useEffect } from 'react';
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { ConnectWallet } from "@3rdweb/react"; 
import { Box, Button, Grid, Heading } from 'grommet';


const sdk = new ThirdwebSDK("rinkeby");
const membershipBundleDropModule = sdk.getBundleDropModule(
  "0x61C0691FaF4d41775aa5288e593bF4e37Fcd759c",
);


function App() {

  const { connectWallet, address, error, provider } = useWeb3();
  const signer = provider ? provider.getSigner() : undefined;

  const [ isMember, setIsMember ] = useState(false);
  const [ isClaiming, setIsClaiming ] = useState(false);  // chaiming membership

  useEffect(() => {
    sdk.setProviderOrSigner(signer);
  }, [signer]);

  useEffect(() => {
    if (!address) {
      return;
    }
    
    // Check if the user has the membership NFT by using bundleDropModule.balanceOf
    return membershipBundleDropModule
      .balanceOf(address, "1")
      .then((balance) => {
        // If balance is greater than 0, they have our NFT!
        if (balance.gt(0)) {
          setIsMember(true);
        } else {
          setIsMember(false);
        }
      })
      .catch((error) => {
        setIsMember(false);
        console.error("failed to nft balance", error);
      });
  }, [address]);



  const claimMembership = () => {
    setIsClaiming(true);
    membershipBundleDropModule
      .claim("1", 1)
      .then(() => {
        setIsMember(true);
        console.log(
          `🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${membershipBundleDropModule.address}/1`
        );
      })
      .catch((err) => {
        console.error("failed to claim", err);
        setIsClaiming(false);
      })
      .finally(() => {
        setIsClaiming(false);        
      });
  }



  const Membership = () => {
    return isMember ?
      <Button 
        primary 
        label="Start now" 
      />
      :
      <Button 
        secondary 
        label={isClaiming ? "Claiming..." : "Be a member now"} 
        disabled={isClaiming}
        onClick={claimMembership} 
      />
  };

  return (
    <div className="App">
      <Grid 
        rows={[ 'full' ]}
        columns={[ '3/4', 'auto' ]}
        areas={[
          { name: 'hero', start: [0,0], end: [0,0] },
          { name: 'login', start: [1,0], end: [1,0] }
        ]}
        margin="xlarge"
      >
        <Box gridArea="hero" pad="large">
          <Heading level="1">MIMO</Heading>
          <Heading level="2">An experimental web3 Reddit/Twitter clone</Heading>
        </Box>
        <Box gridArea="login" align="center" pad="large" gap="medium" border={{ style: 'dotted' }}>
          <ConnectWallet />
          <Membership />
        </Box>
      </Grid>
    </div>
  );
}

export default App;
