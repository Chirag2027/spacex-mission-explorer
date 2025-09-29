import { Star, Calendar, Rocket, MapPin } from 'lucide-react';

const LaunchCard = ({ launch, isFavorite, onToggleFavorite, onClick }) => {
  if (!launch) return null;

  const launchDate = new Date(launch.date_utc);
  const rocketLabel = launch.rocket?.name || 'Unknown Rocket';
  const padLabel = launch.launchpad?.name || 'Unknown Launchpad';

  const handleFavClick = (e) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  // Status logic
  let statusText = '';
  let statusClasses = '';
  if (launch.upcoming) {
    statusText = 'Upcoming';
    statusClasses = 'bg-blue-50 text-blue-600';
  } else if (launch.success) {
    statusText = 'Successful';
    statusClasses = 'bg-green-50 text-green-600';
  } else {
    statusText = 'Failed';
    statusClasses = 'bg-red-50 text-red-600';
  }

  // Image fallback: small → large → placeholder
  const patchImage = launch.links?.patch?.small || launch.links?.patch?.large || null;

  return (
    <div
      onClick={onClick}
      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group p-6 flex flex-col justify-between relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="flex items-start justify-between mb-5 relative z-10">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
            {launch.name}
          </h3>
          {launch.flight_number && (
            <p className="text-sm text-gray-600 mt-1.5 font-medium">Flight #{launch.flight_number}</p>
          )}
        </div>
        <button
          onClick={handleFavClick}
          className="flex-shrink-0 ml-3 p-2.5 hover:bg-yellow-50 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Star
            className={`h-5 w-5 transition-all ${isFavorite ? 'fill-yellow-400 text-yellow-400 drop-shadow-md' : 'text-gray-300 hover:text-yellow-400'}`}
          />
        </button>
      </div>

      <div className="space-y-3.5 relative z-10">
        <div className="flex items-center text-sm text-gray-700 bg-white/60 backdrop-blur-sm rounded-lg px-3 py-2 transition-all group-hover:bg-white/80">
          <Calendar className="h-4 w-4 mr-2.5 text-blue-500" />
          <span className="font-medium">{launchDate.toLocaleDateString()}</span>
        </div>

        <div className="flex items-center text-sm text-gray-700 bg-white/60 backdrop-blur-sm rounded-lg px-3 py-2 transition-all group-hover:bg-white/80">
          <Rocket className="h-4 w-4 mr-2.5 text-purple-500" />
          <span className="truncate font-medium">{rocketLabel}</span>
        </div>

        <div className="flex items-center text-sm text-gray-700 bg-white/60 backdrop-blur-sm rounded-lg px-3 py-2 transition-all group-hover:bg-white/80">
          <MapPin className="h-4 w-4 mr-2.5 text-pink-500" />
          <span className="truncate font-medium">{padLabel}</span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between relative z-10">
        <span
          className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold shadow-sm ${statusClasses}`}
        >
          {statusText}
        </span>

        {patchImage ? (
          <div className="relative group/patch">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl blur opacity-0 group-hover/patch:opacity-50 transition-opacity" />
            <img
              src={patchImage}
              alt={`${launch.name} patch`}
              className="h-14 w-14 object-contain rounded-xl border-2 border-gray-200 bg-white shadow-md relative z-10 group-hover/patch:scale-110 transition-transform"
            />
          </div>
        ) : (
          <div className="h-14 w-14 flex items-center justify-center text-gray-400 text-xs border-2 border-dashed border-gray-300 rounded-xl bg-gray-50/50">
            No patch
          </div>
        )}
      </div>
    </div>
  );
};

export default LaunchCard;