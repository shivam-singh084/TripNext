const Listing = require("../models/listing");
const axios = require("axios");

const googleKey = process.env.GOOGLE_MAPS_KEY;

/* ================= INDEX ================= */
module.exports.index = async (req, res) => {
  const allListings = await Listing.find();
  res.render("listings/index.ejs", { allListings });
};

/* ================= NEW FORM ================= */
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

/* ================= SHOW ================= */
module.exports.showListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id)
    .populate("owner")
    .populate({
      path: "reviews",
      populate: { path: "author" },
    });

  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

/* ================= CREATE ================= */
module.exports.createListing = async (req, res) => {
  const { listing } = req.body;

  // 🔹 Google Geocoding
  const geoResponse = await axios.get(
    "https://maps.googleapis.com/maps/api/geocode/json",
    {
      params: {
        address: `${listing.location}, ${listing.country}`,
        key: googleKey,
      },
    }
  );

  let geometry = null;
  if (geoResponse.data.results.length) {
    const coords = geoResponse.data.results[0].geometry.location;
    geometry = {
      type: "Point",
      coordinates: [coords.lng, coords.lat],
    };
  }

  const newListing = new Listing(listing);
  newListing.owner = req.user._id;
  newListing.geometry = geometry;

  if (req.file) {
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  await newListing.save();
  req.flash("success", "New listing created!");
  res.redirect("/listings");
};

/* ================= EDIT FORM ================= */
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you are trying to edit does not exist!");
    return res.redirect("/listings");
  }

  let imageUrl = listing.image.url.replace("/upload", "/upload/w_250,h_160");
  res.render("listings/edit.ejs", { listing, imageUrl });
};

/* ================= UPDATE ================= */
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const { listing } = req.body;

  // 🔹 Google Geocoding
  const geoResponse = await axios.get(
    "https://maps.googleapis.com/maps/api/geocode/json",
    {
      params: {
        address: `${listing.location}, ${listing.country}`,
        key: googleKey,
      },
    }
  );

  if (geoResponse.data.results.length) {
    const coords = geoResponse.data.results[0].geometry.location;
    listing.geometry = {
      type: "Point",
      coordinates: [coords.lng, coords.lat],
    };
  }

  const updatedListing = await Listing.findByIdAndUpdate(id, listing, {
    new: true,
  });

  if (req.file) {
    updatedListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
    await updatedListing.save();
  }

  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${id}`);
};

/* ================= FILTER ================= */
module.exports.filter = async (req, res) => {
  const { id } = req.params;
  const allListings = await Listing.find({ category: { $all: [id] } });

  if (!allListings.length) {
    req.flash("error", `No listings found for ${id}!`);
    return res.redirect("/listings");
  }

  res.locals.success = `Listings filtered by ${id}!`;
  res.render("listings/index.ejs", { allListings });
};

/* ================= SEARCH ================= */
module.exports.search = async (req, res) => {
  let input = req.query.q;

  if (!input || !input.trim()) {
    req.flash("error", "Please enter search query!");
    return res.redirect("/listings");
  }

  input = input.trim().replace(/\s+/g, " ");

  let allListings = await Listing.find({
    title: { $regex: input, $options: "i" },
  });

  if (!allListings.length) {
    allListings = await Listing.find({
      category: { $regex: input, $options: "i" },
    });
  }

  if (!allListings.length) {
    allListings = await Listing.find({
      country: { $regex: input, $options: "i" },
    });
  }

  if (!allListings.length) {
    allListings = await Listing.find({
      location: { $regex: input, $options: "i" },
    });
  }

  if (!allListings.length && !isNaN(input)) {
    allListings = await Listing.find({ price: { $lte: Number(input) } });
  }

  if (!allListings.length) {
    req.flash("error", "No listings found!");
    return res.redirect("/listings");
  }

  res.locals.success = "Search results";
  res.render("listings/index.ejs", { allListings });
};

/* ================= DELETE ================= */
module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted!");
  res.redirect("/listings");
};

/* ================= RESERVE ================= */
module.exports.reserveListing = async (req, res) => {
  const { id } = req.params;
  req.flash("success", "Reservation details sent to your email!");
  res.redirect(`/listings/${id}`);
};
