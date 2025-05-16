"use client"

import { AppBar, Toolbar, Button, Typography, Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useCart } from '@/hooks/cart-context';

export default function AppHeader() {
  const { items } = useCart();
  return (
    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Ecomm
        </Typography>
        <Button color="inherit">Login</Button>
        <Button>
          <Badge badgeContent={items.length} color="primary">
            <ShoppingCart sx={{ color: "white" }} />
          </Badge>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
