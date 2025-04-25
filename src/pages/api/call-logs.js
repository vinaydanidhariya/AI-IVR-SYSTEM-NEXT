import { verifyToken } from '../../utils/auth';

// Sample data - in a real app this would come from a database
const callLogs = [
  {
    id: 1,
    from: "+13051416799",
    to: "+13051913581",
    price: "0.200",
    duration: "4",
    start_time: "Fri, 18 Oct 2023 17:02:00 +0000",
    end_time: "Fri, 18 Oct 2023 17:03:00 +0000",
    status: "completed",
    date_created: "Fri, 18 Oct 2023 17:00:00 +0000",
  },
  {
    id: 2,
    from: "+1234567890",
    to: "+0987654321",
    price: "0.150",
    duration: "7",
    start_time: "Sat, 19 Oct 2023 10:30:00 +0000",
    end_time: "Sat, 19 Oct 2023 10:37:00 +0000",
    status: "applied",
    date_created: "Sat, 19 Oct 2023 10:25:00 +0000",
  },
  {
    id: 3,
    from: "+9876543210",
    to: "+1234567890",
    price: "0.300",
    duration: "10",
    start_time: "Sun, 20 Oct 2023 15:45:00 +0000",
    end_time: "Sun, 20 Oct 2023 15:55:00 +0000",
    status: "rejected",
    date_created: "Sun, 20 Oct 2023 15:40:00 +0000",
  },
  {
    id: 4,
    from: "+13051416799",
    to: "+13051913581",
    price: "0.200",
    duration: "4",
    start_time: "Mon, 21 Oct 2023 17:02:00 +0000",
    end_time: "Mon, 21 Oct 2023 17:03:00 +0000",
    status: "completed",
    date_created: "Mon, 21 Oct 2023 17:00:00 +0000",
  },
  {
    id: 5,
    from: "+1234567890",
    to: "+0987654321",
    price: "0.150",
    duration: "7",
    start_time: "Tue, 22 Oct 2023 10:30:00 +0000",
    end_time: "Tue, 22 Oct 2023 10:37:00 +0000",
    status: "applied",
    date_created: "Tue, 22 Oct 2023 10:25:00 +0000",
  },
  {
    id: 6,
    from: "+9876543210",
    to: "+1234567890",
    price: "0.300",
    duration: "10",
    start_time: "Wed, 23 Oct 2023 15:45:00 +0000",
    end_time: "Wed, 23 Oct 2023 15:55:00 +0000",
    status: "rejected",
    date_created: "Wed, 23 Oct 2023 15:40:00 +0000",
  },
  {
    id: 7,
    from: "+9876543210",
    to: "+13051416799",
    price: "0.180",
    duration: "5",
    start_time: "Thu, 24 Oct 2023 09:15:00 +0000",
    end_time: "Thu, 24 Oct 2023 09:20:00 +0000",
    status: "current",
    date_created: "Thu, 24 Oct 2023 09:10:00 +0000",
  },
  {
    id: 8,
    from: "+13051913581",
    to: "+9876543210",
    price: "0.250",
    duration: "8",
    start_time: "Fri, 25 Oct 2023 14:00:00 +0000",
    end_time: "Fri, 25 Oct 2023 14:08:00 +0000",
    status: "completed",
    date_created: "Fri, 25 Oct 2023 13:55:00 +0000",
  },
];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // In a real application, you would validate the JWT token here
  // const authHeader = req.headers.authorization;
  // if (!authHeader || !authHeader.startsWith('Bearer ')) {
  //   return res.status(401).json({ error: 'Unauthorized' });
  // }
  // const token = authHeader.split(' ')[1];
  // try {
  //   const decoded = verifyToken(token);
  //   if (!decoded) {
  //     return res.status(401).json({ error: 'Invalid token' });
  //   }
  // } catch (error) {
  //   return res.status(401).json({ error: 'Invalid token' });
  // }

  // Add pagination support
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedLogs = callLogs.slice(startIndex, endIndex);
  
  // Add a short delay to simulate a real API call
  await new Promise(resolve => setTimeout(resolve, 500));

  res.status(200).json({
    data: paginatedLogs,
    pagination: {
      total: callLogs.length,
      page,
      limit,
      totalPages: Math.ceil(callLogs.length / limit)
    }
  });
} 