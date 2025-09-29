import { X, Star, Calendar, Rocket, MapPin, ExternalLink, Youtube } from 'lucide-react';

const LaunchModal = ({ launch, isOpen, onClose, isFavorite, onToggleFavorite }) => {
  if (!isOpen || !launch) return null;

  const launchDate = new Date(launch.date_utc);
  const missionDetails = launch.details || 'No details available for this mission.';

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  let statusText = '';
  let statusClasses = '';
  if (launch.upcoming) {
    statusText = 'Upcoming';
    statusClasses = 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
  } else if (launch.success) {
    statusText = 'Successful';
    statusClasses = 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
  } else {
    statusText = 'Failed';
    statusClasses = 'bg-gradient-to-r from-red-500 to-rose-500 text-white';
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative border border-gray-200 animate-in slide-in-from-bottom duration-300">
        {/* Decorative gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-t-3xl -z-10" />
        
        <div className="flex items-start justify-between mb-8 relative">
          <div className="flex-1 min-w-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{launch.name}</h2>
            {launch.flight_number && (
              <p className="text-gray-600 font-medium">Flight #{launch.flight_number}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleFavorite}
              className="p-3 hover:bg-yellow-50 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star
                className={`h-6 w-6 transition-all ${isFavorite ? 'fill-yellow-400 text-yellow-400 drop-shadow-lg' : 'text-gray-300 hover:text-yellow-400'}`}
              />
            </button>

            <button
              onClick={onClose}
              className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
              aria-label="Close"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>

        {launch.links?.patch?.large ? (
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <img
                src={launch.links.patch.large}
                alt={`${launch.name} mission patch`}
                className="h-40 w-40 object-contain rounded-2xl bg-white border-2 border-gray-200 shadow-lg relative z-10 group-hover:scale-105 transition-transform"
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-center mb-8">
            <div className="h-40 w-40 flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50">
              No patch available
            </div>
          </div>
        )}

        <div className="mb-8">
          <span
            className={`inline-flex items-center px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg ${statusClasses}`}
          >
            {statusText}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="flex items-start bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all">
            <Calendar className="h-6 w-6 mr-3 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-gray-900 mb-1">Launch Date</div>
              <div className="text-gray-700">{launchDate.toLocaleString()}</div>
            </div>
          </div>

          <div className="flex items-start bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all">
            <Rocket className="h-6 w-6 mr-3 text-purple-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-gray-900 mb-1">Rocket</div>
              <div className="text-gray-700">{launch.rocket?.name || 'Unknown'}</div>
            </div>
          </div>

          <div className="flex items-start bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all md:col-span-2">
            <MapPin className="h-6 w-6 mr-3 text-pink-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-gray-900 mb-1">Launch Site</div>
              <div className="text-gray-700">{launch.launchpad?.name || 'Unknown'}</div>
            </div>
          </div>
        </div>

        <div className="mb-8 bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Mission Details</h3>
          <p className="text-gray-700 leading-relaxed">{missionDetails}</p>
        </div>

        {(launch.links?.wikipedia || launch.links?.webcast) && (
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Links</h3>
            <div className="flex gap-4 flex-wrap">
              {launch.links.wikipedia && (
                <a
                  href={launch.links.wikipedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  <ExternalLink className="h-5 w-5" />
                  Wikipedia
                </a>
              )}
              {launch.links.webcast && (
                <a
                  href={launch.links.webcast}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl text-white font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  <Youtube className="h-5 w-5" />
                  Webcast
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LaunchModal;