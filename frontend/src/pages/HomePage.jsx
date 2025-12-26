import { useEffect, useState, useRef } from "react";
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
  LayoutDashboard, 
  Sparkles,
  ChevronDown,
  Check,
  X
} from "lucide-react";

// --- REUSABLE CUSTOM DROPDOWN COMPONENT ---
const CustomDropdown = ({ options, value, onChange, label, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const selectedLabel = options.find((opt) => opt.value === value)?.label || label;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between gap-3 px-4 py-2.5 
          min-w-[140px] text-sm font-medium transition-all duration-200
          border rounded-xl outline-none cursor-pointer
          ${isOpen 
            ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 dark:border-white " 
            : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm"
          }
        `}
      >
        <span className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 opacity-70" />}
          {selectedLabel}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="
          absolute top-full mt-2 w-48 z-50 space-y-2
          bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl
          border border-zinc-200 dark:border-zinc-800 rounded-xl 
          shadow-xl shadow-zinc-200/20 dark:shadow-black/40 
          p-1 animate-in fade-in zoom-in-95 duration-150 origin-top-left
        ">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors  cursor-pointer
                ${value === option.value 
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium" 
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200"
                }
              `}
            >
              {option.label}
              {value === option.value && <Check className="w-3.5 h-3.5 text-sky-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

function HomePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [filter, setFilter] = useState({
    difficulty: "all",
    tag: "all",
    status: "all",
    search: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [problemsRes, solvedRes] = await Promise.allSettled([
          axiosClient.get("/api/auth/problem/getAllProblem"),
          user ? axiosClient.get(`/api/auth/problem/problemSolvedByUser`) : Promise.resolve({ data: { solvedProblems: [] } })
        ]);

        if (problemsRes.status === "fulfilled") {
          setProblems(problemsRes.value.data);
        }
        
        if (solvedRes.status === "fulfilled" && solvedRes.value.data) {
          setSolvedProblems(solvedRes.value.data.solvedProblems || []);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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

  const getDifficultyStyle = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Medium": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Hard": return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      default: return "bg-zinc-500/10 text-zinc-500 border-zinc-500/20";
    }
  };

  const SkeletonRow = () => (
    <tr className="animate-pulse border-b border-zinc-100 dark:border-zinc-800/50">
      <td className="px-6 py-4"><div className="h-5 w-5 rounded-full bg-zinc-200 dark:bg-zinc-800"></div></td>
      <td className="px-6 py-4"><div className="h-4 w-48 rounded bg-zinc-200 dark:bg-zinc-800"></div></td>
      <td className="px-6 py-4"><div className="h-5 w-16 rounded-full bg-zinc-200 dark:bg-zinc-800"></div></td>
      <td className="px-6 py-4"><div className="h-5 w-12 rounded bg-zinc-200 dark:bg-zinc-800"></div></td>
      <td className="px-6 py-4 text-right"><div className="ml-auto h-4 w-12 rounded bg-zinc-200 dark:bg-zinc-800"></div></td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-inter selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
      
      {/* Background Grid */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-zinc-950 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)]"></div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/75 dark:bg-zinc-950/75 backdrop-blur-md">
        <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <NavLink to="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
              <span className="bg-gradient-to-br from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent">
                GreetCode
              </span>
            </NavLink>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <NavLink to="/home" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Problems</NavLink>
              <span className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">Contest</span>
              <NavLink to="/discuss" className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">Discuss</NavLink>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="cursor-pointer group hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
              <Sparkles className="w-3.5 h-3.5 text-sky-500 group-hover:scale-110 transition-transform" />
              <span>Ask AI</span>
            </button>
            <Togglebtn />
            
            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="cursor-pointer flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-sky-400 to-sky-500 flex items-center justify-center text-[10px] text-white font-bold">
                  {user?.firstname?.charAt(0).toUpperCase() || "U"}
                </div>
                <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-56 z-20 origin-top-right rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl p-1 animate-in fade-in zoom-in-95">
                    <Link to="/profile" className="block px-3 py-2 border-b border-zinc-100 dark:border-zinc-900 mb-1 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors rounded-t-lg">
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">{user?.firstname}</p>
                      <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
                      <p className="text-[10px] text-sky-500 mt-1 font-medium">View Profile</p>
                    </Link>
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
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
            Problems
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl">
            Master your coding skills with our curated list of algorithm challenges.
          </p>
        </div>

        {/* --- PREMIUM FILTER TOOLBAR --- */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search Bar - Modernized */}
          <div className="relative flex-1 group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100 transition-colors" />
            <input 
              type="text" 
              placeholder="Search questions..." 
              value={filter.search}
              onChange={(e) => setFilter({...filter, search: e.target.value})}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-white/10 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 transition-all shadow-sm"
            />
          </div>

          {/* New Custom Dropdowns */}
          <div className="flex gap-3 flex-wrap">
            <CustomDropdown 
              label="Difficulty"
              value={filter.difficulty}
              onChange={(val) => setFilter({ ...filter, difficulty: val })}
              options={[
                { label: "All Difficulties", value: "all" },
                { label: "Easy", value: "Easy" },
                { label: "Medium", value: "Medium" },
                { label: "Hard", value: "Hard" },
              ]}
            />

            <CustomDropdown 
              label="Tags"
              value={filter.tag}
              onChange={(val) => setFilter({ ...filter, tag: val })}
              options={[
                { label: "All Tags", value: "all" },
                { label: "Arrays", value: "arrays" },
                { label: "Strings", value: "strings" },
                { label: "DP", value: "dp" },
                { label: "Graph", value: "graph" },
              ]}
            />

            <CustomDropdown 
              label="Status"
              value={filter.status}
              onChange={(val) => setFilter({ ...filter, status: val })}
              options={[
                { label: "All Status", value: "all" },
                { label: "Solved", value: "solved" },
                { label: "Unsolved", value: "unsolved" },
              ]}
            />
            
            {/* Clear Filters Button (Optional UX improvement) */}
            {(filter.difficulty !== 'all' || filter.tag !== 'all' || filter.status !== 'all' || filter.search !== '') && (
                <button 
                    onClick={() => setFilter({ difficulty: "all", tag: "all", status: "all", search: "" })}
                    className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                >
                    <X className="w-4 h-4" />
                    Clear
                </button>
            )}
          </div>
        </div>

        {/* Problems Table */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="px-6 py-4 font-medium text-zinc-500 dark:text-zinc-400 w-12">Status</th>
                  <th className="px-6 py-4 font-medium text-zinc-500 dark:text-zinc-400">Title</th>
                  <th className="px-6 py-4 font-medium text-zinc-500 dark:text-zinc-400 w-32">Difficulty</th>
                  <th className="px-6 py-4 font-medium text-zinc-500 dark:text-zinc-400 w-32">Tags</th>
                  <th className="px-6 py-4 font-medium text-zinc-500 dark:text-zinc-400 w-24 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {isLoading ? (
                  [...Array(8)].map((_, i) => <SkeletonRow key={i} />)
                ) : filterProblems.length > 0 ? (
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