const fs = require('fs');
const path = require('path');
const Package = require('../models/Package');
const TourOperation = require('../models/TourOperation');

const seedPackagesAndOperations = async () => {
  try {
    // 1. Seed Packages if empty
    const packageCount = await Package.countDocuments();
    let packages = [];
    if (packageCount === 0) {
      const filePath = path.join(__dirname, '../../frontend/src/data/packagesData.js');
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const jsContent = fileContent
          .replace(/export default packagesData;?/, 'module.exports = packagesData;')
          .replace(/const packagesData = /, 'var packagesData = ');
        
        try {
          const tempModule = { exports: {} };
          const runFn = new Function('module', 'exports', jsContent);
          runFn(tempModule, tempModule.exports);
          const data = tempModule.exports;

          if (Array.isArray(data)) {
            const formatted = data.map(pkg => ({
              title: pkg.name,
              slug: pkg.slug,
              destination: pkg.name,
              duration: pkg.duration || '3 Days / 2 Nights',
              price: typeof pkg.startingPrice === 'string' 
                ? Number(pkg.startingPrice.replace(/[^0-9]/g, '')) 
                : (pkg.startingPrice || 6500),
              description: pkg.shortDescription || 'Exciting tour package by Aruvi Tours.',
              images: pkg.images || [pkg.image],
              category: pkg.category,
              featured: pkg.featured || false,
              inclusions: pkg.highlights || ['AC Transportation', 'Hotel Stay', 'Guided Sightseeing', 'Breakfast']
            }));
            packages = await Package.insertMany(formatted);
            console.log(`Seeded ${packages.length} packages into MongoDB!`);
          }
        } catch (e) {
          console.error('Failed to parse packagesData.js:', e.message);
        }
      }
    } else {
      packages = await Package.find();
    }

    // 2. Seed Tour Operations if empty
    const opCount = await TourOperation.countDocuments();
    if (opCount === 0 && packages.length > 0) {
      const sampleOps = [
        {
          operationCode: 'AT-OP-101',
          package: packages[0]._id,
          packageName: packages[0].title,
          destination: packages[0].destination || 'Ooty & Nilgiris',
          departureDate: new Date(),
          returnDate: new Date(Date.now() + 3 * 86400000),
          tourManager: { name: 'Muruganandam S', phone: '+91 94432 10987' },
          driverDetails: {
            driverName: 'Selvakumar R',
            driverPhone: '+91 98421 54321',
            vehicleType: 'Force Urbania Luxury (16 Seater)',
            vehicleNumber: 'TN-30-BC-8921'
          },
          status: 'EN_ROUTE',
          currentLocation: 'Mettupalayam Ghat Section - Hairpin Bend 7',
          totalSeats: 16,
          bookedSeats: 14,
          boardingPoints: [
            { city: 'Chennai', location: 'Koyambedu Omni Bus Stand', time: '05:30 AM' },
            { city: 'Salem', location: 'New Bus Stand Bypass', time: '10:15 AM' },
            { city: 'Coimbatore', location: 'Gandhipuram Central', time: '01:30 PM' }
          ],
          milestones: [
            { timestamp: new Date(Date.now() - 6 * 3600000), title: 'Vehicle Inspection Passed', location: 'Chennai Depot', notes: 'Tyres, AC, and GPS tracking verified' },
            { timestamp: new Date(Date.now() - 4 * 3600000), title: 'Chennai Boarding Completed', location: 'Koyambedu', notes: 'All 8 Chennai passengers on board' },
            { timestamp: new Date(Date.now() - 1 * 3600000), title: 'Salem Pickup Complete & Breakfast', location: 'Salem Bypass', notes: '6 passengers joined. On route to Ooty' }
          ],
          passengers: [
            { bookingRef: 'AT-2027-1041', fullName: 'Venkatesan Ramasamy', phone: '9840123456', guests: 2, pickupPoint: 'Koyambedu', boardingStatus: 'BOARDED', seatNumbers: 'S-1, S-2' },
            { bookingRef: 'AT-2027-1042', fullName: 'Anitha Sundar', phone: '9789012345', guests: 4, pickupPoint: 'Koyambedu', boardingStatus: 'BOARDED', seatNumbers: 'S-3, S-4, S-5, S-6' },
            { bookingRef: 'AT-2027-1043', fullName: 'Dinesh Karthik', phone: '9443355667', guests: 2, pickupPoint: 'Salem', boardingStatus: 'BOARDED', seatNumbers: 'S-7, S-8' },
            { bookingRef: 'AT-2027-1044', fullName: 'Priya Govindaraj', phone: '9080706050', guests: 4, pickupPoint: 'Salem', boardingStatus: 'BOARDED', seatNumbers: 'S-9, S-10, S-11, S-12' },
            { bookingRef: 'AT-2027-1045', fullName: 'Rajesh Kannan', phone: '9655443322', guests: 2, pickupPoint: 'Coimbatore', boardingStatus: 'PENDING', seatNumbers: 'S-13, S-14' }
          ]
        },
        {
          operationCode: 'AT-OP-102',
          package: packages[1] ? packages[1]._id : packages[0]._id,
          packageName: packages[1] ? packages[1].title : 'Kodaikanal Holiday',
          destination: 'Kodaikanal Lake & Pine Valley',
          departureDate: new Date(Date.now() + 1 * 86400000),
          returnDate: new Date(Date.now() + 4 * 86400000),
          tourManager: { name: 'Karthik Narayanan', phone: '+91 97880 98765' },
          driverDetails: {
            driverName: 'Manickam P',
            driverPhone: '+91 99440 11223',
            vehicleType: 'Volvo AC Coach (35 Seater)',
            vehicleNumber: 'TN-28-AA-3344'
          },
          status: 'BOARDING_ACTIVE',
          currentLocation: 'Salem New Bus Stand Bay 3',
          totalSeats: 35,
          bookedSeats: 28,
          boardingPoints: [
            { city: 'Salem', location: 'New Bus Stand Bay 3', time: '09:00 PM' },
            { city: 'Namakkal', location: 'Bus Stand Toll', time: '10:00 PM' }
          ],
          milestones: [
            { timestamp: new Date(Date.now() - 1 * 3600000), title: 'Coach Arrived at Boarding Bay', location: 'Salem Bay 3', notes: 'Luggage loading and verification open' }
          ],
          passengers: [
            { bookingRef: 'AT-2027-2011', fullName: 'Suresh Kumar', phone: '9444123456', guests: 3, pickupPoint: 'Salem', boardingStatus: 'BOARDED', seatNumbers: 'C-1, C-2, C-3' },
            { bookingRef: 'AT-2027-2012', fullName: 'Deepa Subramaniam', phone: '9841098765', guests: 2, pickupPoint: 'Salem', boardingStatus: 'PENDING', seatNumbers: 'C-4, C-5' }
          ]
        },
        {
          operationCode: 'AT-OP-103',
          package: packages[2] ? packages[2]._id : packages[0]._id,
          packageName: packages[2] ? packages[2].title : 'Kerala Backwaters & Munnar',
          destination: 'Munnar & Alleppey Houseboat',
          departureDate: new Date(Date.now() + 3 * 86400000),
          returnDate: new Date(Date.now() + 7 * 86400000),
          tourManager: { name: 'Arun Prakash', phone: '+91 96001 23456' },
          driverDetails: {
            driverName: 'Chandran K',
            driverPhone: '+91 95000 88776',
            vehicleType: 'Toyota Innova Crysta VIP',
            vehicleNumber: 'TN-30-ZZ-9999'
          },
          status: 'SCHEDULED',
          currentLocation: 'Aruvi Tours Headquarters - Fleet Yard',
          totalSeats: 7,
          bookedSeats: 6,
          boardingPoints: [
            { city: 'Coimbatore', location: 'Airport / Railway Station', time: '08:00 AM' }
          ],
          milestones: [],
          passengers: [
            { bookingRef: 'AT-2027-3001', fullName: 'Dr. Meenakshi Sundaram', phone: '9840011223', guests: 4, pickupPoint: 'Coimbatore Airport', boardingStatus: 'PENDING', seatNumbers: 'VIP-1, VIP-2, VIP-3, VIP-4' }
          ]
        }
      ];

      await TourOperation.insertMany(sampleOps);
      console.log('Successfully seeded 3 live Tour Operations into MongoDB!');
    }
  } catch (err) {
    console.error('Error during seeder execution:', err);
  }
};

module.exports = seedPackagesAndOperations;
