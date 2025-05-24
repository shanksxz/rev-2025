import { createTheme, styled, ThemeProvider, Theme } from '@mui/material/styles';
import {
    Box,
    Toolbar,
    CssBaseline,
    Typography,
    IconButton,
    Tooltip,
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Drawer,
    useMediaQuery,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {
    Home,
    Menu,
    ChevronLeft,
    Dashboard,
    ShoppingCart,
    Person,
    Logout,
} from '@mui/icons-material';
import { useState } from 'react';
import { useRouter } from 'next/router';
import useSession from '@/auth/use-session';
import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api-client';

const drawerWidth = 240;
interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const openedMixin = (theme: Theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const menuItems = [
    {
        title: 'Dashboard',
        icon: <Dashboard />,
        path: '/dashboard',
    },
    {
        title: 'Products',
        icon: <ShoppingCart />,
        path: '/dashboard/products',
    },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { session } = useSession();
    const isMobile = useMediaQuery('(max-width:600px)');

    const { mutate: logout, isPending: isLoggingOut } = useMutation({
        mutationFn: () => api.post("/auth/logout"),
        onSuccess: () => {
            router.push("/");
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={!isMobile && open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => {
                                setOpen((prev) => !prev);
                            }}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(!isMobile && open && { display: 'none' }),
                            }}
                        >
                            <Menu />
                        </IconButton>
                        <Tooltip title="Go back to home page">
                            <IconButton sx={{ mr: 1 }} onClick={() => router.push('/')}>
                                <Home />
                            </IconButton>
                        </Tooltip>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            Fruitopia
                        </Typography>
                    </Toolbar>
                </AppBar>
                {isMobile ? (
                    <Drawer
                        variant="temporary"
                        open={open}
                        onClose={() => setOpen(false)}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            position: 'absolute',
                            zIndex: 1000,
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: drawerWidth
                            },
                        }}
                    >
                        <DrawerHeader>
                            <IconButton onClick={() => setOpen(false)}>
                                <ChevronLeft />
                            </IconButton>
                        </DrawerHeader>
                        <Divider />
                        <List>
                            {menuItems.map((item) => (
                                <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: 'initial',
                                            px: 2.5,
                                        }}
                                        onClick={() => {
                                            router.push(item.path);
                                            setOpen(false);
                                        }}
                                        selected={router.pathname === item.path}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: 3,
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.title} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                        {session?.user && (
                            <Box sx={{ textAlign: 'center', mb: 2 }}>
                                <Tooltip title="Logout">
                                    <IconButton
                                        onClick={() => {
                                            logout();
                                            setOpen(false);
                                        }}
                                        disabled={isLoggingOut}
                                        sx={{ mt: 1 }}
                                    >
                                        <Logout />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        )}
                    </Drawer>
                ) : (
                    <Drawer variant="permanent" open={open}
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            whiteSpace: 'nowrap',
                            boxSizing: 'border-box',
                            ...(open && {
                                ...openedMixin(darkTheme),
                                '& .MuiDrawer-paper': openedMixin(darkTheme),
                            }),
                            ...(!open && {
                                ...closedMixin(darkTheme),
                                '& .MuiDrawer-paper': closedMixin(darkTheme),
                            }),
                        }}
                    >
                        <DrawerHeader>
                            <IconButton onClick={() => setOpen(false)}>
                                <ChevronLeft />
                            </IconButton>
                        </DrawerHeader>
                        <Divider />
                        <List>
                            {menuItems.map((item) => (
                                <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                        onClick={() => router.push(item.path)}
                                        selected={router.pathname === item.path}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.title}
                                            sx={{ opacity: open ? 1 : 0 }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                        {session?.user && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, alignItems: 'center', mb: 2 }}>
                                <Tooltip title="Logout">
                                    <IconButton
                                        onClick={() => logout()}
                                        disabled={isLoggingOut}
                                    >
                                        <Logout />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        )}
                    </Drawer>
                )}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
                        // ml: { xs: 0, sm: `${drawerWidth}px` },
                    }}
                >
                    <DrawerHeader />
                    {children}
                </Box>
            </Box>
        </ThemeProvider>
    );
}

