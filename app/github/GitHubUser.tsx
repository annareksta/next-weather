import styles from "./styles.module.css";

export default function GitHubUser({ user }: { user: any }) {
  return (
    <div className={styles.result}>
      <img src={user.avatar_url} alt={user.login} className={styles.avatar} />
      <h2>{user.name || user.login}</h2>
      <p className={styles.text}>Followers: {user.followers}</p>
    <p className={styles.text}>Following: {user.following}</p>
    <p className={styles.text}>Public Repos: {user.public_repos}</p>

      <a href={user.html_url} target="_blank" rel="noopener noreferrer">
        View Profile
      </a>
    </div>
  );
}