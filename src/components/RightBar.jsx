import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

const RightBar = () => {
  return (
    <Box flex={1}
    gap={2}
    m={2}
      sx={{ display: { xs: "none", md: "flex" }, flexDirection:"column", alignItems: "center"}}>
        <Typography variant='h6' color="gray"> Community posts</Typography>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="./assets/chaos.jpg"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Supermarket chaos
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Just navigated the chaos at the supermarket for my weekly grocery haul. Dodging carts and snagging deals like a pro! 💪 #GroceryAdventures
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>

      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="../assets/avocado.jpg"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Avoca-dodged !
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Supermarket sprint: Grabbed the last ripe avocados amidst a sea of shoppers. Victory never tasted so green! 🥑🏃‍♂️ #GroceryWars
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>

      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="./assets/wars.jpg"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Survived.. 
          </Typography>
          <Typography variant="body2" color="text.secondary">
            
Survived the Saturday supermarket rush with a cart full of essentials and a heart full of triumph. Bring it on, grocery challenge! 🛒🙌 #SupermarketSurvivor
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>

    </Box>
  )
}

export default RightBar

