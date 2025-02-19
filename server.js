const express = require("express");
const app = express();
const path = require("path");

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Ensure views folder exists

// Middleware to serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get('/hello', (req, res) => {
    res.send('Hello World');
});

// Dashboard Route
app.get("/dashboard", (req, res) => {
    res.render("dashboard", {"title": "Dashboard", "name": "John Doe"});
});

// Activities Route
app.get("/activities", (req, res) => {
    res.render("activities",
        {
            "title": "Activities",
            "activities": ["Swimming", "Running", "Cycling", "Hiking"]
        });
});



// Contact Route
app.get("/contact", (req, res) => {
    res.render("contact", {"title": "Contact"});
});

// Contact Route
app.post("/contact-message", async (req, res) => {
    const { message, name } = req.body;

    //Your email you want to receive notifications at 
    const email = "bdweix@gmail.com";
    
    const formattedMessage = `
        Name: ${name}
        Message: ${message}
    `;

    const response = await fetch("https://bc-email-server-main-hz0hq0.laravel.cloud/contact", {
        method: "POST",
        body: JSON.stringify({ email, message: formattedMessage, subject: "New Message from ${name}" }),
    });

    //redirect to dashboard 
    res.redirect("/dashboard");

});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));