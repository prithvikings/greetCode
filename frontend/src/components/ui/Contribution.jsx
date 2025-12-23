import { GitHubCalendar } from "../git-hub-calendar";

export default function Contribution() {
  const contributionData = [
  { date: "2025-10-13", count: 3 },
  { date: "2025-05-12", count: 1 },
  { date: "2025-09-11", count: 2 },
  { date: "2025-09-10", count: 5 },
  { date: "2024-09-13", count: 2 },
  { date: "2024-09-15", count: 0 },
  { date: "2024-09-20", count: 4 },
  { date: "2024-10-01", count: 1 },
  { date: "2024-10-05", count: 3 },
  { date: "2024-10-10", count: 0 },
  { date: "2024-10-15", count: 2 },
  { date: "2024-10-20", count: 5 },
  { date: "2024-11-02", count: 1 },
  { date: "2024-11-07", count: 3 },
  { date: "2024-11-12", count: 4 },
  { date: "2024-11-18", count: 0 },
  { date: "2024-11-25", count: 2 },
  { date: "2024-12-01", count: 3 },
  { date: "2024-12-05", count: 1 },
  { date: "2024-12-10", count: 0 },
  { date: "2024-12-15", count: 4 },
  { date: "2024-12-20", count: 2 },
  { date: "2024-12-25", count: 0 },
  { date: "2025-01-03", count: 3 },
  { date: "2025-01-08", count: 1 },
  { date: "2025-01-15", count: 5 },
  { date: "2025-01-20", count: 2 },
  { date: "2025-01-25", count: 0 },
  { date: "2025-02-01", count: 4 },
  { date: "2025-02-07", count: 3 },
  { date: "2025-02-12", count: 1 },
  { date: "2025-02-18", count: 0 },
  { date: "2025-02-25", count: 2 },
  { date: "2025-03-02", count: 5 },
  { date: "2025-03-08", count: 3 },
  { date: "2025-03-15", count: 1 },
  { date: "2025-03-20", count: 0 },
  { date: "2025-03-25", count: 4 },
  { date: "2025-04-01", count: 2 },
  { date: "2025-04-07", count: 0 },
  { date: "2025-04-12", count: 3 },
  { date: "2025-04-18", count: 1 },
  { date: "2025-04-25", count: 5 },
  { date: "2025-05-01", count: 2 },
  { date: "2025-05-07", count: 0 },
  { date: "2025-06-01", count: 4 },
  { date: "2025-06-10", count: 3 },
  { date: "2025-06-15", count: 1 },
  { date: "2025-07-01", count: 0 },
  { date: "2025-07-10", count: 2 },
  { date: "2025-08-01", count: 5 },
  { date: "2025-08-15", count: 3 },
  { date: "2025-10-01", count: 1 },
  { date: "2025-10-02", count: 1 },
  { date: "2025-10-03", count: 4 },
  { date: "2025-10-04", count: 3 },
  { date: "2025-10-05", count: 8 },
  { date: "2025-10-06", count: 2 },
];

  return (
    <div> 
      <GitHubCalendar 
      data={contributionData}  
      />
    </div>
  );
}