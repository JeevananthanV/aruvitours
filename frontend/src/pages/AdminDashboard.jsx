import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingService, authService } from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();


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

    fetchBookings();
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await bookingService.getAll();
      if (response.success) {
        setBookings(response.data);
      } else {
        setError('Failed to load bookings.');
      }
    } catch (err) {
      if (err.response?.status === 401) {
        authService.logout();
        navigate('/admin/login');
      } else {
        setError('Error connecting to server. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      setStatusUpdateLoading(bookingId);
      const response = await bookingService.updateStatus(bookingId, newStatus);
      if (response.success) {
        setBookings(prevBookings =>
          prevBookings.map(b => (b._id === bookingId ? response.data : b))
        );
      }
    } catch (err) {
      alert('Error updating booking status: ' + (err.response?.data?.error || err.message));
    } finally {
      setStatusUpdateLoading(null);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const total = bookings.length;
    const pending = bookings.filter(b => b.status === 'Pending').length;
    const confirmed = bookings.filter(b => b.status === 'Confirmed').length;
    const cancelled = bookings.filter(b => b.status === 'Cancelled').length;

    // Calculate revenue (Confirmed bookings only)
    const revenue = bookings
      .filter(b => b.status === 'Confirmed')
      .reduce((sum, b) => {
        const price = b.package?.price || 0;
        const guests = b.numberOfGuests || 1;
        return sum + (price * guests);
      }, 0);

    return { total, pending, confirmed, cancelled, revenue };
  }, [bookings]);

  // Chart data calculations
  const chartData = useMemo(() => {
    // 1. Bookings by Category (Donut Chart representation)
    const categories = {
      Domestic: 0,
      International: 0,
      'HNI Luxury': 0,
      'Fixed Departure': 0,
    };
    
    // 2. Bookings over recent months (Trend Line representation)
    // Initialize last 6 months
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyCounts = {};
    
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const label = `${monthNames[d.getMonth()]} ${d.getFullYear().toString().substr(-2)}`;
      monthlyCounts[label] = { count: 0, revenue: 0 };
    }

    bookings.forEach(b => {
      // Category count
      const cat = b.package?.category;
      if (cat && categories[cat] !== undefined) {
        categories[cat] += 1;
      }

      // Monthly breakdown
      const bDate = new Date(b.createdAt || b.travelDate);
      const label = `${monthNames[bDate.getMonth()]} ${bDate.getFullYear().toString().substr(-2)}`;
      if (monthlyCounts[label] !== undefined) {
        monthlyCounts[label].count += 1;
        if (b.status === 'Confirmed') {
          const price = b.package?.price || 0;
          const guests = b.numberOfGuests || 1;
          monthlyCounts[label].revenue += (price * guests);
        }
      }
    });

    const categoryData = Object.keys(categories).map(name => ({
      name,
      value: categories[name]
    }));

    const trendData = Object.keys(monthlyCounts).map(month => ({
      month,
      count: monthlyCounts[month].count,
      revenue: monthlyCounts[month].revenue
    }));

    return { categoryData, trendData };
  }, [bookings]);

  // Filter and Search Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const matchesStatus = filterStatus === 'All' || b.status === filterStatus;
      
      const pName = b.package?.title || '';
      const fName = b.fullName || '';
      const email = b.email || '';
      const searchLower = searchTerm.toLowerCase();
      
      const matchesSearch = 
        pName.toLowerCase().includes(searchLower) ||
        fName.toLowerCase().includes(searchLower) ||
        email.toLowerCase().includes(searchLower);

      return matchesStatus && matchesSearch;
    });
  }, [bookings, filterStatus, searchTerm]);

  // Format currency helper
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // SVGs Chart computations
  const trendChartSvg = useMemo(() => {
    const data = chartData.trendData;
    if (data.length === 0) return null;

    const width = 500;
    const height = 150;
    const padding = 30;

    const maxCount = Math.max(...data.map(d => d.count), 4);
    
    // Compute points
    const points = data.map((d, index) => {
      const x = padding + (index * (width - padding * 2)) / (data.length - 1);
      const y = height - padding - (d.count * (height - padding * 2)) / maxCount;
      return { x, y, label: d.month, count: d.count };
    });

    const pathD = points.reduce((path, p, i) => {
      return i === 0 ? `M ${p.x} ${p.y}` : `${path} L ${p.x} ${p.y}`;
    }, '');

    const areaD = points.length > 0 
      ? `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z` 
      : '';

    return { points, pathD, areaD, width, height, padding };
  }, [chartData.trendData]);

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
      'Domestic': '#3b82f6',
      'International': '#10b981',
      'HNI Luxury': '#d4af37',
      'Fixed Departure': '#f59e0b'
    };

    const slices = data.map(d => {
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
        percentage: Math.round(percentage * 100)
      };
    });

    return { slices, radius, cx, cy, totalCount };
  }, [chartData.categoryData]);

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <span className="gold-text-accent">ARUVI TOURS</span>
          <h2>Admin Console</h2>
        </div>
        
        <div className="sidebar-profile">
          <div className="profile-avatar">
            {adminUser?.username?.substring(0, 2).toUpperCase() || 'AD'}
          </div>
          <div className="profile-info">
            <p className="profile-name">System Administrator</p>
            <p className="profile-role">@{adminUser?.username || 'admin'}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
          >
            <svg viewBox="0 0 24 24" className="nav-icon"><path fill="currentColor" d="M13,3V9H21V3H13M13,21H21V11H13V21M3,21H11V15H3V21M3,13H11V3H3V13Z"/></svg>
            Dashboard Overview
          </button>
          <button 
            onClick={() => setActiveTab('registrations')} 
            className={`nav-item ${activeTab === 'registrations' ? 'active' : ''}`}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
          >
            <svg viewBox="0 0 24 24" className="nav-icon"><path fill="currentColor" d="M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z"/></svg>
            Registrations
          </button>
        </nav>


        <button className="sidebar-logout-btn" onClick={handleLogout}>
          <svg viewBox="0 0 24 24" className="nav-icon"><path fill="currentColor" d="M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z"/></svg>
          Log Out
        </button>
      </aside>


      {/* Main Dashboard Panel */}
      <main className="dashboard-main-content">
        <header className="dashboard-header">
          <div className="header-greeting">
            <h1>Welcome back, {adminUser?.username || 'Admin'}</h1>
            <p>Here is what's happening with Aruvi Tours today.</p>
          </div>
          <div className="header-actions" style={{ display: 'flex', gap: '10px' }}>
            <a href="/" className="refresh-btn live-site-btn" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <svg viewBox="0 0 24 24" className="refresh-icon" style={{ fill: 'currentColor' }}><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/></svg>
              Visit Live Site
            </a>
            <button className="refresh-btn" onClick={fetchBookings} disabled={loading}>
              <svg viewBox="0 0 24 24" className={`refresh-icon ${loading ? 'spinning' : ''}`}><path fill="currentColor" d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"/></svg>
              Sync Data
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

        {activeTab === 'dashboard' ? (<>
        {/* KPI Cards section */}
        <section className="kpi-cards-grid">
          <div className="kpi-card">
            <div className="kpi-card-header">
              <span className="kpi-label">Total Booking Requests</span>
              <div className="kpi-icon-wrapper total">
                <svg viewBox="0 0 24 24" className="kpi-icon"><path fill="currentColor" d="M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z"/></svg>
              </div>
            </div>
            <p className="kpi-value">{stats.total}</p>
            <span className="kpi-trend">All submitted forms</span>
          </div>

          <div className="kpi-card">
            <div className="kpi-card-header">
              <span className="kpi-label">Confirmed Bookings</span>
              <div className="kpi-icon-wrapper confirmed">
                <svg viewBox="0 0 24 24" className="kpi-icon"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/></svg>
              </div>
            </div>
            <p className="kpi-value positive">{stats.confirmed}</p>
            <span className="kpi-trend positive-text">Ready for travel</span>
          </div>

          <div className="kpi-card">
            <div className="kpi-card-header">
              <span className="kpi-label">Pending Review</span>
              <div className="kpi-icon-wrapper pending">
                <svg viewBox="0 0 24 24" className="kpi-icon"><path fill="currentColor" d="M11,9H13V11H11V9M11,13H13V17H11V13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20Z"/></svg>
              </div>
            </div>
            <p className="kpi-value warning">{stats.pending}</p>
            <span className="kpi-trend warning-text">Awaiting admin action</span>
          </div>

          <div className="kpi-card gold-border">
            <div className="kpi-card-header">
              <span className="kpi-label">Estimated Revenue</span>
              <div className="kpi-icon-wrapper revenue">
                <svg viewBox="0 0 24 24" className="kpi-icon"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M15,10H11V11H15V13H11V14H15V16H13V17H11V16H9V14H13V13H9V11H13V10H9V8H11V7H13V8H15V10Z"/></svg>
              </div>
            </div>
            <p className="kpi-value gold-text">{formatCurrency(stats.revenue)}</p>
            <span className="kpi-trend gold-text-muted">From confirmed tours</span>
          </div>
        </section>

        {/* Charts & Analytics Visuals */}
        <section className="dashboard-charts-grid">
          {/* Trend Area Chart */}
          <div className="chart-card glass-panel">
            <h3 className="chart-title">Monthly Booking Influx</h3>
            {trendChartSvg ? (
              <div className="svg-chart-container">
                <svg viewBox={`0 0 ${trendChartSvg.width} ${trendChartSvg.height}`} width="100%" height="100%">
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d4af37" stopOpacity="0.25"/>
                      <stop offset="100%" stopColor="#d4af37" stopOpacity="0.0"/>
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  <line x1={trendChartSvg.padding} y1={trendChartSvg.padding} x2={trendChartSvg.width - trendChartSvg.padding} y2={trendChartSvg.padding} stroke="#1e293b" strokeDasharray="4 4" />
                  <line x1={trendChartSvg.padding} y1={(trendChartSvg.height) / 2} x2={trendChartSvg.width - trendChartSvg.padding} y2={(trendChartSvg.height) / 2} stroke="#1e293b" strokeDasharray="4 4" />
                  <line x1={trendChartSvg.padding} y1={trendChartSvg.height - trendChartSvg.padding} x2={trendChartSvg.width - trendChartSvg.padding} y2={trendChartSvg.height - trendChartSvg.padding} stroke="#334155" strokeWidth="1.5" />
                  
                  {/* Filled Area */}
                  <path d={trendChartSvg.areaD} fill="url(#areaGrad)" />
                  
                  {/* Stroke Line */}
                  <path d={trendChartSvg.pathD} fill="none" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round" />
                  
                  {/* Interactive Nodes & Labels */}
                  {trendChartSvg.points.map((p, i) => (
                    <g key={i}>
                      <circle cx={p.x} cy={p.y} r="5" fill="#0b0f19" stroke="#d4af37" strokeWidth="2" className="chart-node" />
                      {/* Tooltip value */}
                      <text x={p.x} y={p.y - 10} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="600" className="chart-node-value">{p.count}</text>
                      {/* X Axis Label */}
                      <text x={p.x} y={p.height - 10} textAnchor="middle" fill="#64748b" fontSize="9">{p.label}</text>
                    </g>
                  ))}
                </svg>
              </div>
            ) : (
              <div className="no-chart-data">No sufficient history to graph booking trends.</div>
            )}
          </div>

          {/* Category Distribution Donut Chart */}
          <div className="chart-card glass-panel donut-card">
            <h3 className="chart-title">Popular Destinations</h3>
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
                    {/* Inner hole */}
                    <circle cx="80" cy="80" r="48" fill="#121826" />
                    <text x="80" y="78" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="500">TOTAL</text>
                    <text x="80" y="98" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="700">{categoryDonutSvg.totalCount}</text>
                  </svg>
                </div>
                
                {/* Legend list */}
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
        </>) : (
        /* Database List / Table Section */
        <section className="bookings-section glass-panel">
          <div className="table-header-controls">
            <h3 className="table-heading-title">Recent Registrations</h3>
            
            <div className="controls-group">
              {/* Search Bar */}
              <div className="table-search-wrapper">
                <svg viewBox="0 0 24 24" className="search-icon"><path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/></svg>
                <input 
                  type="text" 
                  placeholder="Search package, name, or email..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filter Tabs */}
              <div className="status-filter-tabs">
                {['All', 'Pending', 'Confirmed', 'Cancelled'].map(status => (
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
              <p>Fetching registrations...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="table-empty-state">
              <svg viewBox="0 0 24 24" className="empty-icon"><path fill="currentColor" d="M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M16.5,16.25A1.25,1.25 0 0,1 15.25,15A1.25,1.25 0 0,1 16.5,13.75A1.25,1.25 0 0,1 17.75,15A1.25,1.25 0 0,1 16.5,16.25M12,16.25A1.25,1.25 0 0,1 10.75,15A1.25,1.25 0 0,1 12,13.75A1.25,1.25 0 0,1 13.25,15A1.25,1.25 0 0,1 12,16.25M7.5,16.25A1.25,1.25 0 0,1 6.25,15A1.25,1.25 0 0,1 7.5,13.75A1.25,1.25 0 0,1 8.75,15A1.25,1.25 0 0,1 7.5,16.25Z"/></svg>
              <p>No bookings match your current filter criteria.</p>
            </div>
          ) : (
            <div className="table-responsive-wrapper">
              <table className="bookings-data-table">
                <thead>
                  <tr>
                    <th>Customer details</th>
                    <th>Destination Package</th>
                    <th>Travel Date</th>
                    <th>Guests</th>
                    <th>Est. Total Price</th>
                    <th>Status</th>
                    <th className="actions-header">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map(b => {
                    const price = b.package?.price || 0;
                    const guests = b.numberOfGuests || 1;
                    const totalPrice = price * guests;

                    return (
                      <tr key={b._id}>
                        {/* Column 1: Customer Details */}
                        <td className="cell-customer">
                          <p className="customer-name">{b.fullName}</p>
                          <p className="customer-contact">
                            <span className="contact-block">{b.email}</span>
                            <span className="contact-block">{b.phone}</span>
                          </p>
                          {b.specialRequests && (
                            <div className="special-req-bubble" title={b.specialRequests}>
                              <strong>Req:</strong> {b.specialRequests}
                            </div>
                          )}
                        </td>

                        {/* Column 2: Destination Package */}
                        <td className="cell-package">
                          <p className="pkg-title">{b.package?.title || 'Unknown Package'}</p>
                          <span className="pkg-category-badge">{b.package?.category}</span>
                        </td>

                        {/* Column 3: Travel Date */}
                        <td className="cell-date">
                          {new Date(b.travelDate).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>

                        {/* Column 4: Guests count */}
                        <td className="cell-guests">
                          {b.numberOfGuests} {b.numberOfGuests === 1 ? 'Guest' : 'Guests'}
                        </td>

                        {/* Column 5: Total Estimated Price */}
                        <td className="cell-price">
                          <span className="total-cost">{formatCurrency(totalPrice)}</span>
                          <span className="cost-breakdown">({formatCurrency(price)} / head)</span>
                        </td>

                        {/* Column 6: Status badge */}
                        <td className="cell-status">
                          <span className={`status-badge ${b.status.toLowerCase()}`}>
                            {b.status}
                          </span>
                        </td>

                        {/* Column 7: Actions */}
                        <td className="cell-actions">
                          {statusUpdateLoading === b._id ? (
                            <div className="action-spinner"></div>
                          ) : (
                            <div className="action-buttons-group">
                              {b.status !== 'Confirmed' && (
                                <button 
                                  className="action-btn confirm"
                                  onClick={() => handleStatusChange(b._id, 'Confirmed')}
                                  title="Confirm booking"
                                >
                                  Confirm
                                </button>
                              )}
                              {b.status !== 'Cancelled' && (
                                <button 
                                  className="action-btn cancel"
                                  onClick={() => handleStatusChange(b._id, 'Cancelled')}
                                  title="Cancel booking"
                                >
                                  Cancel
                                </button>
                              )}
                              {b.status !== 'Pending' && (
                                <button 
                                  className="action-btn reset-pending"
                                  onClick={() => handleStatusChange(b._id, 'Pending')}
                                  title="Set back to Pending"
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
      </main>
    </div>
  );
};

export default AdminDashboard;
