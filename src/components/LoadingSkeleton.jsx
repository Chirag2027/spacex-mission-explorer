const widthOptions = ['w-1/3', 'w-1/2', 'w-2/3', 'w-3/4'];
const getRandomWidth = () => widthOptions[Math.floor(Math.random() * widthOptions.length)];

const LoadingSkeleton = () => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-sm border border-gray-200 p-6 relative overflow-hidden">
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
      
      <div className="space-y-4 relative">
        <div className="flex items-start justify-between mb-5">
          <div className="flex-1 min-w-0 space-y-3">
            <div className="h-7 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-3/4 animate-pulse"></div>
            <div className={`h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl ${getRandomWidth()} animate-pulse`}></div>
          </div>
          <div className="h-10 w-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl animate-pulse ml-3"></div>
        </div>

        <div className="space-y-3.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center bg-white/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-100">
              <div className="h-4 w-4 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full animate-pulse mr-2.5"></div>
              <div className={`h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl ${getRandomWidth()} animate-pulse`}></div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="h-9 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-24 animate-pulse shadow-sm"></div>
          <div className="relative">
            <div className="h-14 w-14 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl animate-pulse border-2 border-gray-100 shadow-md"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSkeleton;