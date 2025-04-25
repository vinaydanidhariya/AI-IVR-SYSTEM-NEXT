import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Table, 
  TableContainer, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  Chip, 
  Typography,
  Box,
  Pagination,
  CircularProgress
} from '@mui/material';
import { getAuthHeader } from 'src/utils/auth';

const statusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  completed: { color: 'success' }
}

const formatDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toLocaleString();
};

const DashboardTable = () => {
  const [loading, setLoading] = useState(true);
  const [callLogs, setCallLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const fetchCallLogs = async (pageNum = 1) => {
    try {
      setLoading(true);
      const headers = {
        ...getAuthHeader(),
        'Content-Type': 'application/json',
      };

      const response = await fetch(`/api/call-logs?page=${pageNum}&limit=10`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch call logs');
      }

      const data = await response.json();
      setCallLogs(data.data);
      setTotalPages(data.pagination.totalPages);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching call logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCallLogs(page);
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (error) {
    return (
      <Card>
        <Box sx={{ p: 5, textAlign: 'center' }}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      </Card>
    );
  }

  return (
    <Card>
      <Box sx={{ p: 5, pb: 3 }}>
        <Typography variant="h6">Call Logs</Typography>
        <Typography variant="body2">Recent call activity from the IVR system</Typography>
      </Box>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer>
            <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
              <TableHead>
                <TableRow>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>End Time</TableCell>
                  <TableCell>Date Created</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {callLogs.map((row, index) => (
                  <TableRow hover key={row.id || index} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                    <TableCell>{row.from}</TableCell>
                    <TableCell>{row.to}</TableCell>
                    <TableCell>${row.price}</TableCell>
                    <TableCell>{row.duration} min</TableCell>
                    <TableCell>{formatDate(row.start_time)}</TableCell>
                    <TableCell>{formatDate(row.end_time)}</TableCell>
                    <TableCell>{formatDate(row.date_created)}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        color={statusObj[row.status]?.color || 'default'}
                        sx={{
                          height: 24,
                          fontSize: '0.75rem',
                          textTransform: 'capitalize',
                          '& .MuiChip-label': { fontWeight: 500 }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={handlePageChange} 
              color="primary" 
            />
          </Box>
        </>
      )}
    </Card>
  );
}

export default DashboardTable;
