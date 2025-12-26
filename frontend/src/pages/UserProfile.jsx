import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosClient from "../utils/axiosClient";
import { logoutUser } from "../authSlice";
import { Togglebtn } from "../components/themetoggle";
import { 
  ArrowLeft, 
  Camera,
  Trash2, 
  Loader2,
  Check,
  X,
  ShieldCheck,
  User,
  Fingerprint
} from "lucide-react";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.put("/api/auth/users/update", {
        firstname: formData.firstname,
        lastname: formData.lastname
      });
      alert(res.data.message); 
      setIsEditing(false);
      window.location.reload(); 
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("This action is irreversible. Delete account?")) {
      try {
        await axiosClient.post("/api/auth/users/deleteProfile");
        dispatch(logoutUser());
        navigate("/");
      } catch (error) {
        alert(error.response?.data?.message || "Failed to delete account");
      }
    }
  };

  // --- PREMIUM DESIGN SYSTEM ---
  const containerClass = "max-w-2xl mx-auto px-6 py-12 md:py-24";
  const sectionClass = "mb-16";
  const labelClass = "block text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3 font-mono";
  
  // Minimalist "Underline" Input that feels like a document
  const inputClass = `
    w-full bg-transparent 
    text-lg md:text-xl font-medium text-zinc-900 dark:text-zinc-100 
    border-b border-zinc-200 dark:border-zinc-800 
    py-2 px-0
    placeholder-zinc-300 dark:placeholder-zinc-700
    focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100
    transition-colors duration-300
    disabled:opacity-100 disabled:border-transparent disabled:cursor-default
  `;

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#09090b]">
      <Loader2 className="w-5 h-5 animate-spin text-zinc-900 dark:text-zinc-100" />
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
      
      {/* NAVBAR: Ghost */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800/50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
           <button 
             onClick={() => navigate("/home")}
             className="group flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
           >
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
             <span>Back</span>
           </button>
           <Togglebtn />
        </div>
      </nav>

      <main className={containerClass}>
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-end gap-6">
            {/* Avatar: Squircle shape (Superellipse feel) */}
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-[24px] bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-4xl md:text-5xl font-medium text-zinc-400 dark:text-zinc-600 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
                {user?.firstname?.charAt(0).toUpperCase()}
              </div>
              <div className="absolute inset-0 rounded-[24px] bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-[2px]">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="mb-1">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
                {user?.firstname} <br className="md:hidden"/> {user?.lastname}
              </h1>
              <div className="flex items-center gap-3 mt-3 ">
                 <span className="flex items-center gap-1.5 text-xs font-bold bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-2.5 py-1 rounded-md uppercase tracking-wide text-zinc-600 dark:text-emerald-400">
                   <ShieldCheck className="w-3 h-3 text-emerald-400" /> {user?.role}
                 </span>
                 <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                 <span className="text-sm text-zinc-500 font-medium">Free Plan</span>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          {!isEditing && (
            <button 
  onClick={() => setIsEditing(true)}
  className="
    px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ease-out cursor-pointer
    
    /* Colors */
    text-zinc-100 bg-zinc-900 
    dark:text-zinc-900 dark:bg-zinc-100

    /* 3D Tactile Lighting (Top Highlight + Bottom Shade) */
    shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-2px_0_rgba(0,0,0,0.4)]
    dark:shadow-[0_1px_2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-2px_0_rgba(0,0,0,0.1)]

    /* Hover State */
    hover:bg-zinc-800 dark:hover:bg-zinc-200
    hover:-translate-y-[1px]

    /* Active State (The 'Press' Effect) */
    active:translate-y-[1px] active:scale-[0.97]
    active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]
    dark:active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]
  "
>
  Edit Profile
</button>
          )}
        </div>

        {/* FORM SECTION */}
        <form onSubmit={handleUpdateProfile} className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          
          {/* Identity Group */}
          <section className={sectionClass}>
            <div className="flex items-center gap-2 mb-6">
              <User className="w-4 h-4 text-zinc-400" />
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Identity</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="group">
                <label className={labelClass}>First Name</label>
                <input 
                  type="text" 
                  name="firstname"
                  disabled={!isEditing}
                  value={formData.firstname}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter first name"
                />
              </div>
              <div className="group">
                <label className={labelClass}>Last Name</label>
                <input 
                  type="text" 
                  name="lastname"
                  disabled={!isEditing}
                  value={formData.lastname}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter last name"
                />
              </div>
            </div>
          </section>

          {/* Contact Group */}
          <section className={sectionClass}>
            <div className="flex items-center gap-2 mb-6">
              <Fingerprint className="w-4 h-4 text-zinc-400" />
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Credentials</h3>
            </div>
            
            <div className="group">
               <label className={labelClass}>Email Address</label>
               <div className="relative">
                 <input 
                    type="email" 
                    name="email"
                    disabled={true} 
                    value={formData.email}
                    className={`${inputClass} !border-dashed text-zinc-500 dark:text-zinc-500`}
                 />
                 <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="text-[10px] font-bold uppercase text-zinc-400 border border-zinc-200 dark:border-zinc-800 px-2 py-1 rounded">
                     Immutable
                   </div>
                 </div>
               </div>
            </div>
          </section>

          {/* Action Footer (Only visible when editing) */}
          <div className={`
             fixed bottom-6 left-1/2 -translate-x-1/2 
             w-[90%] max-w-lg
             p-2 pr-2 pl-6
             bg-zinc-900/90 dark:bg-zinc-100/90 backdrop-blur-xl 
             text-white dark:text-zinc-900
             rounded-full shadow-2xl
             flex items-center justify-between gap-4 
             transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) z-40
             ${isEditing ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}
          `}>
             <span className="text-sm font-medium opacity-90">Unsaved changes</span>
             <div className="flex items-center gap-2">
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-full text-sm font-medium hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
                >
                  Discard
                </button>
                <button 
                  type="submit"
                  className="
                    px-5 py-2 rounded-full 
                    bg-white dark:bg-black text-zinc-900 dark:text-white 
                    text-sm font-bold 
                    hover:scale-105 active:scale-95 transition-transform
                    flex items-center gap-2
                  "
                >
                   Save
                </button>
             </div>
          </div>

        </form>

        {/* DANGER ZONE */}
        <div className="mt-24 pt-10 border-t border-zinc-100 dark:border-zinc-800/50 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
           <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h4 className="text-sm font-bold text-red-600 dark:text-red-500 uppercase tracking-wide mb-1">Delete Account</h4>
                <p className="text-sm text-zinc-500 max-w-sm leading-relaxed">
                   Permanently remove your Personal Account and all of its contents from the platform. This action is not reversible.
                </p>
              </div>
              <button 
                onClick={handleDeleteAccount}
                className="group flex items-center gap-2 px-5 py-2.5 rounded-lg border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-500 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Personal Account</span>
              </button>
           </div>
        </div>

      </main>
    </div>
  );
};

export default UserProfile;