const Booking = require('../models/Booking');
const TourOperation = require('../models/TourOperation');
const Package = require('../models/Package');
const Contact = require('../models/Contact');

// @desc    Get aggregated Admin Stats
// @route   GET /api/admin/stats
// @access  Private (Admin)
exports.getAdminStats = async (req, res, next) => {
  try {
    const [bookings, operations, packages, contacts] = await Promise.all([
      Booking.find().populate('package'),
      TourOperation.find().populate('package'),
      Package.find(),
      Contact.find()
    ]);

    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(b => b.status === 'Confirmed').length;
    const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
    const cancelledBookings = bookings.filter(b => b.status === 'Cancelled').length;

    const totalRevenue = bookings
      .filter(b => b.status === 'Confirmed')
      .reduce((sum, b) => {
        const price = b.package?.price || 0;
        const guests = b.numberOfGuests || 1;
        return sum + (price * guests);
      }, 0);

    const activeOperations = operations.filter(o => ['BOARDING_ACTIVE', 'EN_ROUTE', 'SITE_VISIT', 'RETURN_JOURNEY'].includes(o.status)).length;
    const scheduledOperations = operations.filter(o => o.status === 'SCHEDULED').length;
    const completedOperations = operations.filter(o => o.status === 'COMPLETED').length;

    const newInquiries = contacts.filter(c => c.status === 'New').length;

    res.status(200).json({
      success: true,
      data: {
        bookings: {
          total: totalBookings,
          confirmed: confirmedBookings,
          pending: pendingBookings,
          cancelled: cancelledBookings,
          revenue: totalRevenue
        },
        operations: {
          total: operations.length,
          active: activeOperations,
          scheduled: scheduledOperations,
          completed: completedOperations
        },
        packagesCount: packages.length,
        inquiries: {
          total: contacts.length,
          new: newInquiries
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Export data to CSV
// @route   GET /api/admin/export/:type
// @access  Private (Admin)
exports.exportCSV = async (req, res, next) => {
  try {
    const { type } = req.params;

    if (type === 'bookings') {
      const bookings = await Booking.find().populate('package').sort({ createdAt: -1 });
      let csv = 'Booking Reference,Guest Name,Email,Phone,Package,Travel Date,Guests,Pickup Point,Status,Payment Status,Created At\n';
      bookings.forEach(b => {
        csv += `"${b.bookingRef || b._id}","${b.fullName}","${b.email}","${b.phone}","${b.package?.title || 'Custom'}","${new Date(b.travelDate).toLocaleDateString()}","${b.numberOfGuests}","${b.pickupPoint || ''}","${b.status}","${b.paymentStatus || 'Pending'}","${new Date(b.createdAt).toISOString()}"\n`;
      });
      res.header('Content-Type', 'text/csv');
      res.attachment(`aruvi_bookings_${Date.now()}.csv`);
      return res.send(csv);
    }

    if (type === 'operations') {
      const ops = await TourOperation.find().populate('package').sort({ departureDate: -1 });
      let csv = 'Tour Code,Package,Destination,Departure Date,Return Date,Tour Manager,Phone,Driver,Vehicle,Status,Current Location,Seats Booked\n';
      ops.forEach(o => {
        csv += `"${o.operationCode}","${o.packageName}","${o.destination}","${new Date(o.departureDate).toLocaleDateString()}","${new Date(o.returnDate).toLocaleDateString()}","${o.tourManager?.name}","${o.tourManager?.phone}","${o.driverDetails?.driverName}","${o.driverDetails?.vehicleNumber} (${o.driverDetails?.vehicleType})","${o.status}","${o.currentLocation}","${o.bookedSeats}/${o.totalSeats}"\n`;
      });
      res.header('Content-Type', 'text/csv');
      res.attachment(`aruvi_operations_${Date.now()}.csv`);
      return res.send(csv);
    }

    if (type === 'contacts') {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      let csv = 'Name,Email,Phone,Subject,Message,Status,Date\n';
      contacts.forEach(c => {
        csv += `"${c.name}","${c.email}","${c.phone}","${c.subject}","${(c.message || '').replace(/"/g, '""')}","${c.status}","${new Date(c.createdAt).toLocaleDateString()}"\n`;
      });
      res.header('Content-Type', 'text/csv');
      res.attachment(`aruvi_contacts_${Date.now()}.csv`);
      return res.send(csv);
    }

    return res.status(400).json({ success: false, error: 'Invalid export type. Use bookings, operations, or contacts.' });
  } catch (err) {
    next(err);
  }
};
