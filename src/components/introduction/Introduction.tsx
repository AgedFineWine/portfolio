import styles from './Introduction.module.css';

export default function Introduction() {
	return (
		<header className={`${styles.header} boundingBox`}>
			<h1 className={styles.greeting}>
				hi, <span>evan</span> here.
			</h1>
			<p className={styles.introText}>
				I'm a Computer Science student at RIT with a focus on full-stack development.
				I love creating projects that are both fun and meaningful, whether it's tackling complex technical
				challenges or designing stunning graphics. I write down my journey while building
				projects, feel free to read them!
			</p>
			<ul className={styles.viewLinks}>
				<li><a href=""> Take a look</a></li>
				<li><a href=""> View resume</a></li>
			</ul>
		</header>
	);
}