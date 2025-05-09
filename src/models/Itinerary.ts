import mongoose, { Schema, models, model } from "mongoose";

const ItinerarySchema = new Schema(
  {
    tripName: { type: String, required: true },
    location: { type: String, required: true },
    weatherSummary: { type: String },
    days: { type: Map, of: Object, default: {} },
  },
  { timestamps: true }
);

const Itinerary = models.Itinerary || model("Itinerary", ItinerarySchema);
export default Itinerary;
