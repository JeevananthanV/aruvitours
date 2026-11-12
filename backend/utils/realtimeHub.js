// Real-time Server-Sent Events (SSE) Hub for Aruvi Tours
let sseClients = new Set();

// 25-second heartbeat to keep SSE connection alive through proxies
setInterval(() => {
  const comment = `: heartbeat ${Date.now()}\n\n`;
  for (const client of sseClients) {
    try {
      client.res.write(comment);
    } catch (err) {
      sseClients.delete(client);
    }
  }
}, 25000);

const handleSSEConnection = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });

  res.write(`data: ${JSON.stringify({ type: 'CONNECTED', message: 'Aruvi Tours Real-Time Event Stream Connected', timestamp: new Date() })}\n\n`);

  const client = { id: Date.now() + Math.random(), res };
  sseClients.add(client);

  req.on('close', () => {
    sseClients.delete(client);
  });
};

const broadcastEvent = (type, data) => {
  const payload = JSON.stringify({
    type,
    data,
    timestamp: new Date()
  });

  const msg = `data: ${payload}\n\n`;
  for (const client of sseClients) {
    try {
      client.res.write(msg);
    } catch (err) {
      sseClients.delete(client);
    }
  }
};

module.exports = {
  handleSSEConnection,
  broadcastEvent,
  broadcastBooking: (booking) => broadcastEvent('NEW_BOOKING', booking),
  broadcastBookingStatus: (booking) => broadcastEvent('BOOKING_STATUS_CHANGED', booking),
  broadcastOperationUpdate: (operation) => broadcastEvent('OPERATION_UPDATED', operation),
  broadcastPassengerBoarding: (payload) => broadcastEvent('PASSENGER_BOARDING_UPDATED', payload),
  broadcastMilestone: (payload) => broadcastEvent('OPERATION_MILESTONE_ADDED', payload),
  broadcastInquiry: (contact) => broadcastEvent('NEW_CONTACT_INQUIRY', contact)
};
