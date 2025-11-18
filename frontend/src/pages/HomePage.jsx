import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
      matchesStatus = solvedProblems.some((sp) => sp._id === problem._id);
    } else if (filter.status === "unsolved") {
      matchesStatus = !solvedProblems.some((sp) => sp._id === problem._id);
    }
    return matchesDifficulty && matchesTag && matchesStatus;
  });


  // Helper function to return the correct Tailwind class string
const getDifficultyClass = (difficulty) => {
  if (difficulty === "Easy") {
    // Correct classes: green text
    return "text-green-500 font-medium tracking-wide";
  } else if (difficulty === "Medium") {
    // Correct classes: yellow text
    return "text-yellow-500 font-medium tracking-wide";
  } else if (difficulty === "Hard") {
    // Correct classes: red text
    return "text-red-500 font-medium tracking-wide";
  }
  return "text-zinc-300"; // Fallback to grey if difficulty is unknown
};

  return (
    <div className="min-h-screen  bg-zinc-900">
      <nav className="navbar bg-zinc-800 shadow-lg px-4 text-zinc-200">
        <div className="flex-1">
          <NavLink to="/" className="btn btn-ghost normal-case text-xl">
            GreetCode
          </NavLink>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="btn btn-md bg-zinc-900 hover:bg-zinc-850 active:bg-zinc-950 active:scale-0.95 text-blue-400 font-medium  rounded-md drop-shadow-2xl shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] relative">
            Ai
            <img className="size-4 " src="https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/gemini-color.png" alt="" />
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-md bg-zinc-900 hover:bg-zinc-850 active:bg-zinc-950 active:scale-0.95 text-yellow-400 font-medium  rounded-md drop-shadow-2xl shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
              {user?.firstname || "Guest"}
            </div>
            <ul className="mt-3 p-2 shadow menu menu-md dropdown-content rounded-box w-48 bg-gradient-to-r from-neutral-800 via-stone-800 to-zinc-950 outline-none border-0 transition-shadow transition-all ease-in-out text-zinc-300 gap-2">
              <li className="bg-red-600/10">
                <button onClick={handleLogout}>Logout</button>
              </li>
              {user?.role === "admin" && (
                <li>
                  <Link to="/admin">Admin Panel</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* {Main Content} */}
      <div className="container mx-auto p-4">
        {/* Filters Section */}

        <div className="flex flex-wrap gap-4 mb-6">
          <select
            className="select select-bordered bg-zinc-800 outline-none border-0 transition-shadow transition-all ease-in-out text-zinc-300"
            value={filter.difficulty}
            onChange={(e) =>
              setFilter({ ...filter, difficulty: e.target.value })
            }
          >
            <option value="all">All Diffuculties</option>
            <option
              className="text-green-500 font-normal tracking-wide"
              value="easy"
            >
              Easy
            </option>
            <option
              className="text-yellow-500 font-normal  tracking-wide"
              value="medium"
            >
              Medium
            </option>
            <option
              className="text-red-500 font-normal tracking-wide"
              value="hard"
            >
              Hard
            </option>
          </select>

          <select
            className="select select-bordered bg-zinc-800 outline-none border-0 transition-shadow transition-all ease-in-out text-zinc-300"
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
            className="select select-bordered bg-zinc-800 outline-none border-0 transition-shadow transition-all ease-in-out text-zinc-300"
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          >
            <option value="all">All Status</option>
            <option className="text-green-400" value="solved">Solved</option>
            <option value="unsolved">Unsolved</option>
          </select>

          <input type="text" placeholder="Search the question..." className="px-4 py-2 outline-none bg-zinc-800 flex-1 text-zinc-200 placeholder:text-zinc-300 placeholder:font-normal" />
        </div>

        {/* Problems List */}

        <div className="grid gap-4">
          {filterProblems.map((problem) => (
            <div key={problem._id} className="card bg-zinc-800 shadow-2xl">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <Link to={`/problem/${problem._id}`} className="card-title">
                    {problem.title}
                  </Link>
                  {solvedProblems.some((sp) => sp._id === problem._id) && (
                    <div className="bg-zinc-900 rounded-md shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] text-shadow-lg flex items-center px-4 py-2 text-green-400 font-medium gap-2">
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

                <div className="flex gap-4 mt-2">
                  <div
                    className={`bg-zinc-900 rounded-md shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]  font-semibold outline-none px-4 py-2 ${getDifficultyClass(
                      problem.difficulty
                    )}`}
                  >
                    {problem.difficulty}
                  </div>
                  <div className="bg-transparent border-1 border-zinc-400 text-zinc-300 hover:bg-zinc-900 cursor-pointer  rounded-md shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]  font-semibold outline-none px-4 py-2">{problem.tags}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
