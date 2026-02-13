require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");

const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongoUrl = process.env.ATLASDB_URL;
const GOOGLE_KEY = process.env.GOOGLE_MAPS_KEY;

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(mongoUrl);
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});

    const updatedData = await Promise.all(
      initData.data.map(async (obj) => {
        try {
          const geoResponse = await axios.get(
            "https://maps.googleapis.com/maps/api/geocode/json",
            {
              params: {
                address: `${obj.location}, ${obj.country}`,
                key: GOOGLE_KEY,
              },
            }
          );

          if (!geoResponse.data.results.length) {
            console.warn(
              `No geocoding result for ${obj.location}, ${obj.country}`
            );
            return {
              ...obj,
              owner: "66567b03fda820235197b582",
              geometry: null,
            };
          }

          const coords = geoResponse.data.results[0].geometry.location;

          return {
            ...obj,
            owner: "66567b03fda820235197b582",
            geometry: {
              type: "Point",
              coordinates: [coords.lng, coords.lat], // GeoJSON
            },
          };
        } catch (error) {
          console.error(
            `Geocoding failed for ${obj.location}, ${obj.country}:`,
            error.message
          );

          return {
            ...obj,
            owner: "66567b03fda820235197b582",
            geometry: null,
          };
        }
      })
    );

    await Listing.insertMany(updatedData);
    console.log("✅ DB is initialized with Google Geocoding");
  } catch (error) {
    console.error("❌ Error initializing DB:", error);
  }
};

initDB();
