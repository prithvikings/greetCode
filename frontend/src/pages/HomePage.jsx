import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../utils/axiosClient";
import { logoutUser } from "../authSlice";
import { Togglebtn } from "../components/themetoggle";
import { 
  Search, 
  CheckCircle2, 
  Circle, 
  Filter, 
  LogOut, 
  User, 
  LayoutDashboard, 
  Sparkles,
  ChevronDown
} from "lucide-react";

function HomePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // For custom dropdown
  const [filter, setFilter] = useState({
    difficulty: "all",
    tag: "all",
    status: "all",
    search: "", // Added search to state
  });

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosClient.get("/api/auth/problem/getAllProblem");
        setProblems(data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    const fetchSolvedProblems = async () => {
      try {
        const { data } = await axiosClient.get(`/api/auth/problem/problemSolvedByUser`);
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
    setSolvedProblems([]);
  };

  const filterProblems = problems.filter((problem) => {
    const matchesDifficulty = filter.difficulty === "all" || problem.difficulty === filter.difficulty;
    const matchesTag = filter.tag === "all" || problem.tags === filter.tag;
    const matchesSearch = problem.title.toLowerCase().includes(filter.search.toLowerCase());

    let matchesStatus = true;
    if (filter.status === "solved") {
      matchesStatus = solvedProblems.some((sp) => sp._id === problem._id);
    } else if (filter.status === "unsolved") {
      matchesStatus = !solvedProblems.some((sp) => sp._id === problem._id);
    }

    return matchesDifficulty && matchesTag && matchesStatus && matchesSearch;
  });

  // Helper for Difficulty Styles
  const getDifficultyStyle = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Medium": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Hard": return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      default: return "bg-zinc-500/10 text-zinc-500 border-zinc-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-inter selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
      
      {/* Background Grid */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-zinc-950 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)]"></div>

      {/* Navbar - Sticky Glassmorphism */}
      <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/75 dark:bg-zinc-950/75 backdrop-blur-md">
        <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <NavLink to="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
              <span className="bg-gradient-to-br from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent">
                GreetCode
              </span>
            </NavLink>
            
            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <NavLink to="/home" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Problems</NavLink>
              <span className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">Contest</span>
              <NavLink to="/discuss" className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">Discuss</NavLink>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* AI Button */}
            <button className="cursor-pointer group hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 group-hover:scale-110 transition-transform" />
              <span>Ask AI</span>
            </button>
<Togglebtn />
            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="cursor-pointer flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-[10px] text-white font-bold">
                  {user?.firstname?.charAt(0).toUpperCase() || "U"}
                </div>
                <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-56 z-20 origin-top-right rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl p-1 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-900 mb-1">
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">{user?.firstname}</p>
                      <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
                    </div>
                    {user?.role === "admin" && (
                      <Link to="/admin" className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors">
                        <LayoutDashboard className="w-4 h-4" />
                        Admin Dashboard
                      </Link>
                    )}
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto max-w-7xl px-4 lg:px-8 py-8">
        
        {/* Header Area */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
            Problems
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl">
            Master your coding skills with our curated list of algorithm challenges. Filter by difficulty, tag, or status to find your next challenge.
          </p>
        </div>

        {/* Filters Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 p-1">
          {/* Search */}
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100 transition-colors" />
            <input 
              type="text" 
              placeholder="Search questions..." 
              value={filter.search}
              onChange={(e) => setFilter({...filter, search: e.target.value})}
              className="w-full pl-10 pr-4 py-2 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-white/10 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 transition-all"
            />
          </div>

          {/* Dropdowns Group */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <div className="relative">
              <select
                className="appearance-none pl-3 pr-8 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-600 dark:text-zinc-300 outline-none focus:ring-2 focus:ring-zinc-900/10 cursor-pointer"
                value={filter.difficulty}
                onChange={(e) => setFilter({ ...filter, difficulty: e.target.value })}
              >
                <option value="all">Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                className="appearance-none pl-3 pr-8 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-600 dark:text-zinc-300 outline-none focus:ring-2 focus:ring-zinc-900/10 cursor-pointer"
                value={filter.tag}
                onChange={(e) => setFilter({ ...filter, tag: e.target.value })}
              >
                <option value="all">Tags</option>
                <option value="arrays">Arrays</option>
                <option value="strings">Strings</option>
                <option value="dp">DP</option>
                <option value="graph">Graph</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                className="appearance-none pl-3 pr-8 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-600 dark:text-zinc-300 outline-none focus:ring-2 focus:ring-zinc-900/10 cursor-pointer"
                value={filter.status}
                onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              >
                <option value="all">Status</option>
                <option value="solved">Solved</option>
                <option value="unsolved">Unsolved</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Problems Table */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="px-6 py-3 font-medium text-zinc-500 dark:text-zinc-400 w-12">Status</th>
                  <th className="px-6 py-3 font-medium text-zinc-500 dark:text-zinc-400">Title</th>
                  <th className="px-6 py-3 font-medium text-zinc-500 dark:text-zinc-400 w-32">Difficulty</th>
                  <th className="px-6 py-3 font-medium text-zinc-500 dark:text-zinc-400 w-32">Tags</th>
                  <th className="px-6 py-3 font-medium text-zinc-500 dark:text-zinc-400 w-24 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filterProblems.length > 0 ? (
                  filterProblems.map((problem, index) => {
                    const isSolved = solvedProblems.some((sp) => sp._id === problem._id);
                    return (
                      <tr 
                        key={problem._id} 
                        className={`group hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors ${index % 2 === 0 ? 'bg-white dark:bg-zinc-950' : 'bg-zinc-50/30 dark:bg-zinc-900/20'}`}
                      >
                        <td className="px-6 py-4">
                          {isSolved ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-zinc-300 dark:text-zinc-700" />
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <Link to={`/problem/${problem._id}`} className="font-medium text-zinc-900 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {problem.title}
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDifficultyStyle(problem.difficulty)}`}>
                            {problem.difficulty}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                            {problem.tags}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link 
                            to={`/problem/${problem._id}`}
                            className="text-xs font-medium text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                          >
                            Solve →
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-zinc-500">
                        <Filter className="w-8 h-8 mb-3 opacity-20" />
                        <p className="text-sm font-medium">No problems found</p>
                        <p className="text-xs mt-1">Try adjusting your filters</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;