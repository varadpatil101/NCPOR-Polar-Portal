import Link from "next/link";
export default function NotFound() { return <section className="simple-page"><p className="eyebrow">RECORD NOT FOUND</p><h1>This route has drifted out of view.</h1><p>The requested demo record does not exist or has not been connected yet.</p><Link className="button button-dark" href="/archive">Return to archive</Link></section>; }
