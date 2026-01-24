import axios from "axios";

const geocodeAddress = async (address) => {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`;

    const res = await axios.get(url, {
      headers: { "User-Agent": "blood-bank-app" },
    });

    const data = res.data;

    if (data.length > 0) {
      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    }
    return null;
  } catch (err) {
    console.error("Geocoding error:", err.message);
    return null;
  }
};
export default geocodeAddress;
