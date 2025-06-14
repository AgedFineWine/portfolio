function Sun() {
	return (
		<mesh position={[-50, 0, 0]}>
			<sphereGeometry args={[2, 50, 50]} />
			<meshBasicMaterial color={'yellow'} />
		</mesh>
	)
}

export default Sun;
