import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Container,
  Box,
  Chip,
} from "@mui/material";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3001/get");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      fetchBlogs(); // Refresh the list
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const getCategoryFromTitle = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("travel")) return "Travel";
    if (lowerTitle.includes("art")) return "Art";
    if (lowerTitle.includes("food")) return "Food";
    return "General";
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Typography variant="h6">Loading blogs...</Typography>
        </Box>
      ) : blogs.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Typography variant="h6">No blogs found. Add some blogs to get started!</Typography>
        </Box>
      ) : (
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={blog.img_url}
                alt={blog.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Box sx={{ mb: 1 }}>
                  <Chip
                    label={getCategoryFromTitle(blog.title)}
                    size="small"
                    sx={{
                      backgroundColor: "#9c27b0",
                      color: "white",
                      fontSize: "0.75rem",
                    }}
                  />
                </Box>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    lineHeight: 1.3,
                    mb: 1,
                  }}
                >
                  {blog.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {blog.content}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mt: "auto" }}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#9c27b0",
                      "&:hover": {
                        backgroundColor: "#7b1fa2",
                      },
                      textTransform: "uppercase",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                    }}
                    onClick={() => handleDelete(blog._id)}
                  >
                    DELETE
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#9c27b0",
                      "&:hover": {
                        backgroundColor: "#7b1fa2",
                      },
                      textTransform: "uppercase",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                    }}
                  >
                    UPDATE
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      )}
    </Container>
  );
};

export default Home;