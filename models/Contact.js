import mongoose from "mongoose"

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  primaryEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  secondaryEmails: {
    type: Array,
    default: [],
  },
  address: {
    street: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
  },
  primaryPhone: {
    type: String,
    required: true,
    trim: true,
  },
  secondaryPhones: {
    type: Array,
    default: [],
  },
  googleMapAddress: {
    embedUrl: {
      type: String,
      required: true,
      trim: true,
    },
    lattitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  website: {
    type: String,
    trim: true,
  },
  facebook: {
    type: String,
    trim: true,
  },
  twitter: {
    type: String,
    trim: true,
  },
  instagram: {
    type: String,
    trim: true,
  },
  linkedin: {
    type: String,
    trim: true,
  },
})

const Contact = mongoose.model("Contact", contactSchema)

export default Contact

