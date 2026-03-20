import { useState, useRef, useEffect } from "react";
import { searchAll } from "../utils/routeSearch";

const CATEGORY_ICONS = {
  station: "fas fa-subway",
  Monument: "fas fa-landmark",
  Market: "fas fa-shopping-cart",
  Hospital: "fas fa-hospital",
  University: "fas fa-graduation-cap",
  Transport: "fas fa-bus-alt",
  Government: "fas fa-building",
  Park: "fas fa-tree",
  Temple: "fas fa-place-of-worship",
  Mall: "fas fa-shopping-bag",
  Stadium: "fas fa-republican",
  Museum: "fas fa-palette",
  Office: "fas fa-briefcase",
  Restaurant: "fas fa-utensils",
  Residential: "fas fa-home",
  Cinema: "fas fa-film",
  Hotel: "fas fa-hotel",
};

export default function Hero({
  from,
  to,
  time,
  setFrom,
  setTo,
  setTime,
  onFindRoute,
  loading,
  searchError,
}) {
  const [fastest, setFastest] = useState(true);
  const [cheapest, setCheapest] = useState(false);
  const [lessWalking, setLessWalking] = useState(true);

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const fromRef = useRef(null);
  const toRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (fromRef.current && !fromRef.current.contains(e.target)) {
        setShowFromDropdown(false);
      }
      if (toRef.current && !toRef.current.contains(e.target)) {
        setShowToDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleFromChange = (val) => {
    setFrom(val);
    const results = searchAll(val);
    setFromSuggestions(results);
    setShowFromDropdown(results.length > 0);
  };

  const handleToChange = (val) => {
    setTo(val);
    const results = searchAll(val);
    setToSuggestions(results);
    setShowToDropdown(results.length > 0);
  };

  const selectFromStation = (name) => {
    setFrom(name);
    setShowFromDropdown(false);
  };

  const selectToStation = (name) => {
    setTo(name);
    setShowToDropdown(false);
  };

  const getIcon = (item) => {
    return (
      CATEGORY_ICONS[item.type === "station" ? "station" : item.category] ||
      "fas fa-location-dot"
    );
  };

  return (
    <section className="bg-gradient-to-b from-[#020617] via-[#020617] to-[#020617] py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Smart Route Planning for Delhi Commuters
          </h2>

          <p className="text-lg text-gray-400 mb-10">
            Find the fastest, cheapest, and most convenient routes combining
            Delhi Metro and DTC buses
          </p>

          <div id="route-search" className="bg-[#020617] border border-gray-800 rounded-2xl p-6 md:p-8 shadow-[0_0_40px_rgba(0,0,0,0.9)]">

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

              {/* FROM INPUT */}
              <div className="relative" ref={fromRef}>
                <input
                  value={from}
                  onChange={(e) => handleFromChange(e.target.value)}
                  onFocus={() => {
                    if (fromSuggestions.length > 0) setShowFromDropdown(true);
                  }}
                  placeholder="Starting Point (e.g. India Gate, Rajiv Chowk)"
                  className="w-full px-4 py-3 bg-[#0f172a] border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                />

                {showFromDropdown && fromSuggestions.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-[#0f1728] border border-gray-700 rounded-xl shadow-2xl max-h-48 overflow-y-auto">
                    {fromSuggestions.map((item) => (
                      <div
                        key={item.name + item.type}
                        className="px-4 py-2.5 hover:bg-blue-900/40 cursor-pointer text-left text-gray-200 text-sm border-b border-gray-800 last:border-b-0 transition-colors flex items-center gap-2"
                        onClick={() => selectFromStation(item.name)}
                      >
                        <i className={`text-blue-500 text-[10px] ${getIcon(item)}`}></i>

                        <span className="font-bold uppercase tracking-tighter">
                          {item.name}
                        </span>

                        {item.type === "place" && (
                          <span className="text-[10px] text-gray-500 ml-auto">
                            {item.category}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* TO INPUT */}
              <div className="relative" ref={toRef}>
                <input
                  value={to}
                  onChange={(e) => handleToChange(e.target.value)}
                  onFocus={() => {
                    if (toSuggestions.length > 0) setShowToDropdown(true);
                  }}
                  placeholder="Destination (e.g. Red Fort, Hauz Khas)"
                  className="w-full px-4 py-3 bg-[#0f172a] border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                />

                {showToDropdown && toSuggestions.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-[#0f1728] border border-gray-700 rounded-xl shadow-2xl max-h-48 overflow-y-auto">
                    {toSuggestions.map((item) => (
                      <div
                        key={item.name + item.type}
                        className="px-4 py-2.5 hover:bg-blue-900/40 cursor-pointer text-left text-gray-200 text-sm border-b border-gray-800 last:border-b-0 transition-colors flex items-center gap-2"
                        onClick={() => selectToStation(item.name)}
                      >
                        <i className={`text-blue-500 text-[10px] ${getIcon(item)}`}></i>

                        <span className="font-bold uppercase tracking-tighter">
                          {item.name}
                        </span>

                        {item.type === "place" && (
                          <span className="text-[10px] text-gray-500 ml-auto">
                            {item.category}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <input
                type="datetime-local"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f172a] border border-gray-700 rounded-xl text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
              />
            </div>

            {/* BUTTON */}
            <button
              onClick={() => onFindRoute({ fastest, cheapest, lessWalking })}
              disabled={loading}
              className="px-8 py-3 rounded-xl text-white bg-blue-600 hover:bg-blue-500 transition"
            >
              {loading ? "Finding Routes..." : "Find Optimal Route"}
            </button>

            {searchError && (
              <div className="mt-4 p-3 bg-red-900/30 border border-red-700/50 rounded-xl text-red-300 text-sm">
                {searchError}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
