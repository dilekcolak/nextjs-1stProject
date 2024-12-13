import Link from "next/link";

const SuggestionsList = ({ suggestions }) => (
    <ul
        style={{
            marginTop: '8px',
            borderRadius: '10px',
            backgroundColor: '#FFF',
            color: '#888',
            zIndex: 1000,
            position: 'absolute',
            width: '95%',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            listStyle: 'none',
            padding: 0,
        }}
    >
        {suggestions.map((user) => (
            <li key={user.id} style={{ padding: '10px 20px' }}>
                 {user.id !== 0 ? (
                    <Link href={`/profile/${user.id}`} style={{ color: 'black' }}>
                        {user.username}
                    </Link>
                ) : (
                    <span style={{ color: 'red' }}>{user.username}</span>
                )}
            </li>
        ))}
    </ul>
);

export default SuggestionsList;