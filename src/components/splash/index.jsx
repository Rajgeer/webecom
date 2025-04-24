function Splash() {
    return (
      <div className="grid justify-center content-center h-lvh">
        <div
          className="animate-spin inline-block size-14 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }
  
  export default Splash;
  