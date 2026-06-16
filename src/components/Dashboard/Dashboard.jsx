export default function Dashboard({ stats }) {
    return (
        <div className="dashboard">
            {/* React automatically converts numbers to strings, no toFixed needed if integers! */}
            <div className="stat">Food: {Math.round(stats.food)}</div>
            <div className="stat">Interest: {Math.round(stats.interest)}</div>
            <div className="stat">Warmth: {Math.round(stats.warmth)}</div>
        </div>
    );
}