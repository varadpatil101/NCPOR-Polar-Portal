"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) { return <main className="page-loading"><p className="eyebrow">CONTENT CONNECTION UNAVAILABLE</p><h1>We couldn’t load the public archive.</h1><p>Please check the connection and try again.</p><button className="button button-dark" onClick={reset}>Try again</button></main>; }
