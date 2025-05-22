import React, { ReactElement } from 'react';
import DashboardLayout from '../../components/layout/dashboard-layout';
import { Typography, Grid, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NextPageWithLayout } from '../_app';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Dashboard: NextPageWithLayout = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Item>
            <Typography variant="h6">Sales Overview</Typography>
            <Typography variant="body1">Sales chart will go here</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>
            <Typography variant="h6">Recent Activity</Typography>
            <Typography variant="body1">Activity list will go here</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <Typography variant="h6">Top Products</Typography>
            <Typography variant="body1">Product list will go here</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <Typography variant="h6">Customer Insights</Typography>
            <Typography variant="body1">Customer data will go here</Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout title="Dashboard Overview">{page}</DashboardLayout>;
};

export default Dashboard; 