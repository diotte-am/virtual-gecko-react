export default function Controls({ onAction }) {
    return (
        <div className="controls">
            <button onClick={() => onAction('feed')}>🦗 Feed</button>
            <button onClick={() => onAction('play')}>🎯 Play</button>
        </div>
    );
}