import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../utils/axiosClient";
import { logoutUser } from "../authSlice";

function HomePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [filter, setFilter] = useState({
    difficulty: "all",
    tag: "all",
    status: "all",
  });
  console.log("User Role:", user);
  
  

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosClient.get(
          "/api/auth/problem/getAllProblem"
        );
        setProblems(data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    const fetchSolvedProblems = async () => {
      try {
        const { data } = await axiosClient.get(
          `/api/auth/problem/problemSolvedByUser`
        );
        setSolvedProblems(data.solvedProblems || []);
      } catch (error) {
        console.error("Error fetching solved problems:", error);
      }
    };

    fetchProblems();
    if (user) {
      fetchSolvedProblems();
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setSolvedProblems([]); // Clear solved problems on logout
  };

  const filterProblems = problems.filter((problem) => {
    const matchesDifficulty =
      filter.difficulty === "all" || problem.difficulty === filter.difficulty;

    const matchesTag = filter.tag === "all" || problem.tags === filter.tag;

   let matchesStatus = true;

if (filter.status === "solved") {
  matchesStatus = solvedProblems.some(sp => sp._id === problem._id);
} else if (filter.status === "unsolved") {
  matchesStatus = !solvedProblems.some(sp => sp._id === problem._id);
}
    return matchesDifficulty && matchesTag && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-base-200">
      <nav className="navbar bg-base-100 shadow-lg px-4">
        <div className="flex-1">
          <NavLink to="/" className="btn btn-ghost normal-case text-xl">
            CodePractice
          </NavLink>
        </div>
        {/* Conditional Admin Link Rendering */}
        {user?.role === "admin" && (
          <div className="flex-none mr-4">
            <NavLink to="/admin" className="btn btn-primary">
              Admin Panel
            </NavLink>
          </div>
        )}
        <div className="flex-none gap-4">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost">
              {user?.firstname || "Guest"}
            </div>
            <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-25 ">
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* {Main Content} */}
      <div className="container mx-auto p-4">
        {/* Filters Section */}

        <div className="flex flex-wrap gap-4 mb-6">
          <select
            className="select select-bordered"
            value={filter.difficulty}
            onChange={(e) =>
              setFilter({ ...filter, difficulty: e.target.value })
            }
          >
            <option value="all">All Diffuculties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <select
            className="select select-bordered"
            value={filter.tag}
            onChange={(e) => setFilter({ ...filter, tag: e.target.value })}
          >
            <option value="all">All Tags</option>
            <option value="arrays">Arrays</option>
            <option value="strings">Strings</option>
            <option value="dp">DP</option>
            <option value="graph">Graph</option>
          </select>

          <select
            className="select select-bordered"
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          >
            <option value="all">All Status</option>
            <option value="solved">Solved</option>
            <option value="unsolved">Unsolved</option>
          </select>
        </div>

        {/* Problems List */}

        <div className="grid gap-4">
          {filterProblems.map((problem) => (
            <div key={problem._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <h2 className="card-title">{problem.title}</h2>
                  {solvedProblems.some((sp) => sp._id === problem._id) && (
                    <div className="badge badge-success gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Solved
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <div
                    className={`badge ${getDiffcultyBadgeColor(
                      problem.difficulty
                    )}`}
                  >
                    {problem.difficulty}
                  </div>
                  <div className="badge badge-info">{problem.tags}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const getDiffcultyBadgeColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "badge-success";
    case "medium":
      return "badge-warning";
    case "hard":
      return "badge-error";
    default:
      return "badge-secondary";
  }
};

export default HomePage;
