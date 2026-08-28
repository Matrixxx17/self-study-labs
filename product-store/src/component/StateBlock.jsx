export default function StateBlock({ status, onRetry, emptyMessage}){
    if( status==="loading"){
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
                {
                    Array.from({length:6}).map((_,i)=>(
                    <div key={i} className="animate-pulse rounded-xl border border-slate-200 p-4">
                                <div className="h-40 bg-slate-200 rounded-lg mb-4" />
                                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
                                <div className="h-4 bg-slate-200 rounded w-1/2" />
                    </div>
                    ))
                }
            </div>
        )
    }
    if(status==="error"){
        return (
            <div  className="flex flex-col items-center justify-center py-16 text-center">
                <p  className="text-slate-600 mb-4"> Something went wrong</p>
                <button onClick={onRetry} className="rounded-lg bg-teal-700 px-4 py-2 text-white hover:bg-teal-800">
                    Retry
                </button>
            </div>
        )
    }
    if(status==="empty"){
            return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-slate-600">
          {emptyMessage || 'No products found. Try a different search or category.'}
        </p>
      </div>
    )
    }
    return null
}