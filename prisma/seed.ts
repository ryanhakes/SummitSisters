import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.event.createMany({
    data: [
      {
        title: "Healing Hike at Silver Falls",
        slug: "healing-hike-silver-falls",
        description: "A gentle, faith-filled hike for women healing from trauma. Includes reflection stops, prayer, and community.",
        dateStart: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 10, 9, 0),
        dateEnd: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 10, 13, 0),
        timezone: "America/Los_Angeles",
        locationName: "Silver Falls State Park",
        address: "20024 Silver Falls Hwy SE, Sublimity, OR",
        googleMapsLink: "https://maps.app.goo.gl/nEC8u9ixYgV2N5H98",
        capacity: 18,
        cost: 0,
        difficulty: "Easy",
        distance: "4 miles",
        elevationGain: "800 ft",
        packingList: "Water, snacks, layers, journal, comfortable shoes.",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        isPrivate: false,
        published: true
      },
      {
        title: "Summit Skills Adventure",
        slug: "summit-skills-adventure",
        description: "Learn navigation, trail safety, and outdoor confidence with devotional moments and sisterhood." ,
        dateStart: new Date(new Date().getFullYear(), new Date().getMonth() + 2, 4, 8, 30),
        dateEnd: new Date(new Date().getFullYear(), new Date().getMonth() + 2, 4, 15, 30),
        timezone: "America/Los_Angeles",
        locationName: "Mt. Hood National Forest",
        address: "Zigzag Ranger District, OR",
        googleMapsLink: "https://maps.app.goo.gl/Jj9QtgFQ7ffG9ZUn6",
        capacity: 12,
        cost: 25,
        difficulty: "Moderate",
        distance: "6 miles",
        elevationGain: "1200 ft",
        packingList: "Lunch, water, hiking boots, sun protection, notebook.",
        image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        isPrivate: true,
        accessCode: "SISTER2024",
        published: true
      }
    ]
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
