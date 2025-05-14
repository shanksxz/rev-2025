"use client";

import getPosts from "@/actions/get-posts";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

export default function Home() {
  const { data, status } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (status === "pending")
    return (
      <Box
        component="section"
        sx={{
          display: "flex",
          height: "100dvh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>Loading....</Typography>
      </Box>
    );

  return (
    <Container>
      Posts
      <Grid container spacing={2}>
        {data &&
          data.map((post: any) => (
            <Grid key={post.id} sx={{ border: "1px solid red" }}>
              {/* <Card> */}
              {/* <CardContent> */}
              <Typography>{post.title}</Typography>
              {/* </CardContent> */}
              {/* </Card> */}
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
