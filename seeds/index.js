const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR USER ID
            author: '614607b332c6e080955118fd',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit numquam quasi reiciendis impedit quos obcaecati quis sapiente beatae dignissimos ex ipsam dolorum adipisci, esse officiis dolorem laborum eveniet ullam optio.',
            price,
            geometry: {
                type: "Point",
                coordinates: [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/rahul13/image/upload/v1632161697/YelpCamp/heehor9dniymt8v2vsko.jpg',
                    filename: 'YelpCamp/heehor9dniymt8v2vsko'
                },
                {
                    url: 'https://res.cloudinary.com/rahul13/image/upload/v1632161699/YelpCamp/eoxq8pnghlggrgram1bf.jpg',
                    filename: 'YelpCamp/eoxq8pnghlggrgram1bf'
                },
                {
                    url: 'https://res.cloudinary.com/rahul13/image/upload/v1632161699/YelpCamp/skbbhaoobwf6sscownqg.jpg',
                    filename: 'YelpCamp/skbbhaoobwf6sscownqg'
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})