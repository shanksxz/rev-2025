"use client"

import { AppBar, Toolbar, Button, Typography, Badge, Link, Box } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useCart } from '@/hooks/cart-context';

export default function AppHeader() {

  const { totalItems } = useCart();

  return (
    <AppBar position="static" sx={{ backgroundColor: "black", boxShadow: "none" }}>
      <Toolbar sx={{ minHeight: 64, px: { xs: 2, sm: 4 } }}>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          <Link
            href="/"
            underline="none"
            color="inherit"
            sx={{
              letterSpacing: 1,
              fontSize: { xs: "1.1rem", sm: "1.3rem" },
              fontWeight: 700,
              transition: "opacity 0.2s",
              "&:hover": { opacity: 0.7 }
            }}
          >
            Ecomm
          </Link>
        </Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Link href="/products/add" underline="none" color="inherit">
            <Button
              variant="text"
              color="inherit"
              sx={{
                textTransform: "none",
                fontWeight: 500,
                fontSize: "1rem",
                px: 2,
                "&:hover": { background: "rgba(255,255,255,0.04)" }
              }}
            >
              Add Product
            </Button>
          </Link>
          <Link href="/cart" underline="none" color="inherit">
            <Badge
              badgeContent={totalItems}
              color="primary"
              sx={{
                "& .MuiBadge-badge": {
                  right: -4,
                  top: 4,
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  minWidth: 18,
                  height: 18,
                }
              }}
            >
              <ShoppingCart sx={{ color: "white", fontSize: 28 }} />
            </Badge>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
