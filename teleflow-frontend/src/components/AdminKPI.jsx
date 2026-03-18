router.get('/admin-stats', async (req, res) => {
  const stats = await Ticket.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } }
  ]);
  // Returns: [{_id: 'Waiting', count: 5}, {_id: 'Closed', count: 12}...]
  res.json(stats);
});