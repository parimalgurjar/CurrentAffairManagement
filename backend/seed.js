const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Affair = require("./models/affairModel");

dotenv.config();

const data = [
  {
    date: "2025-04-01",
    source: "The Hindu",
    pageNumber: "1",
    title: "Ancient Coins Found in Gujarat",
    subject: "History",
    topic: "Archaeological Discovery",
    description: "A cache of ancient coins from the Maurya period was discovered in Gujarat during excavation.",
  },
  {
    date: "2025-04-02",
    source: "Indian Express",
    pageNumber: "3",
    title: "Women's Reservation Bill Passed",
    subject: "Polity",
    topic: "Constitutional Amendment",
    description: "The bill reserves one-third of seats in Parliament and State Assemblies for women.",
  },
  {
    date: "2025-04-04",
    source: "Times of India",
    pageNumber: "4",
    title: "New Island Formed Near Andaman",
    subject: "Geography",
    topic: "Geological Changes",
    description: "Volcanic activity in the Andaman Sea has resulted in the formation of a new island.",
  },
  {
    date: "2025-04-05",
    source: "Business Standard",
    pageNumber: "5",
    title: "India's GDP Growth at 7.5%",
    subject: "Economy",
    topic: "Economic Survey",
    description: "India’s economy grew at 7.5% in FY2024–25, beating global forecasts.",
  },
  {
    date: "2025-04-06",
    source: "TechCrunch",
    pageNumber: "2",
    title: "ISRO Tests New Reusable Launch Vehicle",
    subject: "Science & Tech",
    topic: "Space Research",
    description: "ISRO has successfully tested India’s first reusable launch vehicle in a low orbit mission.",
  },
  {
    date: "2025-04-07",
    source: "Down To Earth",
    pageNumber: "6",
    title: "Air Quality in Delhi Improves Post-Rain",
    subject: "Environment",
    topic: "Air Pollution",
    description: "Delhi’s AQI dropped to under 100 after heavy rains helped clean pollutants from the air.",
  },
  {
    date: "2025-04-08",
    source: "PIB",
    pageNumber: "7",
    title: "India to Host G20 Summit in Hyderabad",
    subject: "Current Events",
    topic: "Global Diplomacy",
    description: "India will host the G20 Summit 2025 in Hyderabad, welcoming leaders from 20 major economies.",
  },
  {
    date: "2025-04-09",
    source: "BBC News",
    pageNumber: "8",
    title: "Iran Nuclear Deal Revived",
    subject: "International Affairs",
    topic: "Diplomatic Agreements",
    description: "World powers and Iran agreed to revive the 2015 nuclear deal after fresh negotiations in Geneva.",
  },
  {
    date: "2025-04-10",
    source: "ESPN",
    pageNumber: "9",
    title: "India Wins ICC Champions Trophy",
    subject: "Sports",
    topic: "Cricket",
    description: "India defeated Australia by 6 wickets in the final to win the ICC Champions Trophy 2025.",
  },
];

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    

    await Affair.deleteMany({});
    await Affair.insertMany(data);

    
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  });
