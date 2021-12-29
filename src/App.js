
import { Box, Button, Grid, Heading } from 'grommet';

function App() {
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
          <Heading level="2">The experimental web3 Reddit/Twitter clone</Heading>


        </Box>
        <Box gridArea="login" align="center" pad="large" border={{ style: 'dotted' }}>
          <Button primary size="medium" label="Connet your wallet" />
        </Box>
      </Grid>
    </div>
  );
}

export default App;
