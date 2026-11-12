import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  bookingService,
  authService,
  operationService,
  packageService,
  contactService,
  adminService,
  subscribeRealtimeSSE,
} from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Tab State: 'dashboard' | 'operations' | 'registrations' | 'packages' | 'inquiries'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [adminUser, setAdminUser] = useState(null);

  // Core Data
  const [bookings, setBookings] = useState([]);
  const [operations, setOperations] = useState([]);
  const [packages, setPackages] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  // Loaders & Errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [realtimeConnected, setRealtimeConnected] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Filtering & Search
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [operationFilter, setOperationFilter] = useState('ALL');

  // Loading indicators for inline actions
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(null);

  // Modals state
  const [activeModal, setActiveModal] = useState(null); // 'createOperation' | 'milestone' | 'manifest' | 'createPackage'
  const [selectedOperation, setSelectedOperation] = useState(null);

  // Milestone Form
  const [milestoneForm, setMilestoneForm] = useState({
    location: '',
    note: '',
    status: '',
  });

  // New Operation Form
  const [newOperationForm, setNewOperationForm] = useState({
    tourCode: '',
    title: '',
    packageId: '',
    startDate: '',
    endDate: '',
    tourManager: { name: '', phone: '', email: '' },
    driver: { name: '', phone: '' },
    vehicle: { type: 'Volvo 9600 Multi-Axle', registrationNumber: '', totalCapacity: 32 },
    boardingPoints: 'Madiwala Silk Board (05:30 AM), Electronic City Toll (06:00 AM)',
    currentLocation: { name: 'Bangalore Depot', coordinates: '' },
  });

  // New Package Form
  const [newPackageForm, setNewPackageForm] = useState({
    title: '',
    slug: '',
    category: 'Domestic',
    price: '',
    duration: '',
    description: '',
    heroImage: '',
    featured: false,
  });

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  // Check auth and initial fetch
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem('adminUser'));
      setAdminUser(user);
    } catch (e) {
      // Ignore
    }

    fetchAllData();
  }, [navigate]);

  // Real-time SSE Connection
  useEffect(() => {
    const unsubscribe = subscribeRealtimeSSE(
      (event) => {
        if (event.type === 'HEARTBEAT') {
          setRealtimeConnected(true);
        } else if (event.type === 'EVENT_CONNECTED') {
          setRealtimeConnected(true);
        } else if (event.type === 'NEW_BOOKING') {
          const newBooking = event.payload;
          setBookings((prev) => [newBooking, ...prev.filter((b) => b._id !== newBooking._id)]);
          showToast(`New booking received: ${newBooking.fullName} (${newBooking.bookingRef || 'Tour'})`, 'success');
        } else if (event.type === 'BOOKING_STATUS_UPDATED') {
          const { bookingId, status } = event.payload;
          setBookings((prev) =>
            prev.map((b) => (b._id === bookingId ? { ...b, status } : b))
          );
        } else if (event.type === 'OPERATION_UPDATED') {
          const updatedOp = event.payload;
          setOperations((prev) =>
            prev.map((op) => (op._id === updatedOp._id ? updatedOp : op))
          );
          setSelectedOperation((prev) => (prev && prev._id === updatedOp._id ? updatedOp : prev));
          showToast(`Tour Op ${updatedOp.tourCode} updated to ${updatedOp.status}`, 'info');
        } else if (event.type === 'PASSENGER_BOARDING_UPDATED') {
          const { tourCode, passenger, manifestSummary } = event.payload;
          showToast(`Passenger ${passenger.fullName} checked in as ${passenger.checkInStatus} (${tourCode})`, 'success');
          // Refresh operations in background to get updated manifest
          fetchOperationsOnly();
        } else if (event.type === 'NEW_CONTACT_INQUIRY') {
          const newContact = event.payload;
          setInquiries((prev) => [newContact, ...prev]);
          showToast(`New inquiry from ${newContact.name}`, 'info');
        }
      },
      (err) => {
        setRealtimeConnected(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [showToast]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError('');
      const [bookingsRes, opsRes, pkgsRes, inqRes] = await Promise.allSettled([
        bookingService.getAll(),
        operationService.getAll(),
        packageService.getAll(),
        contactService.getAll(),
      ]);

      if (bookingsRes.status === 'fulfilled' && bookingsRes.value.success) {
        setBookings(bookingsRes.value.data);
      }
      if (opsRes.status === 'fulfilled' && opsRes.value.success) {
        setOperations(opsRes.value.data);
      }
      if (pkgsRes.status === 'fulfilled' && pkgsRes.value.success) {
        setPackages(pkgsRes.value.data);
      }
      if (inqRes.status === 'fulfilled' && inqRes.value.success) {
        setInquiries(inqRes.value.data);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        authService.logout();
        navigate('/admin/login');
      } else {
        setError('Error synchronizing with Aruvi Tours server.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchOperationsOnly = async () => {
    try {
      const res = await operationService.getAll();
      if (res.success) {
        setOperations(res.data);
        if (selectedOperation) {
          const fresh = res.data.find((o) => o._id === selectedOperation._id);
          if (fresh) setSelectedOperation(fresh);
        }
      }
    } catch (e) {
      // Quiet fail for background sync
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  // Booking Status Handler
  const handleBookingStatusChange = async (bookingId, newStatus) => {
    try {
      setStatusUpdateLoading(bookingId);
      const res = await bookingService.updateStatus(bookingId, newStatus);
      if (res.success) {
        setBookings((prev) =>
          prev.map((b) => (b._id === bookingId ? res.data : b))
        );
        showToast(`Booking marked as ${newStatus}`, 'success');
      }
    } catch (err) {
      alert('Error updating booking: ' + (err.response?.data?.error || err.message));
    } finally {
      setStatusUpdateLoading(null);
    }
  };

  // Inquiry Status Handler
  const handleInquiryStatusChange = async (inquiryId, newStatus) => {
    try {
      const res = await contactService.updateStatus(inquiryId, newStatus);
      if (res.success) {
        setInquiries((prev) =>
          prev.map((item) => (item._id === inquiryId ? res.data : item))
        );
        showToast(`Inquiry marked as ${newStatus}`, 'success');
      }
    } catch (err) {
      alert('Error updating inquiry: ' + (err.response?.data?.error || err.message));
    }
  };

  // Inquiry Delete Handler
  const handleInquiryDelete = async (inquiryId) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const res = await contactService.delete(inquiryId);
      if (res.success) {
        setInquiries((prev) => prev.filter((item) => item._id !== inquiryId));
        showToast('Inquiry removed', 'info');
      }
    } catch (err) {
      alert('Error deleting inquiry: ' + (err.response?.data?.error || err.message));
    }
  };

  // Operation Status Advancement Handler
  const handleOperationStatusChange = async (operationId, newStatus) => {
    try {
      const res = await operationService.update(operationId, { status: newStatus });
      if (res.success) {
        setOperations((prev) =>
          prev.map((op) => (op._id === operationId ? res.data : op))
        );
        if (selectedOperation?._id === operationId) {
          setSelectedOperation(res.data);
        }
        showToast(`Tour status updated to ${newStatus}`, 'success');
      }
    } catch (err) {
      alert('Error updating tour operation: ' + (err.response?.data?.error || err.message));
    }
  };

  // Submit Milestone
  const handlePostMilestone = async (e) => {
    e.preventDefault();
    if (!selectedOperation) return;
    try {
      const res = await operationService.addMilestone(selectedOperation._id, {
        location: milestoneForm.location,
        note: milestoneForm.note,
        status: milestoneForm.status || undefined,
      });
      if (res.success) {
        setSelectedOperation(res.data);
        setOperations((prev) =>
          prev.map((op) => (op._id === res.data._id ? res.data : op))
        );
        setActiveModal(null);
        setMilestoneForm({ location: '', note: '', status: '' });
        showToast('Live trip milestone published!', 'success');
      }
    } catch (err) {
      alert('Failed to post milestone: ' + (err.response?.data?.error || err.message));
    }
  };

  // Passenger Check-In Toggle
  const handleToggleCheckIn = async (passengerIndex, newStatus) => {
    if (!selectedOperation) return;
    try {
      const res = await operationService.updatePassengerStatus(
        selectedOperation._id,
        passengerIndex,
        newStatus,
        selectedOperation.currentLocation?.name || 'Boarding Point'
      );
      if (res.success) {
        setSelectedOperation(res.data);
        setOperations((prev) =>
          prev.map((op) => (op._id === res.data._id ? res.data : op))
        );
      }
    } catch (err) {
      alert('Failed to update passenger status: ' + (err.response?.data?.error || err.message));
    }
  };

  // Create Operation Handler
  const handleCreateOperation = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newOperationForm,
        boardingPoints: newOperationForm.boardingPoints
          .split(',')
          .map((p) => p.trim())
          .filter(Boolean),
        currentLocation: {
          name: newOperationForm.currentLocation.name,
          updatedAt: new Date(),
        },
      };

      const res = await operationService.create(payload);
      if (res.success) {
        setOperations((prev) => [res.data, ...prev]);
        setActiveModal(null);
        showToast(`Tour Operation ${res.data.tourCode} dispatched successfully!`, 'success');
        setNewOperationForm({
          tourCode: '',
          title: '',
          packageId: '',
          startDate: '',
          endDate: '',
          tourManager: { name: '', phone: '', email: '' },
          driver: { name: '', phone: '' },
          vehicle: { type: 'Volvo 9600 Multi-Axle', registrationNumber: '', totalCapacity: 32 },
          boardingPoints: 'Madiwala Silk Board (05:30 AM), Electronic City Toll (06:00 AM)',
          currentLocation: { name: 'Bangalore Depot', coordinates: '' },
        });
      }
    } catch (err) {
      alert('Error creating operation: ' + (err.response?.data?.error || err.message));
    }
  };

  // Create Package Handler
  const handleCreatePackage = async (e) => {
    e.preventDefault();
    try {
      const res = await packageService.create(newPackageForm);
      if (res.success) {
        setPackages((prev) => [res.data, ...prev]);
        setActiveModal(null);
        showToast(`Package "${res.data.title}" added to catalog!`, 'success');
        setNewPackageForm({
          title: '',
          slug: '',
          category: 'Domestic',
          price: '',
          duration: '',
          description: '',
          heroImage: '',
          featured: false,
        });
      }
    } catch (err) {
      alert('Error creating package: ' + (err.response?.data?.error || err.message));
    }
  };

  // Delete Package Handler
  const handleDeletePackage = async (packageId) => {
    if (!window.confirm('Are you sure you want to remove this package from the live catalog?')) return;
    try {
      const res = await packageService.delete(packageId);
      if (res.success) {
        setPackages((prev) => prev.filter((p) => p._id !== packageId));
        showToast('Package removed successfully', 'info');
      }
    } catch (err) {
      alert('Error deleting package: ' + (err.response?.data?.error || err.message));
    }
  };

  // KPIs & Stats
  const stats = useMemo(() => {
    const total = bookings.length;
    const pending = bookings.filter((b) => b.status === 'Pending').length;
    const confirmed = bookings.filter((b) => b.status === 'Confirmed').length;
    const cancelled = bookings.filter((b) => b.status === 'Cancelled').length;

    const revenue = bookings
      .filter((b) => b.status === 'Confirmed')
      .reduce((sum, b) => {
        const price = b.package?.price || 0;
        const guests = b.numberOfGuests || 1;
        return sum + price * guests;
      }, 0);

    const activeOps = operations.filter(
      (op) => op.status !== 'COMPLETED' && op.status !== 'CANCELLED'
    ).length;

    const newInquiries = inquiries.filter((inq) => inq.status === 'New').length;

    return { total, pending, confirmed, cancelled, revenue, activeOps, newInquiries };
  }, [bookings, operations, inquiries]);

  // Chart Computations
  const chartData = useMemo(() => {
    const categories = {
      Domestic: 0,
      International: 0,
      'HNI Luxury': 0,
      'Fixed Departure': 0,
    };

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyCounts = {};

    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const label = `${monthNames[d.getMonth()]} ${d.getFullYear().toString().substr(-2)}`;
      monthlyCounts[label] = { count: 0, revenue: 0 };
    }

    bookings.forEach((b) => {
      const cat = b.package?.category;
      if (cat && categories[cat] !== undefined) {
        categories[cat] += 1;
      }

      const bDate = new Date(b.createdAt || b.travelDate);
      const label = `${monthNames[bDate.getMonth()]} ${bDate.getFullYear().toString().substr(-2)}`;
      if (monthlyCounts[label] !== undefined) {
        monthlyCounts[label].count += 1;
        if (b.status === 'Confirmed') {
          const price = b.package?.price || 0;
          const guests = b.numberOfGuests || 1;
          monthlyCounts[label].revenue += price * guests;
        }
      }
    });

    const categoryData = Object.keys(categories).map((name) => ({
      name,
      value: categories[name],
    }));

    const trendData = Object.keys(monthlyCounts).map((month) => ({
      month,
      count: monthlyCounts[month].count,
      revenue: monthlyCounts[month].revenue,
    }));

    return { categoryData, trendData };
  }, [bookings]);

  // Filter Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchesStatus = filterStatus === 'All' || b.status === filterStatus;
      const pName = b.package?.title || '';
      const fName = b.fullName || '';
      const email = b.email || '';
      const bRef = b.bookingRef || '';
      const searchLower = searchTerm.toLowerCase();

      const matchesSearch =
        pName.toLowerCase().includes(searchLower) ||
        fName.toLowerCase().includes(searchLower) ||
        email.toLowerCase().includes(searchLower) ||
        bRef.toLowerCase().includes(searchLower);

      return matchesStatus && matchesSearch;
    });
  }, [bookings, filterStatus, searchTerm]);

  // Filter Operations
  const filteredOperations = useMemo(() => {
    if (operationFilter === 'ALL') return operations;
    return operations.filter((op) => op.status === operationFilter);
  }, [operations, operationFilter]);

  // Currency helper
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // SVG Chart Trend
  const trendChartSvg = useMemo(() => {
    const data = chartData.trendData;
    if (data.length === 0) return null;

    const width = 500;
    const height = 150;
    const padding = 30;
    const maxCount = Math.max(...data.map((d) => d.count), 4);

    const points = data.map((d, index) => {
      const x = padding + (index * (width - padding * 2)) / (data.length - 1);
      const y = height - padding - (d.count * (height - padding * 2)) / maxCount;
      return { x, y, label: d.month, count: d.count };
    });

    const pathD = points.reduce((path, p, i) => {
      return i === 0 ? `M ${p.x} ${p.y}` : `${path} L ${p.x} ${p.y}`;
    }, '');

    const areaD =
      points.length > 0
        ? `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`
        : '';

    return { points, pathD, areaD, width, height, padding };
  }, [chartData.trendData]);

  // SVG Donut
  const categoryDonutSvg = useMemo(() => {
    const data = chartData.categoryData;
    const totalCount = data.reduce((sum, d) => sum + d.value, 0);
    if (totalCount === 0) return null;

    let accumulatedAngle = 0;
    const radius = 60;
    const cx = 80;
    const cy = 80;
    const circumference = 2 * Math.PI * radius;

    const colors = {
      Domestic: '#3b82f6',
      International: '#10b981',
      'HNI Luxury': '#d4af37',
      'Fixed Departure': '#f59e0b',
    };

    const slices = data.map((d) => {
      const percentage = d.value / totalCount;
      const angle = percentage * 360;
      const strokeDashArray = `${percentage * circumference} ${circumference}`;
      const strokeDashOffset = -accumulatedAngle;
      accumulatedAngle += percentage * circumference;

      return {
        name: d.name,
        value: d.value,
        color: colors[d.name] || '#6b7280',
        strokeDashArray,
        strokeDashOffset,
        percentage: Math.round(percentage * 100),
      };
    });

    return { slices, radius, cx, cy, totalCount };
  }, [chartData.categoryData]);

  // Status color helper for operations
  const getOpStatusBadgeClass = (status) => {
    switch (status) {
      case 'SCHEDULED':
        return 'badge-scheduled';
      case 'BOARDING_ACTIVE':
        return 'badge-boarding';
      case 'EN_ROUTE':
        return 'badge-enroute';
      case 'SITE_VISIT':
        return 'badge-sitevisit';
      case 'RETURN_JOURNEY':
        return 'badge-return';
      case 'COMPLETED':
        return 'badge-completed';
      case 'DELAYED':
        return 'badge-delayed';
      default:
        return 'badge-default';
    }
  };

  return (
    <div className="admin-dashboard-container">
      {/* Toast Notification Container */}
      <div className="admin-toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`admin-toast-pill toast-${toast.type}`}>
            <span className="toast-dot"></span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Sidebar Navigation */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <span className="gold-text-accent">ARUVI TOURS LUXURY</span>
          <h2>Operations Hub</h2>
        </div>

        <div className="sidebar-profile">
          <div className="profile-avatar">
            {adminUser?.username?.substring(0, 2).toUpperCase() || 'AD'}
          </div>
          <div className="profile-info">
            <p className="profile-name">{adminUser?.name || 'Administrator'}</p>
            <p className="profile-role">@{adminUser?.username || 'admin'}</p>
          </div>
        </div>

        {/* Realtime Status Indicator */}
        <div className={`realtime-connection-card ${realtimeConnected ? 'connected' : 'disconnected'}`}>
          <span className="pulse-indicator"></span>
          <div className="realtime-text">
            <span className="rt-status">{realtimeConnected ? 'Live Sync Active' : 'Connecting Sync...'}</span>
            <span className="rt-channel">Port 5001 • SSE Push</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          >
            <svg viewBox="0 0 24 24" className="nav-icon"><path fill="currentColor" d="M13,3V9H21V3H13M13,21H21V11H13V21M3,21H11V15H3V21M3,13H11V3H3V13Z"/></svg>
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab('operations')}
            className={`nav-item ${activeTab === 'operations' ? 'active' : ''}`}
          >
            <svg viewBox="0 0 24 24" className="nav-icon"><path fill="currentColor" d="M18 11H6V6H18M17.5 13C16.67 13 16 13.67 16 14.5S16.67 16 17.5 16 19 15.33 19 14.5 18.33 13 17.5 13M6.5 13C5.67 13 5 13.67 5 14.5S5.67 16 6.5 16 8 15.33 8 14.5 7.33 13 6.5 13M12 2C6.5 2 2 6.5 2 12A10 10 0 0 0 12 22A10 10 0 0 0 22 12A10 10 0 0 0 12 2M4 16C4 16 4 17 5 17H5.5C5.8 17.6 6.3 18 7 18H8C8.7 18 9.2 17.6 9.5 17H14.5C14.8 17.6 15.3 18 16 18H17C17.7 18 18.2 17.6 18.5 17H19C20 17 20 16 20 16V9C20 5 17 4 12 4S4 5 4 9Z"/></svg>
            Tour Operations
            {stats.activeOps > 0 && <span className="nav-badge gold">{stats.activeOps}</span>}
          </button>

          <button
            onClick={() => setActiveTab('registrations')}
            className={`nav-item ${activeTab === 'registrations' ? 'active' : ''}`}
          >
            <svg viewBox="0 0 24 24" className="nav-icon"><path fill="currentColor" d="M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z"/></svg>
            Bookings
            {stats.pending > 0 && <span className="nav-badge red">{stats.pending}</span>}
          </button>

          <button
            onClick={() => setActiveTab('packages')}
            className={`nav-item ${activeTab === 'packages' ? 'active' : ''}`}
          >
            <svg viewBox="0 0 24 24" className="nav-icon"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M11,6V11H6V13H11V18H13V13H18V11H13V6H11Z"/></svg>
            Packages Catalog
            <span className="nav-badge muted">{packages.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`nav-item ${activeTab === 'inquiries' ? 'active' : ''}`}
          >
            <svg viewBox="0 0 24 24" className="nav-icon"><path fill="currentColor" d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4M20 8L12 13L4 8V6L12 11L20 6V8Z"/></svg>
            Inquiries & Leads
            {stats.newInquiries > 0 && <span className="nav-badge blue">{stats.newInquiries}</span>}
          </button>
        </nav>

        {/* Quick CSV Export Links */}
        <div className="sidebar-export-section">
          <span className="export-heading">Data Exports</span>
          <div className="export-buttons-stack">
            <a href={adminService.getExportUrl('bookings')} className="export-link" download>
              <svg viewBox="0 0 24 24" className="mini-icon"><path fill="currentColor" d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2M18 20H6V4H13V9H18V20M12 19L16 15H13V11H11V15H8L12 19Z"/></svg>
              Export Bookings (CSV)
            </a>
            <a href={adminService.getExportUrl('operations')} className="export-link" download>
              <svg viewBox="0 0 24 24" className="mini-icon"><path fill="currentColor" d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2M18 20H6V4H13V9H18V20M12 19L16 15H13V11H11V15H8L12 19Z"/></svg>
              Export Operations (CSV)
            </a>
          </div>
        </div>

        <button className="sidebar-logout-btn" onClick={handleLogout}>
          <svg viewBox="0 0 24 24" className="nav-icon"><path fill="currentColor" d="M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z"/></svg>
          Log Out
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main-content">
        <header className="dashboard-header">
          <div className="header-greeting">
            <h1>
              {activeTab === 'dashboard' && 'Operations Command Center'}
              {activeTab === 'operations' && 'Tour Operations & Fleet Management'}
              {activeTab === 'registrations' && 'Bookings & Traveler Registrations'}
              {activeTab === 'packages' && 'Luxury Packages & Catalog'}
              {activeTab === 'inquiries' && 'Inquiries & Guest Requests'}
            </h1>
            <p>Aruvi Tours Premium Travel Suite • Real-time synchronization online</p>
          </div>

          <div className="header-actions">
            <a href="/" className="refresh-btn live-site-btn" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" className="refresh-icon" style={{ fill: 'currentColor' }}><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/></svg>
              Visit Live Site
            </a>

            {activeTab === 'operations' && (
              <button className="primary-action-btn" onClick={() => setActiveModal('createOperation')}>
                + Dispatch Tour
              </button>
            )}

            {activeTab === 'packages' && (
              <button className="primary-action-btn" onClick={() => setActiveModal('createPackage')}>
                + Add Package
              </button>
            )}

            <button className="refresh-btn" onClick={fetchAllData} disabled={loading}>
              <svg viewBox="0 0 24 24" className={`refresh-icon ${loading ? 'spinning' : ''}`}><path fill="currentColor" d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"/></svg>
              Sync All
            </button>
          </div>
        </header>

        {/* Error Alert */}
        {error && (
          <div className="dashboard-error-banner">
            <span>{error}</span>
            <button onClick={() => setError('')}>&times;</button>
          </div>
        )}

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <>
            {/* KPI Cards Grid */}
            <section className="kpi-cards-grid">
              <div className="kpi-card" onClick={() => setActiveTab('registrations')}>
                <div className="kpi-card-header">
                  <span className="kpi-label">Total Bookings</span>
                  <div className="kpi-icon-wrapper total">
                    <svg viewBox="0 0 24 24" className="kpi-icon"><path fill="currentColor" d="M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z"/></svg>
                  </div>
                </div>
                <p className="kpi-value">{stats.total}</p>
                <span className="kpi-trend">All registered itineraries</span>
              </div>

              <div className="kpi-card" onClick={() => setActiveTab('operations')}>
                <div className="kpi-card-header">
                  <span className="kpi-label">Active Tour Ops</span>
                  <div className="kpi-icon-wrapper confirmed">
                    <svg viewBox="0 0 24 24" className="kpi-icon"><path fill="currentColor" d="M18 11H6V6H18M17.5 13C16.67 13 16 13.67 16 14.5S16.67 16 17.5 16 19 15.33 19 14.5 18.33 13 17.5 13M6.5 13C5.67 13 5 13.67 5 14.5S5.67 16 6.5 16 8 15.33 8 14.5 7.33 13 6.5 13M12 2C6.5 2 2 6.5 2 12A10 10 0 0 0 12 22A10 10 0 0 0 22 12A10 10 0 0 0 12 2M4 16C4 16 4 17 5 17H5.5C5.8 17.6 6.3 18 7 18H8C8.7 18 9.2 17.6 9.5 17H14.5C14.8 17.6 15.3 18 16 18H17C17.7 18 18.2 17.6 18.5 17H19C20 17 20 16 20 16V9C20 5 17 4 12 4S4 5 4 9Z"/></svg>
                  </div>
                </div>
                <p className="kpi-value positive">{stats.activeOps}</p>
                <span className="kpi-trend positive-text">On-road & boarding live</span>
              </div>

              <div className="kpi-card" onClick={() => setActiveTab('registrations')}>
                <div className="kpi-card-header">
                  <span className="kpi-label">Pending Action</span>
                  <div className="kpi-icon-wrapper pending">
                    <svg viewBox="0 0 24 24" className="kpi-icon"><path fill="currentColor" d="M11,9H13V11H11V9M11,13H13V17H11V13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20Z"/></svg>
                  </div>
                </div>
                <p className="kpi-value warning">{stats.pending}</p>
                <span className="kpi-trend warning-text">Needs confirmation</span>
              </div>

              <div className="kpi-card gold-border">
                <div className="kpi-card-header">
                  <span className="kpi-label">Projected Revenue</span>
                  <div className="kpi-icon-wrapper revenue">
                    <svg viewBox="0 0 24 24" className="kpi-icon"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M15,10H11V11H15V13H11V14H15V16H13V17H11V16H9V14H13V13H9V11H13V10H9V8H11V7H13V8H15V10Z"/></svg>
                  </div>
                </div>
                <p className="kpi-value gold-text">{formatCurrency(stats.revenue)}</p>
                <span className="kpi-trend gold-text-muted">Confirmed departures</span>
              </div>
            </section>

            {/* Charts & Analytics */}
            <section className="dashboard-charts-grid">
              <div className="chart-card glass-panel">
                <h3 className="chart-title">Monthly Booking Influx & Trends</h3>
                {trendChartSvg ? (
                  <div className="svg-chart-container">
                    <svg viewBox={`0 0 ${trendChartSvg.width} ${trendChartSvg.height}`} width="100%" height="100%">
                      <defs>
                        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#d4af37" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <line x1={trendChartSvg.padding} y1={trendChartSvg.padding} x2={trendChartSvg.width - trendChartSvg.padding} y2={trendChartSvg.padding} stroke="#1e293b" strokeDasharray="4 4" />
                      <line x1={trendChartSvg.padding} y1={trendChartSvg.height / 2} x2={trendChartSvg.width - trendChartSvg.padding} y2={trendChartSvg.height / 2} stroke="#1e293b" strokeDasharray="4 4" />
                      <line x1={trendChartSvg.padding} y1={trendChartSvg.height - trendChartSvg.padding} x2={trendChartSvg.width - trendChartSvg.padding} y2={trendChartSvg.height - trendChartSvg.padding} stroke="#334155" strokeWidth="1.5" />
                      <path d={trendChartSvg.areaD} fill="url(#areaGrad)" />
                      <path d={trendChartSvg.pathD} fill="none" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round" />
                      {trendChartSvg.points.map((p, i) => (
                        <g key={i}>
                          <circle cx={p.x} cy={p.y} r="5" fill="#0b0f19" stroke="#d4af37" strokeWidth="2" className="chart-node" />
                          <text x={p.x} y={p.y - 10} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="600">{p.count}</text>
                          <text x={p.x} y={p.y + 20} textAnchor="middle" fill="#64748b" fontSize="9">{p.label}</text>
                        </g>
                      ))}
                    </svg>
                  </div>
                ) : (
                  <div className="no-chart-data">No sufficient history to graph booking trends.</div>
                )}
              </div>

              <div className="chart-card glass-panel donut-card">
                <h3 className="chart-title">Portfolio Distribution</h3>
                {categoryDonutSvg ? (
                  <div className="donut-chart-wrapper">
                    <div className="donut-svg-holder">
                      <svg viewBox="0 0 160 160" className="donut-svg" width="100%" height="100%">
                        {categoryDonutSvg.slices.map((slice, i) => (
                          <circle
                            key={i}
                            cx={categoryDonutSvg.cx}
                            cy={categoryDonutSvg.cy}
                            r={categoryDonutSvg.radius}
                            fill="transparent"
                            stroke={slice.color}
                            strokeWidth="18"
                            strokeDasharray={slice.strokeDashArray}
                            strokeDashoffset={slice.strokeDashOffset}
                            transform="rotate(-90 80 80)"
                          />
                        ))}
                        <circle cx="80" cy="80" r="48" fill="#121826" />
                        <text x="80" y="78" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="500">TOTAL</text>
                        <text x="80" y="98" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="700">{categoryDonutSvg.totalCount}</text>
                      </svg>
                    </div>
                    <div className="donut-legend">
                      {categoryDonutSvg.slices.map((slice, i) => (
                        <div key={i} className="legend-item">
                          <span className="legend-dot" style={{ backgroundColor: slice.color }}></span>
                          <span className="legend-name">{slice.name}</span>
                          <span className="legend-percent">{slice.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="no-chart-data">No destination data recorded.</div>
                )}
              </div>
            </section>

            {/* Quick Live Operations Snapshot */}
            <section className="glass-panel quick-ops-snapshot">
              <div className="section-head-bar">
                <h3>Live Operations In Motion</h3>
                <button className="text-link-btn" onClick={() => setActiveTab('operations')}>
                  View All Operations &rarr;
                </button>
              </div>

              {operations.length === 0 ? (
                <p className="empty-hint">No tour operations dispatched yet.</p>
              ) : (
                <div className="ops-quick-grid">
                  {operations.slice(0, 3).map((op) => (
                    <div key={op._id} className="op-mini-card">
                      <div className="op-mini-head">
                        <span className="op-code">{op.tourCode}</span>
                        <span className={`op-badge ${getOpStatusBadgeClass(op.status)}`}>{op.status}</span>
                      </div>
                      <h4 className="op-mini-title">{op.title}</h4>
                      <div className="op-mini-detail">
                        <span>🚌 {op.vehicle?.type} ({op.vehicle?.registrationNumber})</span>
                        <span>📍 {op.currentLocation?.name || 'In Transit'}</span>
                      </div>
                      <div className="op-mini-progress">
                        <div className="progress-labels">
                          <span>Boarded: {op.passengers?.filter((p) => p.checkInStatus === 'BOARDED').length} / {op.passengers?.length || 0}</span>
                          <span>Cap: {op.vehicle?.totalCapacity}</span>
                        </div>
                        <div className="progress-bar-track">
                          <div
                            className="progress-bar-fill"
                            style={{
                              width: `${
                                op.passengers?.length > 0
                                  ? (op.passengers.filter((p) => p.checkInStatus === 'BOARDED').length /
                                      op.passengers.length) *
                                    100
                                  : 0
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <button
                        className="manifest-open-btn"
                        onClick={() => {
                          setSelectedOperation(op);
                          setActiveModal('manifest');
                        }}
                      >
                        Open Digital Manifest &rarr;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {/* TAB 2: TOUR OPERATIONS MANAGEMENT */}
        {activeTab === 'operations' && (
          <section className="operations-management-section">
            <div className="operations-filter-bar glass-panel">
              <div className="filter-chip-group">
                {['ALL', 'BOARDING_ACTIVE', 'EN_ROUTE', 'SITE_VISIT', 'RETURN_JOURNEY', 'SCHEDULED', 'COMPLETED'].map(
                  (st) => (
                    <button
                      key={st}
                      className={`filter-chip ${operationFilter === st ? 'active' : ''}`}
                      onClick={() => setOperationFilter(st)}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  )
                )}
              </div>
              <div className="ops-count-pill">
                Showing {filteredOperations.length} of {operations.length} Tours
              </div>
            </div>

            {filteredOperations.length === 0 ? (
              <div className="table-empty-state glass-panel">
                <p>No tour operations found under status "{operationFilter}".</p>
                <button className="primary-action-btn" onClick={() => setActiveModal('createOperation')}>
                  Dispatch New Tour
                </button>
              </div>
            ) : (
              <div className="ops-card-grid">
                {filteredOperations.map((op) => {
                  const boardedCount = op.passengers?.filter((p) => p.checkInStatus === 'BOARDED').length || 0;
                  const totalPassengers = op.passengers?.length || 0;
                  const capacity = op.vehicle?.totalCapacity || 32;

                  return (
                    <div key={op._id} className="operation-card glass-panel">
                      <div className="card-top-row">
                        <div>
                          <span className="tour-code-tag">{op.tourCode}</span>
                          <h3 className="tour-title">{op.title}</h3>
                        </div>
                        <div className="status-selector-wrapper">
                          <select
                            className={`status-select ${getOpStatusBadgeClass(op.status)}`}
                            value={op.status}
                            onChange={(e) => handleOperationStatusChange(op._id, e.target.value)}
                          >
                            <option value="SCHEDULED">SCHEDULED</option>
                            <option value="BOARDING_ACTIVE">BOARDING ACTIVE</option>
                            <option value="EN_ROUTE">EN ROUTE</option>
                            <option value="SITE_VISIT">SITE VISIT</option>
                            <option value="RETURN_JOURNEY">RETURN JOURNEY</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="DELAYED">DELAYED</option>
                          </select>
                        </div>
                      </div>

                      {/* Fleet & Crew Info */}
                      <div className="crew-vehicle-box">
                        <div className="crew-col">
                          <span className="box-label">Tour Manager</span>
                          <span className="box-val bold">{op.tourManager?.name || 'Assigned Agent'}</span>
                          <span className="box-sub">{op.tourManager?.phone || 'No phone'}</span>
                        </div>
                        <div className="crew-col">
                          <span className="box-label">Chauffeur & Fleet</span>
                          <span className="box-val bold">{op.vehicle?.type || 'Volvo Coach'}</span>
                          <span className="box-sub">
                            {op.vehicle?.registrationNumber} • {op.driver?.name} ({op.driver?.phone})
                          </span>
                        </div>
                      </div>

                      {/* Location & Milestones */}
                      <div className="current-location-box">
                        <div className="loc-header">
                          <span className="loc-label">Current Position</span>
                          <span className="loc-time">
                            Updated {new Date(op.currentLocation?.updatedAt || op.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="loc-name">
                          <span className="loc-pin">📍</span> {op.currentLocation?.name || 'In Transit'}
                        </div>
                        {op.milestones && op.milestones.length > 0 && (
                          <div className="latest-milestone-snippet">
                            <em>Last logged: "{op.milestones[op.milestones.length - 1].note}"</em>
                          </div>
                        )}
                      </div>

                      {/* Boarding Counter Bar */}
                      <div className="boarding-tracker-box">
                        <div className="tracker-header">
                          <span>Manifest Boarding</span>
                          <span className="boarded-counter">
                            <strong>{boardedCount}</strong> / {totalPassengers} Boarded ({capacity} Max)
                          </span>
                        </div>
                        <div className="tracker-bar">
                          <div
                            className="tracker-fill"
                            style={{
                              width: `${totalPassengers > 0 ? (boardedCount / totalPassengers) * 100 : 0}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="card-actions-bar">
                        <button
                          className="action-btn-manifest"
                          onClick={() => {
                            setSelectedOperation(op);
                            setActiveModal('manifest');
                          }}
                        >
                          📋 Digital Boarding Manifest
                        </button>
                        <button
                          className="action-btn-milestone"
                          onClick={() => {
                            setSelectedOperation(op);
                            setMilestoneForm({ location: op.currentLocation?.name || '', note: '', status: op.status });
                            setActiveModal('milestone');
                          }}
                        >
                          📍 Post Milestone
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* TAB 3: BOOKINGS & REGISTRATIONS */}
        {activeTab === 'registrations' && (
          <section className="bookings-section glass-panel">
            <div className="table-header-controls">
              <h3 className="table-heading-title">Guest Registrations & Bookings</h3>
              <div className="controls-group">
                <div className="table-search-wrapper">
                  <svg viewBox="0 0 24 24" className="search-icon"><path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/></svg>
                  <input
                    type="text"
                    placeholder="Search by ref, traveler name, or itinerary..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="status-filter-tabs">
                  {['All', 'Pending', 'Confirmed', 'Cancelled'].map((status) => (
                    <button
                      key={status}
                      className={`filter-tab-btn ${filterStatus === status ? 'active' : ''}`}
                      onClick={() => setFilterStatus(status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {loading ? (
              <div className="table-loading-spinner-container">
                <div className="table-spinner"></div>
                <p>Retrieving guest reservations...</p>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="table-empty-state">
                <p>No bookings match your current filter criteria.</p>
              </div>
            ) : (
              <div className="table-responsive-wrapper">
                <table className="bookings-data-table">
                  <thead>
                    <tr>
                      <th>Ref & Guest Details</th>
                      <th>Itinerary Package</th>
                      <th>Departure Date</th>
                      <th>Party Size</th>
                      <th>Price & Billing</th>
                      <th>Status</th>
                      <th className="actions-header">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((b) => {
                      const price = b.package?.price || 0;
                      const guests = b.numberOfGuests || 1;
                      const totalPrice = price * guests;

                      return (
                        <tr key={b._id}>
                          <td className="cell-customer">
                            <span className="booking-ref-badge">{b.bookingRef || 'AT-REF'}</span>
                            <p className="customer-name">{b.fullName}</p>
                            <p className="customer-contact">
                              <span className="contact-block">{b.email}</span>
                              <span className="contact-block">{b.phone}</span>
                            </p>
                            {b.pickupPoint && (
                              <div className="pickup-tag">
                                <strong>Pickup:</strong> {b.pickupPoint}
                              </div>
                            )}
                          </td>

                          <td className="cell-package">
                            <p className="pkg-title">{b.package?.title || 'Bespoke Package'}</p>
                            <span className="pkg-category-badge">{b.package?.category || 'Luxury'}</span>
                          </td>

                          <td className="cell-date">
                            {new Date(b.travelDate).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </td>

                          <td className="cell-guests">
                            {b.numberOfGuests} {b.numberOfGuests === 1 ? 'Guest' : 'Guests'}
                          </td>

                          <td className="cell-price">
                            <span className="total-cost">{formatCurrency(totalPrice)}</span>
                            <span className="cost-breakdown">({formatCurrency(price)} / guest)</span>
                          </td>

                          <td className="cell-status">
                            <span className={`status-badge ${b.status.toLowerCase()}`}>{b.status}</span>
                          </td>

                          <td className="cell-actions">
                            {statusUpdateLoading === b._id ? (
                              <div className="action-spinner"></div>
                            ) : (
                              <div className="action-buttons-group">
                                {b.status !== 'Confirmed' && (
                                  <button
                                    className="action-btn confirm"
                                    onClick={() => handleBookingStatusChange(b._id, 'Confirmed')}
                                    title="Confirm booking"
                                  >
                                    Confirm
                                  </button>
                                )}
                                {b.status !== 'Cancelled' && (
                                  <button
                                    className="action-btn cancel"
                                    onClick={() => handleBookingStatusChange(b._id, 'Cancelled')}
                                    title="Cancel booking"
                                  >
                                    Cancel
                                  </button>
                                )}
                                {b.status !== 'Pending' && (
                                  <button
                                    className="action-btn reset-pending"
                                    onClick={() => handleBookingStatusChange(b._id, 'Pending')}
                                    title="Hold booking"
                                  >
                                    Hold
                                  </button>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* TAB 4: LUXURY PACKAGES CATALOG */}
        {activeTab === 'packages' && (
          <section className="packages-management-section glass-panel">
            <div className="table-header-controls">
              <h3 className="table-heading-title">Live Itinerary Packages ({packages.length})</h3>
              <button className="primary-action-btn" onClick={() => setActiveModal('createPackage')}>
                + Create New Package
              </button>
            </div>

            <div className="packages-catalog-grid">
              {packages.map((pkg) => (
                <div key={pkg._id} className="pkg-manage-card">
                  <div className="pkg-card-img-wrap">
                    <img src={pkg.heroImage || '/packages/domestic-1.jpg'} alt={pkg.title} />
                    <span className="pkg-badge">{pkg.category}</span>
                  </div>
                  <div className="pkg-manage-content">
                    <h4>{pkg.title}</h4>
                    <p className="pkg-dur-price">
                      <span>⏱️ {pkg.duration}</span>
                      <strong className="font-gold">{formatCurrency(pkg.price)}</strong>
                    </p>
                    <p className="pkg-desc-snip">{pkg.description?.substring(0, 100)}...</p>
                    <div className="pkg-manage-actions">
                      <button className="pkg-del-btn" onClick={() => handleDeletePackage(pkg._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 5: INQUIRIES & LEADS */}
        {activeTab === 'inquiries' && (
          <section className="inquiries-management-section glass-panel">
            <div className="table-header-controls">
              <h3 className="table-heading-title">Customer Inquiries & Custom Requests ({inquiries.length})</h3>
              <a href={adminService.getExportUrl('contacts')} className="refresh-btn" download>
                Export CSV
              </a>
            </div>

            {inquiries.length === 0 ? (
              <div className="table-empty-state">
                <p>No customer inquiries recorded yet.</p>
              </div>
            ) : (
              <div className="table-responsive-wrapper">
                <table className="bookings-data-table">
                  <thead>
                    <tr>
                      <th>Guest Name & Subject</th>
                      <th>Contact Info</th>
                      <th>Inquiry Message</th>
                      <th>Received Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((inq) => (
                      <tr key={inq._id}>
                        <td>
                          <strong>{inq.name}</strong>
                          <div className="inquiry-subject">{inq.subject || 'Bespoke Tour Request'}</div>
                        </td>
                        <td>
                          <div>{inq.email}</div>
                          <div className="sub-phone">{inq.phone || 'N/A'}</div>
                        </td>
                        <td className="inq-msg-cell">
                          <p className="msg-preview">{inq.message}</p>
                        </td>
                        <td>
                          {new Date(inq.createdAt).toLocaleDateString('en-IN', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td>
                          <span className={`status-badge inq-${(inq.status || 'New').toLowerCase().replace(' ', '-')}`}>
                            {inq.status || 'New'}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons-group">
                            {inq.status !== 'Resolved' && (
                              <button
                                className="action-btn confirm"
                                onClick={() => handleInquiryStatusChange(inq._id, 'Resolved')}
                              >
                                Resolve
                              </button>
                            )}
                            {inq.status === 'New' && (
                              <button
                                className="action-btn reset-pending"
                                onClick={() => handleInquiryStatusChange(inq._id, 'In Progress')}
                              >
                                In Progress
                              </button>
                            )}
                            <button
                              className="action-btn cancel"
                              onClick={() => handleInquiryDelete(inq._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </main>

      {/* MODAL 1: DIGITAL BOARDING MANIFEST */}
      {activeModal === 'manifest' && selectedOperation && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-window wide-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="modal-eyebrow">DIGITAL MANIFEST • {selectedOperation.tourCode}</span>
                <h2>{selectedOperation.title}</h2>
              </div>
              <button className="modal-close-btn" onClick={() => setActiveModal(null)}>&times;</button>
            </div>

            <div className="manifest-modal-body">
              <div className="manifest-meta-strip">
                <div>
                  <strong>Vehicle:</strong> {selectedOperation.vehicle?.type} ({selectedOperation.vehicle?.registrationNumber})
                </div>
                <div>
                  <strong>Manager:</strong> {selectedOperation.tourManager?.name} ({selectedOperation.tourManager?.phone})
                </div>
                <div>
                  <strong>Current Status:</strong> <span className={`op-badge ${getOpStatusBadgeClass(selectedOperation.status)}`}>{selectedOperation.status}</span>
                </div>
              </div>

              <div className="manifest-passenger-table-wrapper">
                {selectedOperation.passengers?.length === 0 ? (
                  <p className="no-passengers-notice">No passengers registered on this tour manifest yet.</p>
                ) : (
                  <table className="manifest-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Passenger Name</th>
                        <th>Contact</th>
                        <th>Seat</th>
                        <th>Pickup Point</th>
                        <th>Boarding Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOperation.passengers.map((p, idx) => (
                        <tr key={idx} className={`p-row-${p.checkInStatus.toLowerCase()}`}>
                          <td>{idx + 1}</td>
                          <td><strong>{p.fullName}</strong></td>
                          <td>{p.phone || 'N/A'}</td>
                          <td><span className="seat-badge">{p.seatNumber || `S${idx + 1}`}</span></td>
                          <td>{p.pickupPoint || 'Depot'}</td>
                          <td>
                            <span className={`manifest-status-pill ${p.checkInStatus.toLowerCase()}`}>
                              {p.checkInStatus}
                            </span>
                          </td>
                          <td>
                            <div className="manifest-btn-group">
                              {p.checkInStatus !== 'BOARDED' && (
                                <button
                                  className="m-btn m-btn-board"
                                  onClick={() => handleToggleCheckIn(idx, 'BOARDED')}
                                >
                                  ✓ Boarded
                                </button>
                              )}
                              {p.checkInStatus !== 'NO_SHOW' && (
                                <button
                                  className="m-btn m-btn-noshow"
                                  onClick={() => handleToggleCheckIn(idx, 'NO_SHOW')}
                                >
                                  ✕ No Show
                                </button>
                              )}
                              {p.checkInStatus !== 'PENDING' && (
                                <button
                                  className="m-btn m-btn-pending"
                                  onClick={() => handleToggleCheckIn(idx, 'PENDING')}
                                >
                                  Hold
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button className="secondary-btn" onClick={() => setActiveModal(null)}>Close Manifest</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: POST TRIP MILESTONE */}
      {activeModal === 'milestone' && selectedOperation && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="modal-eyebrow">REAL-TIME GPS & STATUS UPDATE</span>
                <h2>Log Trip Milestone</h2>
              </div>
              <button className="modal-close-btn" onClick={() => setActiveModal(null)}>&times;</button>
            </div>

            <form onSubmit={handlePostMilestone} className="modal-form">
              <div className="form-group">
                <label>Current Location Landmark</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Krishnagiri Highway Oasis Plaza, Ooty Botanical Gates"
                  value={milestoneForm.location}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, location: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Operational Note / Activity</label>
                <textarea
                  rows="3"
                  required
                  placeholder="e.g. Breakfast stop completed. All 24 guests accounted for; proceeding towards Nilgiri Ghats."
                  value={milestoneForm.note}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, note: e.target.value })}
                ></textarea>
              </div>

              <div className="form-group">
                <label>Update Tour Operation Status</label>
                <select
                  value={milestoneForm.status}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, status: e.target.value })}
                >
                  <option value="">Keep current status ({selectedOperation.status})</option>
                  <option value="BOARDING_ACTIVE">BOARDING ACTIVE</option>
                  <option value="EN_ROUTE">EN ROUTE</option>
                  <option value="SITE_VISIT">SITE VISIT</option>
                  <option value="RETURN_JOURNEY">RETURN JOURNEY</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="DELAYED">DELAYED</option>
                </select>
              </div>

              <div className="modal-footer">
                <button type="button" className="secondary-btn" onClick={() => setActiveModal(null)}>Cancel</button>
                <button type="submit" className="primary-action-btn">Broadcast Milestone</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: DISPATCH NEW OPERATION */}
      {activeModal === 'createOperation' && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-window wide-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="modal-eyebrow">FLEET & LOGISTICS</span>
                <h2>Dispatch New Tour Operation</h2>
              </div>
              <button className="modal-close-btn" onClick={() => setActiveModal(null)}>&times;</button>
            </div>

            <form onSubmit={handleCreateOperation} className="modal-form">
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Tour Code (Unique)</label>
                  <input
                    type="text"
                    required
                    placeholder="AT-OP-104"
                    value={newOperationForm.tourCode}
                    onChange={(e) => setNewOperationForm({ ...newOperationForm, tourCode: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Tour Operation Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Wayanad Wilds Expedition"
                    value={newOperationForm.title}
                    onChange={(e) => setNewOperationForm({ ...newOperationForm, title: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    required
                    value={newOperationForm.startDate}
                    onChange={(e) => setNewOperationForm({ ...newOperationForm, startDate: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    required
                    value={newOperationForm.endDate}
                    onChange={(e) => setNewOperationForm({ ...newOperationForm, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Tour Manager Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Siddharth Rao"
                    value={newOperationForm.tourManager.name}
                    onChange={(e) =>
                      setNewOperationForm({
                        ...newOperationForm,
                        tourManager: { ...newOperationForm.tourManager, name: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Tour Manager Phone</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98450 11223"
                    value={newOperationForm.tourManager.phone}
                    onChange={(e) =>
                      setNewOperationForm({
                        ...newOperationForm,
                        tourManager: { ...newOperationForm.tourManager, phone: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Vehicle Fleet Model</label>
                  <input
                    type="text"
                    required
                    placeholder="Volvo 9600 Multi-Axle / Force Urbania"
                    value={newOperationForm.vehicle.type}
                    onChange={(e) =>
                      setNewOperationForm({
                        ...newOperationForm,
                        vehicle: { ...newOperationForm.vehicle, type: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Vehicle Registration #</label>
                  <input
                    type="text"
                    required
                    placeholder="KA-01-EQ-9988"
                    value={newOperationForm.vehicle.registrationNumber}
                    onChange={(e) =>
                      setNewOperationForm({
                        ...newOperationForm,
                        vehicle: { ...newOperationForm.vehicle, registrationNumber: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Chauffeur / Driver Name</label>
                  <input
                    type="text"
                    required
                    placeholder="M. Selvam"
                    value={newOperationForm.driver.name}
                    onChange={(e) =>
                      setNewOperationForm({
                        ...newOperationForm,
                        driver: { ...newOperationForm.driver, name: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Driver Phone</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 94432 88771"
                    value={newOperationForm.driver.phone}
                    onChange={(e) =>
                      setNewOperationForm({
                        ...newOperationForm,
                        driver: { ...newOperationForm.driver, phone: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Boarding Points (Comma separated)</label>
                <input
                  type="text"
                  placeholder="Madiwala Silk Board (05:30 AM), Electronic City Toll (06:00 AM)"
                  value={newOperationForm.boardingPoints}
                  onChange={(e) => setNewOperationForm({ ...newOperationForm, boardingPoints: e.target.value })}
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="secondary-btn" onClick={() => setActiveModal(null)}>Cancel</button>
                <button type="submit" className="primary-action-btn">Launch Tour Operation</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: CREATE PACKAGE */}
      {activeModal === 'createPackage' && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-window wide-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="modal-eyebrow">CATALOG INVENTORY</span>
                <h2>Create Luxury Package</h2>
              </div>
              <button className="modal-close-btn" onClick={() => setActiveModal(null)}>&times;</button>
            </div>

            <form onSubmit={handleCreatePackage} className="modal-form">
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Package Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Serene Coorg & Kabini Sanctuary"
                    value={newPackageForm.title}
                    onChange={(e) => setNewPackageForm({ ...newPackageForm, title: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>URL Slug (unique)</label>
                  <input
                    type="text"
                    required
                    placeholder="serene-coorg-kabini"
                    value={newPackageForm.slug}
                    onChange={(e) => setNewPackageForm({ ...newPackageForm, slug: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newPackageForm.category}
                    onChange={(e) => setNewPackageForm({ ...newPackageForm, category: e.target.value })}
                  >
                    <option value="Domestic">Domestic</option>
                    <option value="International">International</option>
                    <option value="HNI Luxury">HNI Luxury</option>
                    <option value="Fixed Departure">Fixed Departure</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Price (INR per person)</label>
                  <input
                    type="number"
                    required
                    placeholder="38000"
                    value={newPackageForm.price}
                    onChange={(e) => setNewPackageForm({ ...newPackageForm, price: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    required
                    placeholder="4 Nights / 5 Days"
                    value={newPackageForm.duration}
                    onChange={(e) => setNewPackageForm({ ...newPackageForm, duration: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Experience opulent plantation estates and tiger safaris..."
                  value={newPackageForm.description}
                  onChange={(e) => setNewPackageForm({ ...newPackageForm, description: e.target.value })}
                ></textarea>
              </div>

              <div className="modal-footer">
                <button type="button" className="secondary-btn" onClick={() => setActiveModal(null)}>Cancel</button>
                <button type="submit" className="primary-action-btn">Add to Catalog</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
