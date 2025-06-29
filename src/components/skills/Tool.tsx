// import styles from "./Tool.module.css";

type ToolProps = {
	name: string;
	image?: string;
}

export default function Tool({ name, image }: ToolProps) {
	return (
		<div className={`flex bg-[oklch(20.5%_0_0)] rounded-md py-[6px] px-4 gap-2
		border-1 border-[rgb(43_43_43)] my-5 mx-auto`}>
			<div className={`w-6 h-6`}>
				<img className={`w-full h-full`} src={image} alt={name + " image"} />
			</div>
			<span className={`text-[var(--primary-font-color)] self-center
        text-sm font-medium font-[Inter_'sans-serif']`}>{name}</span>
		</div>
	);
}