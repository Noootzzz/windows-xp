export default function Environment() {
    return (
        <>
            <fog attach="fog" args={["#000000", 8,30]} />
            <color attach="background" args={["#000000"]} />
        </>
    );
}