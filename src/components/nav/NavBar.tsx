import styles from './NavBar.module.css';

import githubIcon from '../../assets/github_white_icon.svg';

export default function NavBar() {
	return (
		<nav className={`${styles.nav} boundingBox`}>
			<div className="branding">
				<span className={styles.signature}>Evan He</span>
			</div>
			<ul className={styles.navigationLinks}>
				<li><a href="">Home</a></li>
				<li><a href="">Projects</a></li>
				<li><a href="">Experience</a></li>
				<li><a href="">Skills</a></li>
				<li><a href="">Contact</a></li>
			</ul>
			<div className="socialLinks">
				<div className={styles.githubIconContainer}>
					<a href="" className={styles.githubLink} target="_blank" rel="noopener">
						<img src={githubIcon} alt="GitHub Icon" />
					</a>
				</div>
			</div>
		</nav>
	);
}
