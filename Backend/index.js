const express = require("express");
const cors = require("cors");
require("./connection");
const BlogModel = require("./model");

const app = express();
var PORT = 3001;
app.use(express.json());
app.use(cors());

// Add sample data endpoint for testing
app.post("/add-sample-data", async (req, res) => {
  try {
    const sampleBlogs = [
      {
        title: "Travel the world!!!!!",
        content: "Exploring beautiful destinations around the globe and discovering new cultures, foods, and experiences that make life worth living.",
        img_url: "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=500"
      },
      {
        title: "Art!!!!!!!!!!!",
        content: "Dive into the world of creativity and artistic expression. From paintings to sculptures, art has the power to move souls.",
        img_url: "https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=500"
      },
      {
        title: "Food is Art!!!!",
        content: "Culinary adventures and delicious recipes that bring people together. Food is not just sustenance, it's an art form.",
        img_url: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500"
      }
    ];

    await BlogModel.insertMany(sampleBlogs);
    res.status(201).json({ message: "Sample data added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding sample data" });
  }
});

app.post("/add", async (req, res) => {
  try {
    const { title, content, img_url } = req.body;
    const newBlog = new BlogModel({
      title,
      content,
      img_url,
    });
    await newBlog.save();
    res.status(201).json({ message: "Blog post added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding blog post" });
  }
});

app.get("/get", async (req, res) => {
  try {
    let data = await BlogModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await BlogModel.findByIdAndDelete(id);
    res.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting blog post" });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, img_url } = req.body;
    await BlogModel.findByIdAndUpdate(id, {
      title,
      content,
      img_url,
    });
    res.json({ message: "Blog post updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating blog post" });
  }
});

app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
